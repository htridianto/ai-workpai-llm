import { Message, Role, Attachment } from '../types/types';

export const streamChatResponse = async (
  modelId: string,
  history: Message[],
  newMessage: string,
  attachments: Attachment[],
  systemInstruction: string,
  onChunk: (text: string) => void
): Promise<string> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/restapi';
    
    const response = await fetch(`${baseUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        modelId,
        history,
        newMessage,
        attachments,
        systemInstruction
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

    while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
            const chunkValue = decoder.decode(value, { stream: true });
            fullText += chunkValue;
            onChunk(fullText);
        }
    }

    return fullText;

  } catch (error: any) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/restapi';

import { ChatSession } from '../types/types';

export const ChatService = {
    fetchSessions: async (): Promise<ChatSession[]> => {
        const response = await fetch(`${BASE_URL}/chatsession`);
        if (!response.ok) throw new Error('Failed to fetch sessions');
        return response.json();
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
            method: 'PUT',
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
