export enum Role {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export interface Attachment {
  mimeType: string;
  data: string; // Base64
  name?: string;
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  attachments?: Attachment[];
  timestamp: number;
  isError?: boolean;
}

export interface Folder {
  id: string;
  name: string;
  parentId?: string;
  dateCreated: number;
  isStarred?: boolean;
  isTrashed?: boolean;
  isShared?: boolean;
  isReadOnly?: boolean;
}

export interface Workspace {
  id: string;
  title: string;
  description?: string;
  symbol?: string; // Emoji or abbreviation
  color?: string; // UI decoration
  createdAt: number;
  similarityThreshold: number;
  contextItems: ContextItem[];
  folders: Folder[];
  systemInstruction?: string;
}

export interface ChatSession {
  id: string;
  workspaceId: string; // Link to parent workspace
  title: string;
  messages: Message[];
  modelId: string;
  createdAt: number;
}

export interface ContextItem {
  id: string;
  name: string;
  type: 'pdf' | 'txt' | 'link' | 'database' | 'whatsapp';
  status: 'indexed' | 'indexing' | 'error';
  dateAdded: number;
  isActive?: boolean;
  folderId?: string; 
  progress?: number; // 0-100
}

export interface ModelConfig {
  id: string;
  name: string;
  description: string;
  maxOutputTokens?: number;
  temperature?: number;
}

export interface AppSettings {
  defaultModelId: string;
  systemInstruction: string;
  temperature: number;
}

// --- Settings & Admin Types ---

export type UserRole = 'admin' | 'editor' | 'viewer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: 'active' | 'invited';
}

export type LLMProvider = 'openai' | 'gemini' | 'ollama' | 'anthropic';

export interface LLMConfiguration {
  provider: LLMProvider;
  apiKey?: string;
  baseUrl?: string; // For Ollama or LocalAI
  modelName: string;
}

// --- Generated Content Types ---

export type ExportFormat = 'pdf' | 'docx' | 'slides' | 'sheets' | 'image' | 'audio' | 'video';

export interface GeneratedFile {
  id: string;
  name: string;
  type: ExportFormat;
  dateCreated: number;
  size: number;
  snippet?: string;
  folderId?: string; 
  isStarred?: boolean;
  isTrashed?: boolean;
  isShared?: boolean;
  ownerId?: string; // ID of the user who owns the file
  sharedWith?: string[]; // IDs of users this file is shared with
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
  read: boolean;
}
