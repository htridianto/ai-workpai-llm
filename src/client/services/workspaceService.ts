import { Workspace as WorkspaceType, Folder as FolderType, FileContext as FileContextType } from '@/shared/types/types';

export const mapFolder = (f: any): FolderType => {
  const meta = f.meta ? JSON.parse(f.meta) : {}
  return {
    id: f.id,
    name: f.name,
    workspaceId: f.workspace_id,
    parentId: f.parent_folder_id || undefined,
    dateCreated: new Date(f.created_at).getTime(),
    isReadOnly: f.is_system === 1,
    isStarred: f.is_starred === 1,
    isShared: f.is_shared === 1,
    isTrashed: f.is_starred !== null,
    meta: meta
  }
}

export const mapFileContext = (f: any): FileContextType => {
  const meta = f.meta ? JSON.parse(f.meta) : {}
  return {
    id: f.id,
    name: f.name,
    workspaceId: f.workspace_id,
    folderId: f.folder_id || undefined,
    type: f.type || 'txt',
    status: f.status || 'indexed',
    size: f.size || 0,
    snippet: f.snippet || undefined,
    isStarred: f.is_starred === 1,
    isShared: f.is_shared === 1,
    isTrashed: f.deleted_at !== null,
    ownerId: f.owner_id || undefined,
    dateCreated: new Date(f.created_at).getTime(),
    progress: meta.progress !== undefined ? meta.progress : (f.status === 'indexed' ? 100 : 0),
    meta: meta
  }
}

export const mapWorkspace = (ws: any): WorkspaceType => {
  const meta = ws.meta ? JSON.parse(ws.meta) : {};

  let symbol = ws.name.substring(0, 1);
  // jika huruf terakhir adalah angka, maka ambil huruf pertama & hufuf terakhir
  if(!isNaN(ws.name.substring(ws.name.length-1, ws.name.length))) {
    symbol += ws.name.substring(ws.name.length-1, ws.name.length);
  } else { // ambil huruf setelah spasi pertama atau huruf kedua
    const firstSpaceIndex = ws.name.indexOf(' ');
    if (firstSpaceIndex !== -1) {
      symbol += ws.name.substring(firstSpaceIndex + 1, firstSpaceIndex + 2);
    } else {
      symbol += ws.name.substring(1, 2);
    }
  }
  return {
    ...ws,    
    description: ws.description || 'Secure AI workspace for document retrieval and RAG.',
    symbol: symbol.toUpperCase(),
    color: ws.style_color,
    organizationId: ws.organization_id,
    createdAt: new Date(ws.created_at).getTime(),
    meta: meta,
    folders: [...ws.folders || []].map(mapFolder),
    fileContexts: [...ws.file_contexts || []].map(mapFileContext),
    // threads: [...ws.chatSessions || []].map(mapChatSession)
  };
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/aissistant';

export const WorkspaceService = {
    fetchWorkspaces: async (): Promise<WorkspaceType[]> => {
        const response = await fetch(`${BASE_URL}/workspaces`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to fetch workspaces');
        }
        const data = await response.json();
        return data.map(mapWorkspace);
    },

    createWorkspace: async (data: Partial<WorkspaceType>): Promise<WorkspaceType> => {
        const response = await fetch(`${BASE_URL}/workspaces`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to create workspace');
        }
        const wsData = await response.json();
        return mapWorkspace(wsData);
    },

    getWorkspace: async (slug: string): Promise<WorkspaceType> => {
        const response = await fetch(`${BASE_URL}/workspaces/${slug}`);
        if (!response.ok) throw new Error('Failed to fetch workspace');
        const wsData = await response.json();
        return mapWorkspace(wsData);
    },

    updateWorkspace: async (slug: string, data: Partial<WorkspaceType>): Promise<WorkspaceType> => {
        const response = await fetch(`${BASE_URL}/workspaces/${slug}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update workspace');
        const wsData = await response.json();
        return mapWorkspace(wsData);
    },

    deleteWorkspace: async (slug: string): Promise<void> => {
        const response = await fetch(`${BASE_URL}/workspaces/${slug}?permanent=true`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to delete workspace');
        }
    },

    // Folder Actions
    createFolder: async (data: { name: string; workspaceId: string; parentFolderId?: string, meta?: any }): Promise<any> => {
        const response = await fetch(`${BASE_URL}/folders/${data.workspaceId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...data,
                workspace_id: data.workspaceId,
                parent_folder_id: data.parentFolderId,
                is_system: 0,
                is_shared: 1
            })
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
        const response = await fetch(`${BASE_URL}/file-contexts/${data.workspaceId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                workspace_id: data.workspaceId,
                name: data.name,
                folder_id: data.folderId,
                type: data.type,
                meta: data.meta,             
                size: data.size,
                status: data.status
            })
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to create file context');
        }
        return response.json();
    },

    uploadFileContext: async (workspaceId: string, folderId: string | null, file: File): Promise<any> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('workspace_id', workspaceId);
        if (folderId) formData.append('folderId', folderId);

        const response = await fetch(`${BASE_URL}/file-contexts/${workspaceId}/upload`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to upload file');
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
