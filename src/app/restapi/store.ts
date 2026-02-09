import { Workspace, ChatSession } from '../../types';
import { DUMMY_WORKSPACES, DUMMY_SESSIONS } from '../../services/mockData';

// In-memory store
// Note: This will reset on server restart, which is expected for this implementation phase.
let workspaces: Workspace[] = [...DUMMY_WORKSPACES];
let sessions: ChatSession[] = [...DUMMY_SESSIONS];

export const Store = {
    getWorkspaces: () => workspaces,
    
    getWorkspace: (id: string) => workspaces.find(w => w.id === id),
    
    addWorkspace: (ws: Workspace) => {
        workspaces.push(ws);
        return ws;
    },
    
    updateWorkspace: (id: string, updates: Partial<Workspace>) => {
        const index = workspaces.findIndex(w => w.id === id);
        if (index === -1) return null;
        
        workspaces[index] = { ...workspaces[index], ...updates };
        return workspaces[index];
    },
    
    deleteWorkspace: (id: string) => {
        const initialLength = workspaces.length;
        workspaces = workspaces.filter(w => w.id !== id);
        return workspaces.length < initialLength;
    },

    // Session Methods
    getSessions: () => sessions,

    getSession: (id: string) => sessions.find(s => s.id === id),

    addSession: (session: ChatSession) => {
        sessions.push(session);
        return session;
    },

    updateSession: (id: string, updates: Partial<ChatSession>) => {
        const index = sessions.findIndex(s => s.id === id);
        if (index === -1) return null;

        sessions[index] = { ...sessions[index], ...updates };
        return sessions[index];
    },

    deleteSession: (id: string) => {
        const initialLength = sessions.length;
        sessions = sessions.filter(s => s.id !== id);
        return sessions.length < initialLength;
    }
};
