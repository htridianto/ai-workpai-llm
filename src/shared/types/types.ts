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

export interface Source {
  id: string;
  title: string;
  url?: string;
  text?: string;
  [key: string]: any;
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  attachments?: Attachment[];
  timestamp: number;
  isError?: boolean;
  sources?: Source[];
}

export interface Workspace {
  id: string;
  slug: string;
  title: string;
  description?: string;
  symbol?: string; // Emoji or abbreviation
  color?: string; // UI decoration
  organizationId?: string;
  createdAt: number;
  similarityThreshold: number;
  fileContexts: FileContext[];
  folders: Folder[];
  virtualFolders: Folder[];
  systemInstruction?: string;  
  threads?: ChatSession[];
}

export interface Organization {
  id: string;
  name: string;
  description?: string;
  createdAt: number;
}

export interface OrganizationUser {
  organizationId: string;
  userId: string;
  role: UserRole;
}

export type UserRole = 'superuser' | 'admin' | 'manager' | 'member' | 'default';


export interface Folder {
  id: string;
  name: string;
  workspaceId: string;
  parentId?: string;
  dateCreated: number;
  isStarred?: boolean;
  isTrashed?: boolean;
  isShared?: boolean;
  isReadOnly?: boolean;
  isVirtual?: boolean;
  virtualType?: string;
}

export interface FileContext {
  id: string;
  name: string;
  workspaceId: string;
  folderId?: string;
  type: string; // 'pdf' | 'txt' | 'link' | 'database' | 'whatsapp'
  status: string; // 'indexed' | 'indexing' | 'error'
  size: number;
  snippet?: string;
  isStarred?: boolean;
  isShared?: boolean;
  isTrashed?: boolean;
  ownerId?: string;
  dateCreated: number;
  progress?: number; // 0-100
  meta?: any;
}


export interface ChatSession {
  id: string;
  slug?: string;
  workspaceId: string; // Link to parent workspace
  userId?: string;    // Owner of the session
  title: string;
  messages: Message[];
  modelId: string;
  createdAt: number;
  fileContextIds: string[]; // IDs of active file contexts for this session
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
export interface UserProfile {
  id: string;
  name: string;
  userName?: string;
  email: string;
  displayName?: string;  
  role?: UserRole;
  bio?: string;   
  image?: string;
  status?: 'active' | 'invited';
  password?: string;
  lastLoggedin?: string | Date | null; 
  createdAt?: string | Date;
  ssoAuthProvider?: string | null;
  organizations?: OrganizationUser[];
}

export type LLMProvider = 'openai' | 'gemini' | 'ollama' | 'anthropic';

export interface LLMConfiguration {
  provider: LLMProvider;
  apiKey?: string;
  baseUrl?: string; // For Ollama or LocalAI
  modelName: string;
}

// --- Generated Content Types ---

export type ExportFormat = 'pdf' | 'docx' | 'slides' | 'sheets' | 'image' | 'audio' | 'video' | 'notes';


export interface GeneratedFolder {
  id: string;
  name: string;
  parentId?: string;
  dateCreated: number;
  isStarred?: boolean;
  isTrashed?: boolean;
  isShared?: boolean;
  isReadOnly?: boolean;
}

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
  meta?: any;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
  read: boolean;
}
