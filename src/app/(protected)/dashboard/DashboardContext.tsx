'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { streamChatResponse, ChatService } from '@/client/services/chatService';
import { WorkspaceService } from '@/client/services/workspaceService';
import { MockApi } from '@/client/services/mockApiService';
// import { AuthService } from '@/client/services/authService';
import { Message, ChatSession, Role, Attachment, AppSettings, FileContext, ExportFormat, GeneratedFile, Workspace, UserProfile } from '@/shared/types/types';
import { AVAILABLE_MODELS, DEFAULT_SYSTEM_INSTRUCTION } from '@/shared/constants';
import { ToastType } from '@/client/components/Shared/Toast';
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
  setWorkspaces: React.Dispatch<React.SetStateAction<Workspace[]>>;
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
  currentFileContexts: FileContext[];

  // Handlers
  handleSelectWorkspace: (id: string) => void;
  createNewSession: () => Promise<void>;
  deleteSession: (id: string, e?: React.MouseEvent) => Promise<void>;
  renameSession: (id: string, newTitle: string) => Promise<void>;
  handleSendMessage: (text: string, attachments: Attachment[]) => Promise<void>;
  handleRegenerate: () => Promise<void>;
  handleGenerateDocument: (messageId: string, format: ExportFormat) => Promise<void>;
  handleRemoveFileContext: (id: string) => Promise<void>;
  handleToggleFileContextActive: (id: string) => Promise<void>;
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
  const [isContextOpen, setIsContextOpen] = useState(true);
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
        const fetchedWorkspaces = await WorkspaceService.fetchWorkspaces();
        setWorkspaces(fetchedWorkspaces);
        
        // Determinkan WS awal
        let initialWsId = currentWorkspaceId;
        if (!initialWsId && fetchedWorkspaces.length > 0) {
             initialWsId = fetchedWorkspaces[0].slug; 
             setCurrentWorkspaceId(initialWsId);
        }

        // Fetch sessions hanya untuk WS ini
        // if (initialWsId) {          
        //     const fetchedSessions = await ChatService.fetchSessions(initialWsId);
        //     setSessions(fetchedSessions);
        // }        
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

  // Load sessions when workspace changes
  useEffect(() => {
    const loadSessions = async () => {
        if (currentWorkspaceId) {
            try {
              // console.log('currentWorkspace', currentWorkspace);
              const fetchedSessions = await ChatService.fetchSessions(currentWorkspaceId);
              setSessions(fetchedSessions);

              if(currentWorkspace?.threads && currentWorkspace.threads.length > 0 && currentWorkspace.threads[0].slug) {
                setCurrentSessionId(currentWorkspace.threads[0].slug);
              }
            } catch (err) {
                console.error("Failed to load sessions for workspace:", err);
            }
        }
    };
    loadSessions();
  }, [currentWorkspaceId]);

  // Load session when session changes
  useEffect(() => {   
    const loadSessions = async () => {
        if (currentWorkspaceId && currentSessionId) {
            try {
                const fetchedChatSession = await ChatService.fetchSessions(currentWorkspaceId, currentSessionId);
                // do replace session
                const updatedSessions = sessions.map(s => s.id === currentSessionId ? fetchedChatSession[0] : s);
                setSessions(updatedSessions);
            } catch (err) {
                console.error("Failed to load sessions for workspace:", err);
            }
        }
    };
    loadSessions();
  }, [currentSessionId]);
 

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
  const currentWorkspace = useMemo(() => workspaces.find(w => w.slug === currentWorkspaceId), [workspaces, currentWorkspaceId]);
  const filteredSessions = useMemo(() => sessions.filter(s => s.workspaceId === currentWorkspaceId), [sessions, currentWorkspaceId]);
  const currentSession = useMemo(() => sessions.find(s => s.id === currentSessionId), [sessions, currentSessionId]);
  const currentFileContexts = useMemo(() => currentWorkspace?.fileContexts || [], [currentWorkspace]);

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

  const generateUniqueTitle = (workspaceId: string, baseTitle: string = 'New Chat') => {
    let newTitle = baseTitle;
    let counter = 1;
    const wsSessions = sessions.filter(s => s.workspaceId === workspaceId);
    while (wsSessions.some(s => s.title === newTitle)) {
      newTitle = `${baseTitle} ${counter}`;
      counter++;
    }
    return newTitle;
  };

  const createNewSession = async () => {
    if (!currentWorkspaceId) return;

    const newTitle = generateUniqueTitle(currentWorkspaceId, 'Thread');
    // const newSlug = newTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') + '-' + uuidv4().slice(0, 8);

    const newSession: ChatSession = {
      id: uuidv4(),
      // slug: newSlug,
      workspaceId: currentWorkspaceId,
      userId: userProfile?.id,
      title: newTitle,
      messages: [],
      modelId: '', //settings.defaultModelId,
      createdAt: Date.now(),
      fileContextIds: [], 
    };
    
    // We need to find the workspace to get items. 
    if (currentWorkspace) {
        newSession.fileContextIds = currentWorkspace.fileContexts.map(i => i.id);
    }

    const createdSession = await ChatService.createSession(newSession);
    setSessions(prev => [createdSession, ...prev]);
    setCurrentSessionId(createdSession.id);
  };

  const deleteSession = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
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
       const initialContextIds = currentWorkspace ? currentWorkspace.fileContexts.map(i => i.id) : [];

       const newTitle = text.slice(0, 30) || generateUniqueTitle(currentWorkspaceId);
      //  const newSlug = newTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') + '-' + uuidv4().slice(0, 8);

       const newSession: ChatSession = {
          id: newId,
          // slug: newSlug,
          workspaceId: currentWorkspaceId,
          userId: userProfile?.id,
          title: newTitle,
          messages: [],
          modelId: settings.defaultModelId,
          createdAt: Date.now(),
          fileContextIds: initialContextIds
       };       
       isNewSession = true;
       const createdSession = await ChatService.createSession(newSession);
       setSessions(prev => [createdSession, ...prev]);
       setCurrentSessionId(createdSession.id);
       sessionToUse = createdSession;
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
      title: session.messages.length === 0 ? (text.slice(0, 30) || generateUniqueTitle(currentWorkspaceId)) : session.title,
      messages: [...session.messages, userMessage]
    };
    
    updateSessionState(updatedSession);
    setIsStreaming(true);
    setStreamingContent('');

    // if(isNewSession) await ChatService.createSession(updatedSession);
    // else await ChatService.updateSession(updatedSession);
    if(isNewSession) {
      await ChatService.renameSession(updatedSession.id, updatedSession.title);       
    }else {
      await ChatService.updateSession(updatedSession); 
    }

    try {
      const activeContext = (currentWorkspace?.fileContexts || []).filter(item => 
          updatedSession.fileContextIds.includes(item.id)
      );
      
      const wsSystemInstruction = currentWorkspace?.systemInstruction || settings.systemInstruction;
      const systemWithContext = wsSystemInstruction + '\\n\\n[CONTEXT DOCUMENTS FROM WORKSPACE "' + (currentWorkspace?.title || '') + '"]: ' + activeContext.map(i => i.name).join(', ');

      const { text: responseText, sources } = await streamChatResponse(
        currentWorkspace?.slug || '',
        updatedSession.slug || updatedSession.id,
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
        sources: sources,
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

  const handleRegenerate = async () => {
    if (!currentSession || currentSession.messages.length === 0 || isStreaming) return;

    const messages = [...currentSession.messages];
    const lastMessage = messages[messages.length - 1];
    
    let history: Message[] = [];
    let lastUserMessage: Message | null = null;

    if (lastMessage.role === Role.MODEL) {
      // Regenerating last response
      const historyUntilLastPrompt = messages.slice(0, -1);
      lastUserMessage = historyUntilLastPrompt[historyUntilLastPrompt.length - 1];
      history = historyUntilLastPrompt.slice(0, -1);
    } else if (lastMessage.role === Role.USER) {
      // Sending again if last was user (e.g. after error)
      lastUserMessage = lastMessage;
      history = messages.slice(0, -1);
    }

    if (!lastUserMessage || lastUserMessage.role !== Role.USER) return;

    const updatedSession = {
      ...currentSession,
      messages: [...history, lastUserMessage]
    };
    
    updateSessionState(updatedSession);
    setIsStreaming(true);
    setStreamingContent('');

    try {
      const activeContext = (currentWorkspace?.fileContexts || []).filter(item => 
          updatedSession.fileContextIds.includes(item.id)
      );
      
      const wsSystemInstruction = currentWorkspace?.systemInstruction || settings.systemInstruction;
      const systemWithContext = wsSystemInstruction + '\\n\\n[CONTEXT DOCUMENTS FROM WORKSPACE "' + (currentWorkspace?.title || '') + '"]: ' + activeContext.map(i => i.name).join(', ');

      const { text: responseText, sources } = await streamChatResponse(
        currentWorkspace?.slug || '',
        updatedSession.slug || updatedSession.id,
        currentSession.modelId || settings.defaultModelId,
        history,
        lastUserMessage.text,
        lastUserMessage.attachments || [],
        systemWithContext,
        (chunkText) => {
          setStreamingContent(chunkText);
        }
      );

      const botMessage: Message = {
        id: uuidv4(),
        role: Role.MODEL,
        text: responseText,
        sources: sources,
        timestamp: Date.now()
      };

      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, botMessage]
      };
      updateSessionState(finalSession);
      await ChatService.updateSession(finalSession);

    } catch (error) {
      console.error("Regenerate error", error);
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

      try {
        const name = 'Generated_' + format.toUpperCase() + '_' + new Date().getTime();
        const newFile = await ChatService.generateDocument(msg.text, format, name);

        setToast({
          message: 'File Generated Successfully',
          type: 'success',
          subMessage: newFile.name + ' has been saved to your Generated Content.'
        });
      } catch (error: any) {
        console.error("Failed to generate document:", error);
        setToast({
          message: 'Generation Failed',
          type: 'error',
          subMessage: error.message || 'There was an error generating your document.'
        });
      }
  };

  const handleRemoveFileContext = async (id: string) => {
    if (!currentWorkspace) return;
    try {
        await WorkspaceService.deleteFileContext(id);
        await refreshWorkspaces();
    } catch (error: any) {
        setToast({ message: "Failed to remove file context", type: "error", subMessage: error.message });
    }
  };

  const handleToggleFileContextActive = async (itemId: string) => {
    if (!currentSession) return;
    
    const isCurrentlyActive = currentSession.fileContextIds?.includes(itemId);
    let newContextIds: string[];

    if (isCurrentlyActive) {
        newContextIds = currentSession.fileContextIds.filter(id => id !== itemId);
    } else {
        newContextIds = [...(currentSession.fileContextIds || []), itemId];
    }

    const updatedSession = { ...currentSession, fileContextIds: newContextIds };
    updateSessionState(updatedSession);
    await ChatService.updateSession(updatedSession);
  };

  const updateThreshold = async (val: number) => {
    if(currentWorkspace) {
        try {
            await WorkspaceService.updateWorkspace(currentWorkspace.slug, { similarityThreshold: val } as any);
            await refreshWorkspaces();
        } catch (error: any) {
            setToast({ message: "Failed to update threshold", type: "error", subMessage: error.message });
        }
    }
  };

  const { data: sessionData, status: sessionStatus } = useSession();  
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  useEffect(() => {
    if (sessionData) {
      setUserProfile({
        id: sessionData?.user?.id || '',
        name: sessionData?.user?.name || 'Unknown',
        userName: sessionData?.user?.userName || 'Unknown',
        email: sessionData?.user?.email || 'Unknown',
        displayName: sessionData?.user?.name || 'Unknown',
        role: (sessionData?.user as any)?.role || 'Unknown',
        bio: (sessionData?.user as any)?.bio || '',
        image: (sessionData?.user as any)?.image,
        ssoAuthProvider: (sessionData?.user as any)?.ssoAuthProvider || 'Unknown',
        createdAt: (sessionData?.user as any)?.createdAt || new Date().toLocaleString(),
        lastLoggedin: (sessionData?.user as any)?.lastLoggedin || new Date().toLocaleString(),
      });
    }      
  }, [sessionData]);



  const contextValue = useMemo(() => ({
      isSidebarOpen, setIsSidebarOpen,
      isContextOpen, setIsContextOpen,
      toast, setToast,
      workspaces, currentWorkspaceId, setCurrentWorkspaceId,
      sessions, currentSessionId, setCurrentSessionId,
      isLoadingData,
      isStreaming, streamingContent,
      settings, setSettings,
      currentWorkspace, filteredSessions, currentSession, currentFileContexts,
      handleSelectWorkspace, createNewSession, deleteSession, renameSession,
      handleSendMessage, handleRegenerate, handleGenerateDocument, handleRemoveFileContext,
      handleToggleFileContextActive, updateThreshold, handleLogout,
      refreshWorkspaces, userProfile, setUserProfile,
      setWorkspaces
  }), [
      isSidebarOpen, isContextOpen, toast,
      workspaces, currentWorkspaceId, sessions, currentSessionId,
      isLoadingData, isStreaming, streamingContent, settings,
      currentWorkspace, filteredSessions, currentSession, currentFileContexts
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
