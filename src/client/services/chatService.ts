import { Message, Role, Attachment, Source } from '@/shared/types/types';

export const streamChatResponse = async (
  workspaceSlug: string,
  threadSlug: string,
  modelId: string,
  history: Message[],
  newMessage: string,
  attachments: Attachment[],
  systemInstruction: string,
  onChunk: (text: string) => void,
  onSources?: (sources: Source[]) => void
): Promise<{ text: string; sources?: Source[] }> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/restapi';
    
    const response = await fetch(`${baseUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workspaceSlug,
        threadSlug,
        modelId,
        history,
        message: newMessage,
        attachments,
        // systemInstruction
      }),
    });


    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Error: ${response.statusText}`);
    }

    if (!response.body) {
        throw new Error("ReadableStream not supported in this browser.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let fullText = '';
    let sources: Source[] = [];
    let buffer = '';

    while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
            buffer += decoder.decode(value, { stream: true });
            
            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // Keep the last partial line in buffer

            for (const line of lines) {
                if (!line.trim()) continue;
                try {
                    const json = JSON.parse(line);
                    if (json.textResponse) {
                        fullText += json.textResponse;
                        onChunk(fullText);
                    }
                    if (json.sources && json.sources.length > 0) {
                        sources = json.sources;
                        if (onSources) onSources(sources);
                    }
                } catch (e) {
                    console.error('Error parsing stream chunk:', e);
                }
            }
        }
    }

    return { text: fullText, sources };

  } catch (error: any) {
    console.error("Chat Service Error:", error);
    throw error;
  }
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/restapi';

import { ChatSession, ExportFormat, GeneratedFile } from '@/shared/types/types';

export const ChatService = {
    generateDocument: async (content: string, format: ExportFormat, name?: string): Promise<GeneratedFile> => {
        const response = await fetch(`${BASE_URL}/generated/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content, format, name })
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Failed to generate document' }));
            throw new Error(error.message);
        }
        return response.json();
    },

    fetchSessions: async (workspaceId: string, sessionId?: string | null): Promise<ChatSession[]> => {
        const url = sessionId 
            ? `${BASE_URL}/chatsession/${sessionId}?workspaceId=${workspaceId}` 
            : `${BASE_URL}/chatsession?workspaceId=${workspaceId}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch sessions');
        const sessions = await response.json();
        return Array.isArray(sessions) ? sessions : [sessions];
    },

    createSession: async (session: ChatSession): Promise<ChatSession> => {
        const response = await fetch(`${BASE_URL}/chatsession`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(session)
        });
        if (!response.ok) throw new Error('Failed to create session');
        return response.json();
    },

    getSession: async (id: string): Promise<ChatSession> => {
        const response = await fetch(`${BASE_URL}/chatsession/${id}`);
        if (!response.ok) throw new Error('Failed to fetch session');
        return response.json();
    },

    updateSession: async (session: ChatSession): Promise<ChatSession> => {
        const response = await fetch(`${BASE_URL}/chatsession/${session.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(session)
        });
        if (!response.ok) throw new Error('Failed to update session');
        return response.json();
    },

    renameSession: async (id: string, newTitle: string): Promise<ChatSession> => {
        const response = await fetch(`${BASE_URL}/chatsession/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle })
        });
        if (!response.ok) throw new Error('Failed to rename session');
        return response.json();
    },

    deleteSession: async (id: string): Promise<void> => {
        const response = await fetch(`${BASE_URL}/chatsession/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete session');
    }
};
