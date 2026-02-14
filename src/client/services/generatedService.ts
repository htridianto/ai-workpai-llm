import { GeneratedFile, Folder } from '@/shared/types/types';

const API_BASE = '/restapi/generated';

export const GeneratedService = {
  fetchGeneratedFiles: async (includeTrashed = false): Promise<GeneratedFile[]> => {
    const res = await fetch(`${API_BASE}/files${includeTrashed ? '?includeTrashed=true' : ''}`);
    if (!res.ok) throw new Error('Failed to fetch files');
    return await res.json();
  },

  fetchGeneratedFolders: async (includeTrashed = false): Promise<Folder[]> => {
    const res = await fetch(`${API_BASE}/folders${includeTrashed ? '?includeTrashed=true' : ''}`);
    if (!res.ok) throw new Error('Failed to fetch folders');
    return await res.json();
  },

  createGeneratedFolder: async (name: string, parentId?: string): Promise<Folder> => {
    const res = await fetch(`${API_BASE}/folders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, parentId }),
    });
    if (!res.ok) throw new Error('Failed to create folder');
    return await res.json();
  },

  deleteGeneratedFolder: async (id: string): Promise<boolean> => {
    const res = await fetch(`${API_BASE}/folders?id=${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  },

  deleteGeneratedFile: async (id: string): Promise<boolean> => {
    const res = await fetch(`${API_BASE}/files?id=${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  },

  restoreGeneratedFile: async (id: string): Promise<boolean> => {
    const res = await fetch(`${API_BASE}/files/restore?id=${id}`, {
      method: 'POST',
    });
    return res.ok;
  },

  uploadGeneratedFile: async (file: File, folderId?: string): Promise<GeneratedFile> => {
    const formData = new FormData();
    formData.append('file', file);
    if (folderId) formData.append('folderId', folderId);

    const res = await fetch(`${API_BASE}/files`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to upload file');
    return await res.json();
  },

  shareGeneratedFile: async (fileId: string, userIds: string[]): Promise<boolean> => {
    const res = await fetch(`${API_BASE}/files/share`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileId, userIds }),
    });
    return res.ok;
  }
};
