'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { streamChatResponse, ChatService } from '../../../services/chatService';
import { WorkspaceService } from '../../../services/workspaceService';
import { MockApi } from '../../../services/mockApiService';
// import { AuthService } from '../../../services/authService';
import { Message, ChatSession, Role, Attachment, AppSettings, ContextItem, ExportFormat, GeneratedFile, Workspace, UserProfile } from '../../../types/types';
import { AVAILABLE_MODELS, DEFAULT_SYSTEM_INSTRUCTION } from '../../../constants';
import { ToastType } from '../../../components/Shared/Toast';
import { signOut, useSession } from 'next-auth/react';


const SETTINGS_KEY = 'anything_llm_settings';

interface DashboardContextType {
  // Layout State
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isContextOpen: boolean;
  setIsContextOpen: (open: boolean) => void;
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
  refreshWorkspaces: () => Promise<void>;

  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Layout State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [toast, setToast] = useState<{message: string, type: ToastType, subMessage?: string} | null>(null);

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
  // Logout Wrapper
  const handleLogout = () => {
      signOut({ 
        callbackUrl: "/login", // Redirect ke halaman login setelah logout
        redirect: true 
      });  
  };

  // Load Initial Data
  const refreshWorkspaces = async () => {
      setIsLoadingData(true);
      try {
        const [fetchedWorkspaces, fetchedSessions] = await Promise.all([
            WorkspaceService.fetchWorkspaces(),
            ChatService.fetchSessions()
        ]);
        
        setWorkspaces(fetchedWorkspaces);
        setSessions(fetchedSessions);
        
        if (!currentWorkspaceId && fetchedWorkspaces.length > 0) {
             const initialWsId = fetchedWorkspaces[0].id; 
             setCurrentWorkspaceId(initialWsId);
        }
        
      } catch (err: any) {
        console.error("Failed to fetch data", err);
        setToast({ 
          message: 'Failed to load workspaces', 
          type: 'error', 
          subMessage: err.message || 'Please try refreshing data or log in again.' 
        });
      } finally {
        setIsLoadingData(false);
      }
  };

  useEffect(() => {
    // localStorage.getItem('isDarkMode') === 'true' ? setIsDarkMode(true) : setIsDarkMode(false);
    refreshWorkspaces();
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []); 

  useEffect(() => {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  // Lock body scroll on mobile when sidebars are open
  useEffect(() => {
    const isAnySidebarOpen = isSidebarOpen || isContextOpen;
    const isMobile = window.innerWidth < 1024; // matches lg breakpoint

    if (isAnySidebarOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen, isContextOpen]);

  // Derived State (Memoized)
  const currentWorkspace = useMemo(() => workspaces.find(w => w.id === currentWorkspaceId), [workspaces, currentWorkspaceId]);
  const filteredSessions = useMemo(() => sessions.filter(s => s.workspaceId === currentWorkspaceId), [sessions, currentWorkspaceId]);
  const currentSession = useMemo(() => sessions.find(s => s.id === currentSessionId), [sessions, currentSessionId]);
  const currentContextItems = useMemo(() => currentWorkspace?.contextItems || [], [currentWorkspace]);

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
      // Navigation happens here, the useEffect in [workspaceId]/page.tsx will sync state
      router.push('/dashboard/' + id);
      
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
      contextItemIds: [], 
    };
    
    // We need to find the workspace to get items. 
    const ws = workspaces.find(w => w.id === currentWorkspaceId);
    if (ws) {
        newSession.contextItemIds = ws.contextItems.map(i => i.id);
    }

    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    await ChatService.createSession(newSession);
  };

  const deleteSession = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions(prev => prev.filter(s => s.id !== id));
    if (currentSessionId === id) {
      const remaining = sessions.filter(s => s.id !== id && s.workspaceId === currentWorkspaceId);
      if (remaining.length > 0) setCurrentSessionId(remaining[0].id);
      else setCurrentSessionId(null);
    }
    await ChatService.deleteSession(id);
  };

  const renameSession = async (id: string, newTitle: string) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, title: newTitle } : s));
    await ChatService.renameSession(id, newTitle);
  };

  const handleSendMessage = async (text: string, attachments: Attachment[]) => {
    if (!currentWorkspaceId) return;

    let sessionToUse = currentSession;
    let isNewSession = false;

    if (!sessionToUse) {
       const newId = uuidv4();
       const ws = workspaces.find(w => w.id === currentWorkspaceId);
       const initialContextIds = ws ? ws.contextItems.map(i => i.id) : [];

       const newSession: ChatSession = {
        id: newId,
        workspaceId: currentWorkspaceId,
        title: text.slice(0, 30) || 'New Chat',
        messages: [],
        modelId: settings.defaultModelId,
        createdAt: Date.now(),
        contextItemIds: initialContextIds
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

    if(isNewSession) await ChatService.createSession(updatedSession);
    else await ChatService.updateSession(updatedSession);

    try {
      const activeContext = (currentWorkspace?.contextItems || []).filter(item => 
          updatedSession.contextItemIds.includes(item.id)
      );
      
      const wsSystemInstruction = currentWorkspace?.systemInstruction || settings.systemInstruction;
      const systemWithContext = wsSystemInstruction + '\\n\\n[CONTEXT DOCUMENTS FROM WORKSPACE "' + (currentWorkspace?.title || '') + '"]: ' + activeContext.map(i => i.name).join(', ');

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
      await ChatService.updateSession(finalSession);

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
      await ChatService.updateSession(errorSession);
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
          name: 'Generated_' + format.toUpperCase() + '_' + new Date().getTime() + '.' + format,
          type: format,
          dateCreated: Date.now(),
          size: Math.floor(Math.random() * 5000000) + 1024,
          snippet: msg.text.slice(0, 100) + '...'
      };

      await MockApi.createGeneratedFile(newFile);
      setToast({
        message: 'File Generated Successfully',
        type: 'success',
        subMessage: newFile.name + ' has been saved to your Generated Content.'
      });
  };

  const handleRemoveContextItem = async (id: string) => {
    if (!currentWorkspace) return;
    const updatedContextItems = currentWorkspace.contextItems.filter(i => i.id !== id);
    const updatedWs = { ...currentWorkspace, contextItems: updatedContextItems };
    updateWorkspaceState(updatedWs);
    // await WorkspaceService.updateWorkspace(updatedWs.id, updatedWs);
  };

  const handleToggleContextItemActive = async (itemId: string) => {
    if (!currentSession) return;
    
    const isCurrentlyActive = currentSession.contextItemIds?.includes(itemId);
    let newContextIds: string[];

    if (isCurrentlyActive) {
        newContextIds = currentSession.contextItemIds.filter(id => id !== itemId);
    } else {
        newContextIds = [...(currentSession.contextItemIds || []), itemId];
    }

    const updatedSession = { ...currentSession, contextItemIds: newContextIds };
    updateSessionState(updatedSession);
    await ChatService.updateSession(updatedSession);
  };

  const updateThreshold = (val: number) => {
    if(currentWorkspace) {
        const updated = { ...currentWorkspace, similarityThreshold: val };
        updateWorkspaceState(updated);
        MockApi.updateWorkspace(updated);
    }
  };

  const { data: sessionData, status: sessionStatus } = useSession();  
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  useEffect(() => {
    if (sessionData) {
      console.log(sessionData);
      setUserProfile({
        id: sessionData?.user?.id || '',
        name: sessionData?.user?.name || 'Unknown',
        userName: sessionData?.user?.userName || 'Unknown',
        email: sessionData?.user?.email || 'Unknown',
        displayName: sessionData?.user?.name || 'Unknown',
        role: (sessionData?.user as any)?.role || 'Unknown',
        bio: (sessionData?.user as any)?.bio || '',
        image: (sessionData?.user as any)?.image,
        lastLoggedIn: (sessionData?.user as any)?.lastLoggedIn || new Date().toLocaleString(),
      });
    }      
  }, [sessionData]);

  // let userProfile: UserProfile | null = null;  
  // const getUserProfile = async (setProfile: (profile: UserProfile | null) => void) => {
  //   if(!userProfile) {
  //     const {data: session} = await useSession();

  //     if (session) {
  //       console.log(session);
  //       userProfile = {
  //         id: session?.user?.id || '',
  //         userName: session?.user?.userName || 'Unknown',
  //         email: session?.user?.email || 'Unknown',
  //         displayName: session?.user?.name || 'Unknown',
  //         bio: (session?.user as any)?.bio || '',
  //         avatar: (session?.user as any)?.image,
  //         lastLoggedIn: (session?.user as any)?.lastLoggedIn || new Date().toLocaleString(),
  //       };
  //     }
  //   }
  //   setProfile(userProfile);
  // };

  const contextValue = useMemo(() => ({
      isSidebarOpen, setIsSidebarOpen,
      isContextOpen, setIsContextOpen,
      toast, setToast,
      workspaces, currentWorkspaceId, setCurrentWorkspaceId,
      sessions, currentSessionId, setCurrentSessionId,
      isLoadingData,
      isStreaming, streamingContent,
      settings, setSettings,
      currentWorkspace, filteredSessions, currentSession, currentContextItems,
      handleSelectWorkspace, createNewSession, deleteSession, renameSession,
      handleSendMessage, handleGenerateDocument, handleRemoveContextItem,
      handleToggleContextItemActive, updateThreshold, handleLogout,
      refreshWorkspaces, userProfile, setUserProfile
  }), [
      isSidebarOpen, isContextOpen, toast,
      workspaces, currentWorkspaceId, sessions, currentSessionId,
      isLoadingData, isStreaming, streamingContent, settings,
      currentWorkspace, filteredSessions, currentSession, currentContextItems
  ]);

  return (
    <DashboardContext.Provider value={contextValue}>
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
