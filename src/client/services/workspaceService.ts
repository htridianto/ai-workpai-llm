import { Workspace } from '@/shared/types/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/restapi';

export const WorkspaceService = {
    fetchWorkspaces: async (): Promise<Workspace[]> => {
        const response = await fetch(`${BASE_URL}/workspaces`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to fetch workspaces');
        }
        return response.json();
    },

    createWorkspace: async (data: Partial<Workspace>): Promise<Workspace> => {
        const response = await fetch(`${BASE_URL}/workspaces`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to create workspace');
        }
        return response.json();
    },

    getWorkspace: async (slug: string): Promise<Workspace> => {
        const response = await fetch(`${BASE_URL}/workspaces/${slug}`);
        if (!response.ok) throw new Error('Failed to fetch workspace');
        return response.json();
    },

    updateWorkspace: async (slug: string, data: Partial<Workspace>): Promise<Workspace> => {
        const response = await fetch(`${BASE_URL}/workspaces/${slug}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update workspace');
        return response.json();
    },

    deleteWorkspace: async (slug: string): Promise<void> => {
        const response = await fetch(`${BASE_URL}/workspaces/${slug}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to delete workspace');
        }
    },

    // Folder Actions
    createFolder: async (data: { name: string; workspaceId: string; parentFolderId?: string }): Promise<any> => {
        const response = await fetch(`${BASE_URL}/folders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to create folder');
        }
        return response.json();
    },

    updateFolder: async (id: string, data: any): Promise<any> => {
        const response = await fetch(`${BASE_URL}/folders/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to update folder');
        }
        return response.json();
    },

    deleteFolder: async (id: string): Promise<void> => {
        const response = await fetch(`${BASE_URL}/folders/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to delete folder');
        }
    },

    // File Context Actions
    createFileContext: async (data: { workspaceId: string; folderId?: string; type: string; meta?: any; name: string; size?: number; snippet?: string; status?: string }): Promise<any> => {
        const response = await fetch(`${BASE_URL}/file-contexts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to create file context');
        }
        return response.json();
    },

    updateFileContext: async (id: string, data: any): Promise<any> => {
        const response = await fetch(`${BASE_URL}/file-contexts/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to update file context');
        }
        return response.json();
    },

    deleteFileContext: async (id: string): Promise<void> => {
        const response = await fetch(`${BASE_URL}/file-contexts/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to delete file context');
        }
    }
};
