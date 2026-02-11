



import { v4 as uuidv4 } from 'uuid';
import { ChatSession, GeneratedFile, Folder, Workspace, AppNotification } from '../types/types';
import { DUMMY_SESSIONS, DUMMY_WORKSPACES, DUMMY_GENERATED_FILES, DUMMY_GENERATED_FOLDERS, DUMMY_NOTIFICATIONS } from './mockData';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const SESSION_STORAGE_KEY = 'anything_llm_mock_sessions';
const WORKSPACE_STORAGE_KEY = 'anything_llm_mock_workspaces';
const GENERATED_FILES_KEY = 'anything_llm_mock_generated_files';
const GENERATED_FOLDERS_KEY = 'anything_llm_mock_generated_folders';
const NOTIFICATIONS_KEY = 'anything_llm_mock_notifications';

// --- Local Storage Helpers ---
const getLocalWorkspaces = (): Workspace[] => {
    const stored = localStorage.getItem(WORKSPACE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : DUMMY_WORKSPACES;
};

const setLocalWorkspaces = (ws: Workspace[]) => {
    localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(ws));
};

const getLocalSessions = (): ChatSession[] => {
  const stored = localStorage.getItem(SESSION_STORAGE_KEY);
  return stored ? JSON.parse(stored) : DUMMY_SESSIONS;
};

const setLocalSessions = (sessions: ChatSession[]) => {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessions));
};

const getLocalGeneratedFiles = (): GeneratedFile[] => {
  const stored = localStorage.getItem(GENERATED_FILES_KEY);
  return stored ? JSON.parse(stored) : DUMMY_GENERATED_FILES;
};

const setLocalGeneratedFiles = (files: GeneratedFile[]) => {
  localStorage.setItem(GENERATED_FILES_KEY, JSON.stringify(files));
};

const getLocalGeneratedFolders = (): Folder[] => {
    const stored = localStorage.getItem(GENERATED_FOLDERS_KEY);
    return stored ? JSON.parse(stored) : DUMMY_GENERATED_FOLDERS;
};
  
const setLocalGeneratedFolders = (folders: Folder[]) => {
    localStorage.setItem(GENERATED_FOLDERS_KEY, JSON.stringify(folders));
};

const getLocalNotifications = (): AppNotification[] => {
  const stored = localStorage.getItem(NOTIFICATIONS_KEY);
  return stored ? JSON.parse(stored) : DUMMY_NOTIFICATIONS;
};

const setLocalNotifications = (notes: AppNotification[]) => {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notes));
};

export const MockApi = {
  // --- Workspaces ---
  fetchWorkspaces: async (): Promise<Workspace[]> => {
      await delay(400);
      return getLocalWorkspaces();
  },

  createWorkspace: async (ws: Workspace): Promise<Workspace> => {
      await delay(500);
      const all = getLocalWorkspaces();
      const updated = [...all, ws];
      setLocalWorkspaces(updated);
      return ws;
  },

  updateWorkspace: async (ws: Workspace): Promise<Workspace> => {
      await delay(300);
      const all = getLocalWorkspaces();
      const updated = all.map(w => w.id === ws.id ? ws : w);
      setLocalWorkspaces(updated);
      return ws;
  },

  deleteWorkspace: async (id: string): Promise<boolean> => {
      await delay(500);
      const all = getLocalWorkspaces();
      const updated = all.filter(w => w.id !== id);
      setLocalWorkspaces(updated);
      
      // Cascade delete sessions
      const sessions = getLocalSessions();
      const updatedSessions = sessions.filter(s => s.workspaceId !== id);
      setLocalSessions(updatedSessions);
      return true;
  },

  // --- Sessions (Chats) ---
  fetchSessions: async (): Promise<ChatSession[]> => {
    await delay(300); // Simulate API latency
    return getLocalSessions();
  },

  createSession: async (session: ChatSession): Promise<ChatSession> => {
    await delay(300);
    const sessions = getLocalSessions();
    const newSessions = [session, ...sessions];
    setLocalSessions(newSessions);
    return session;
  },

  deleteSession: async (id: string): Promise<boolean> => {
    await delay(300);
    const sessions = getLocalSessions();
    const newSessions = sessions.filter(s => s.id !== id);
    setLocalSessions(newSessions);
    return true;
  },

  updateSession: async (updatedSession: ChatSession): Promise<ChatSession> => {
    await delay(200); // Faster update for chat feel
    const sessions = getLocalSessions();
    const newSessions = sessions.map(s => s.id === updatedSession.id ? updatedSession : s);
    setLocalSessions(newSessions);
    return updatedSession;
  },
  
  renameSession: async (id: string, newTitle: string): Promise<boolean> => {
    await delay(300);
    const sessions = getLocalSessions();
    const session = sessions.find(s => s.id === id);
    if (session) {
        session.title = newTitle;
        setLocalSessions(sessions); // Save updated array
        return true;
    }
    return false;
  },

  // --- Generated Content (Files & Folders) ---

  fetchGeneratedFiles: async (): Promise<GeneratedFile[]> => {
    await delay(600);
    return getLocalGeneratedFiles();
  },

  createGeneratedFile: async (file: GeneratedFile): Promise<GeneratedFile> => {
    await delay(1200); // Simulate generation/conversion time
    const files = getLocalGeneratedFiles();
    // Default new file owner to Admin
    const fileWithOwner = { ...file, ownerId: 'u-admin', sharedWith: [] };
    const newFiles = [fileWithOwner, ...files];
    setLocalGeneratedFiles(newFiles);
    
    // TRIGGER NOTIFICATION
    const newNotification: AppNotification = {
        id: uuidv4(),
        title: 'File Generated Successfully',
        message: `${file.name} is ready for download.`,
        type: 'success',
        timestamp: Date.now(),
        read: false
    };
    const notifications = getLocalNotifications();
    setLocalNotifications([newNotification, ...notifications]);

    return fileWithOwner;
  },

  toggleFileStar: async (id: string): Promise<boolean> => {
      await delay(200);
      const files = getLocalGeneratedFiles();
      const updated = files.map(f => f.id === id ? { ...f, isStarred: !f.isStarred } : f);
      setLocalGeneratedFiles(updated);
      return true;
  },

  shareFile: async (id: string, userIds: string[]): Promise<boolean> => {
      await delay(500);
      const files = getLocalGeneratedFiles();
      const updated = files.map(f => {
          if (f.id === id) {
              const currentShared = f.sharedWith || [];
              // Add new unique IDs
              const newShared = [...new Set([...currentShared, ...userIds])];
              return { ...f, sharedWith: newShared, isShared: true };
          }
          return f;
      });
      setLocalGeneratedFiles(updated);
      return true;
  },

  deleteGeneratedFile: async (id: string): Promise<boolean> => {
    await delay(500);
    const files = getLocalGeneratedFiles();
    const newFiles = files.filter(f => f.id !== id);
    setLocalGeneratedFiles(newFiles);
    return true;
  },

  fetchGeneratedFolders: async (): Promise<Folder[]> => {
    await delay(400);
    return getLocalGeneratedFolders();
  },

  createGeneratedFolder: async (folder: Folder): Promise<Folder> => {
      await delay(300);
      const folders = getLocalGeneratedFolders();
      const newFolders = [...folders, folder];
      setLocalGeneratedFolders(newFolders);
      return folder;
  },

  deleteGeneratedFolder: async (id: string): Promise<boolean> => {
      await delay(500);
      // Delete folder
      const folders = getLocalGeneratedFolders();
      const newFolders = folders.filter(f => f.id !== id);
      setLocalGeneratedFolders(newFolders);

      // Cascade delete files in that folder
      const files = getLocalGeneratedFiles();
      const newFiles = files.filter(f => f.folderId !== id);
      setLocalGeneratedFiles(newFiles);
      
      return true;
  },

  // --- Notifications ---
  
  fetchNotifications: async (): Promise<AppNotification[]> => {
      // Very short delay for notification check
      return getLocalNotifications(); 
  },

  markNotificationRead: async (id: string): Promise<void> => {
      const notes = getLocalNotifications();
      const updated = notes.map(n => n.id === id ? { ...n, read: true } : n);
      setLocalNotifications(updated);
  },

  markAllNotificationsRead: async (): Promise<void> => {
      const notes = getLocalNotifications();
      const updated = notes.map(n => ({ ...n, read: true }));
      setLocalNotifications(updated);
  }
};
