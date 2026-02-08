'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { streamChatResponse } from '../../../services/geminiService';
import { MockApi } from '../../../services/mockApiService';
import { AuthService } from '../../../services/authService';
import { Message, ChatSession, Role, Attachment, AppSettings, ContextItem, ExportFormat, GeneratedFile, Workspace } from '../../../types';
import { AVAILABLE_MODELS, DEFAULT_SYSTEM_INSTRUCTION } from '../../../constants';
import { ToastType } from '../../../components/Shared/Toast';

const SETTINGS_KEY = 'anything_llm_settings';

interface DashboardContextType {
  // Layout State
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isContextOpen: boolean;
  setIsContextOpen: (open: boolean) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  toast: { message: string, type: ToastType, subMessage?: string } | null;
  setToast: (toast: { message: string, type: ToastType, subMessage?: string } | null) => void;

  // App State
  workspaces: Workspace[];
  currentWorkspaceId: string | null;
  setCurrentWorkspaceId: (id: string | null) => void;
  sessions: ChatSession[];
  currentSessionId: string | null;
  setCurrentSessionId: (id: string | null) => void;
  isLoadingData: boolean;
  
  // Streaming State
  isStreaming: boolean;
  streamingContent: string;

  // Settings
  settings: AppSettings;
  setSettings: (settings: AppSettings) => void;

  // Derived State
  currentWorkspace: Workspace | undefined;
  filteredSessions: ChatSession[];
  currentSession: ChatSession | undefined;
  currentContextItems: ContextItem[];

  // Handlers
  handleSelectWorkspace: (id: string) => void;
  createNewSession: () => Promise<void>;
  deleteSession: (id: string, e: React.MouseEvent) => Promise<void>;
  renameSession: (id: string, newTitle: string) => Promise<void>;
  handleSendMessage: (text: string, attachments: Attachment[]) => Promise<void>;
  handleGenerateDocument: (messageId: string, format: ExportFormat) => Promise<void>;
  handleRemoveContextItem: (id: string) => Promise<void>;
  handleToggleContextItemActive: (id: string) => Promise<void>;
  updateThreshold: (val: number) => void;
  handleLogout: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Layout State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [toast, setToast] = useState<{message: string, type: ToastType, subMessage?: string} | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // App State
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  // Streaming state
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');

  // Settings
  const [settings, setSettings] = useState<AppSettings>({
    defaultModelId: AVAILABLE_MODELS[0].id,
    systemInstruction: DEFAULT_SYSTEM_INSTRUCTION,
    temperature: 0.7
  });

  // Theme Toggle
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
     if (document.documentElement.classList.contains('dark')) {
         setIsDarkMode(true);
     } else {
         setIsDarkMode(false);
     }
  }, []);

  // Logout Wrapper
  const handleLogout = () => {
    AuthService.logout();
  };

  // Load Initial Data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const [fetchedWorkspaces, fetchedSessions] = await Promise.all([
            MockApi.fetchWorkspaces(),
            MockApi.fetchSessions()
        ]);
        
        setWorkspaces(fetchedWorkspaces);
        setSessions(fetchedSessions);

        let initialWsId = fetchedWorkspaces.length > 0 ? fetchedWorkspaces[0].id : null;
        setCurrentWorkspaceId(initialWsId);

        if (initialWsId) {
            const workspaceSessions = fetchedSessions.filter(s => s.workspaceId === initialWsId);
            if (workspaceSessions.length > 0) {
                 const sorted = workspaceSessions.sort((a, b) => b.createdAt - a.createdAt);
                 setCurrentSessionId(sorted[0].id);
            } else {
                 setCurrentSessionId(null);
            }
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []); 

  useEffect(() => {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  // Derived State
  const currentWorkspace = workspaces.find(w => w.id === currentWorkspaceId);
  const filteredSessions = sessions.filter(s => s.workspaceId === currentWorkspaceId);
  const currentSession = sessions.find(s => s.id === currentSessionId);
  const currentContextItems = currentWorkspace?.contextItems || [];

  const updateSessionState = (updatedSession: ChatSession) => {
    setSessions(prev => {
        const filtered = prev.filter(s => s.id !== updatedSession.id);
        return [updatedSession, ...filtered];
    });
  };

  const updateWorkspaceState = (updatedWs: Workspace) => {
      setWorkspaces(prev => prev.map(w => w.id === updatedWs.id ? updatedWs : w));
  };

  const handleSelectWorkspace = (id: string) => {
      setCurrentWorkspaceId(id);
      const wsSessions = sessions.filter(s => s.workspaceId === id).sort((a,b) => b.createdAt - a.createdAt);
      if(wsSessions.length > 0) {
          setCurrentSessionId(wsSessions[0].id);
      } else {
          setCurrentSessionId(null);
      }
  };

  const createNewSession = async () => {
    if (!currentWorkspaceId) return;
    const newSession: ChatSession = {
      id: uuidv4(),
      workspaceId: currentWorkspaceId,
      title: 'New Chat',
      messages: [],
      modelId: settings.defaultModelId,
      createdAt: Date.now(),
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    await MockApi.createSession(newSession);
  };

  const deleteSession = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions(prev => prev.filter(s => s.id !== id));
    if (currentSessionId === id) {
      const remaining = sessions.filter(s => s.id !== id && s.workspaceId === currentWorkspaceId);
      if (remaining.length > 0) setCurrentSessionId(remaining[0].id);
      else setCurrentSessionId(null);
    }
    await MockApi.deleteSession(id);
  };

  const renameSession = async (id: string, newTitle: string) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, title: newTitle } : s));
    await MockApi.renameSession(id, newTitle);
  };

  const handleSendMessage = async (text: string, attachments: Attachment[]) => {
    if (!currentWorkspaceId) return;

    let sessionToUse = currentSession;
    let isNewSession = false;

    if (!sessionToUse) {
       const newId = uuidv4();
       const newSession: ChatSession = {
        id: newId,
        workspaceId: currentWorkspaceId,
        title: text.slice(0, 30) || 'New Chat',
        messages: [],
        modelId: settings.defaultModelId,
        createdAt: Date.now(),
       };
       sessionToUse = newSession;
       isNewSession = true;
       setSessions(prev => [newSession, ...prev]);
       setCurrentSessionId(newId);
    }

    const session = sessionToUse!;
    const userMessage: Message = {
      id: uuidv4(),
      role: Role.USER,
      text: text,
      attachments: attachments,
      timestamp: Date.now()
    };

    const updatedSession = {
      ...session,
      title: session.messages.length === 0 ? (text.slice(0, 30) || 'New Chat') : session.title,
      messages: [...session.messages, userMessage]
    };
    
    updateSessionState(updatedSession);
    setIsStreaming(true);
    setStreamingContent('');

    if(isNewSession) await MockApi.createSession(updatedSession);
    else await MockApi.updateSession(updatedSession);

    try {
      const activeContext = (currentWorkspace?.contextItems || []).filter(item => item.isActive !== false);
      const wsSystemInstruction = currentWorkspace?.systemInstruction || settings.systemInstruction;
      const systemWithContext = `${wsSystemInstruction}\n\n[CONTEXT DOCUMENTS FROM WORKSPACE "${currentWorkspace?.title}"]: ${activeContext.map(i => i.name).join(', ')}`;

      const responseText = await streamChatResponse(
        session.modelId,
        updatedSession.messages,
        text,
        attachments,
        systemWithContext,
        (chunkText) => {
          setStreamingContent(chunkText);
        }
      );

      const botMessage: Message = {
        id: uuidv4(),
        role: Role.MODEL,
        text: responseText,
        timestamp: Date.now()
      };

      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, botMessage]
      };
      updateSessionState(finalSession);
      await MockApi.updateSession(finalSession);

    } catch (error) {
      console.error("Chat error", error);
      const errorMessage: Message = {
        id: uuidv4(),
        role: Role.MODEL,
        text: "System Error: Unable to reach inference endpoint. Please check your API Key.",
        timestamp: Date.now(),
        isError: true
      };
      const errorSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, errorMessage]
      };
      updateSessionState(errorSession);
      await MockApi.updateSession(errorSession);
    } finally {
      setIsStreaming(false);
      setStreamingContent('');
    }
  };

  const handleGenerateDocument = async (messageId: string, format: ExportFormat) => {
      const msg = currentSession?.messages.find(m => m.id === messageId);
      if(!msg) return;

      const newFile: GeneratedFile = {
          id: uuidv4(),
          name: `Generated_${format.toUpperCase()}_${new Date().getTime()}.${format}`,
          type: format,
          dateCreated: Date.now(),
          size: Math.floor(Math.random() * 5000000) + 1024,
          snippet: msg.text.slice(0, 100) + '...'
      };

      await MockApi.createGeneratedFile(newFile);
      setToast({
        message: 'File Generated Successfully',
        type: 'success',
        subMessage: `${newFile.name} has been saved to your Generated Content.`
      });
  };

  const handleRemoveContextItem = async (id: string) => {
    if (!currentWorkspace) return;
    const updatedContextItems = currentWorkspace.contextItems.filter(i => i.id !== id);
    const updatedWs = { ...currentWorkspace, contextItems: updatedContextItems };
    updateWorkspaceState(updatedWs);
    await MockApi.updateWorkspace(updatedWs);
  };

  const handleToggleContextItemActive = async (id: string) => {
    if (!currentWorkspace) return;
    const updatedContextItems = currentWorkspace.contextItems.map(item => 
      item.id === id ? { ...item, isActive: item.isActive === false ? true : false } : item
    );
    const updatedWs = { ...currentWorkspace, contextItems: updatedContextItems };
    updateWorkspaceState(updatedWs);
    await MockApi.updateWorkspace(updatedWs);
  };

  const updateThreshold = (val: number) => {
    if(currentWorkspace) {
        const updated = { ...currentWorkspace, similarityThreshold: val };
        updateWorkspaceState(updated);
        MockApi.updateWorkspace(updated);
    }
  };

  return (
    <DashboardContext.Provider value={{
      isSidebarOpen, setIsSidebarOpen,
      isContextOpen, setIsContextOpen,
      isDarkMode, toggleTheme,
      toast, setToast,
      workspaces, currentWorkspaceId, setCurrentWorkspaceId,
      sessions, currentSessionId, setCurrentSessionId,
      isLoadingData,
      isStreaming, streamingContent,
      settings, setSettings,
      currentWorkspace, filteredSessions, currentSession, currentContextItems,
      handleSelectWorkspace, createNewSession, deleteSession, renameSession,
      handleSendMessage, handleGenerateDocument, handleRemoveContextItem,
      handleToggleContextItemActive, updateThreshold, handleLogout
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
