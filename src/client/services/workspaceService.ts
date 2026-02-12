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
        if (!response.ok) throw new Error('Failed to create workspace');
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
        if (!response.ok) throw new Error('Failed to delete workspace');
    }
};
