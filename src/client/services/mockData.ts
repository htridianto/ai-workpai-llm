


import { ChatSession, Role, UserProfile, GeneratedFile, Folder, Workspace, AppNotification } from '@/shared/types/types';

export const DUMMY_WORKSPACES: Workspace[] = [
  {
    id: 'ws-marketing',
    slug: 'marketing-brand',
    title: 'Marketing & Brand',
    description: 'Campaign assets, brand guidelines, and Q1 strategy docs.',
    symbol: 'M',
    color: 'bg-red-500',
    createdAt: Date.now() - 10000000,
    similarityThreshold: 0.7,
    systemInstruction: 'You are a senior marketing strategist.',
    folders: [
      { id: 'f-mkt-1', name: 'Campaigns 2024', dateCreated: Date.now() - 500000 },
    ],
    contextItems: [
      { id: 'ctx-mkt-1', name: 'Brand_Guidelines_v2.pdf', type: 'pdf', status: 'indexed', dateAdded: Date.now(), folderId: 'f-mkt-1' },
      { id: 'ctx-mkt-2', name: 'https://competitor.com/pricing', type: 'link', status: 'indexed', dateAdded: Date.now() }
    ]
  },
  {
    id: 'ws-engineering',
    slug: 'engineering',
    title: 'Engineering',
    description: 'API documentation, architecture decision records (ADRs), and sprint logs.',
    symbol: 'E',
    color: 'bg-blue-500',
    createdAt: Date.now() - 8000000,
    similarityThreshold: 0.8,
    systemInstruction: 'You are a principal software engineer.',
    folders: [],
    contextItems: [
      { id: 'ctx-eng-1', name: 'API_Spec_OAS3.yaml', type: 'txt', status: 'indexed', dateAdded: Date.now() },
      { id: 'ctx-eng-2', name: 'Migration_Plan_Legacy.pdf', type: 'pdf', status: 'indexing', dateAdded: Date.now() }
    ]
  },
  {
    id: 'ws-legal',
    slug: 'legal-hr',
    title: 'Legal & HR',
    description: 'Contract templates, employee handbook, and compliance docs.',
    symbol: 'L',
    color: 'bg-emerald-500',
    createdAt: Date.now() - 5000000,
    similarityThreshold: 0.85,
    systemInstruction: 'You are a legal assistant. Be precise and cite sources.',
    folders: [
      { id: 'f-leg-1', name: 'Contracts', dateCreated: Date.now() - 200000 }
    ],
    contextItems: [
      { id: 'ctx-leg-1', name: 'NDA_Template_2025.docx', type: 'pdf', status: 'indexed', dateAdded: Date.now(), folderId: 'f-leg-1' },
      { id: 'ctx-leg-2', name: 'Employee_Handbook.pdf', type: 'pdf', status: 'indexed', dateAdded: Date.now() }
    ]
  }
];

export const DUMMY_SESSIONS: ChatSession[] = [
  // Marketing Chats
  {
    id: 'session-1',
    workspaceId: 'ws-marketing',
    title: 'Q1 Strategy Brainstorm',
    modelId: 'gemini-3-flash-preview',
    contextItemIds: ['ctx-mkt-1'],
    createdAt: Date.now() - 900000,
    messages: [
      {
        id: 'msg-1',
        role: Role.USER,
        text: 'Based on the brand guidelines, give me 5 tagline ideas for the summer launch.',
        timestamp: Date.now() - 900000
      },
      {
        id: 'msg-2',
        role: Role.MODEL,
        text: 'Here are 5 tagline ideas aligned with the "Bold & Human" voice in your guidelines:\n1. *Ignite Your Summer*\n2. *Sunshine, Bottled.*\n3. *Live Loud, Live Warm.*\n4. *The Heat is On.*\n5. *Your Summer, Your Rules.*',
        timestamp: Date.now() - 890000
      }
    ]
  },
  {
    id: 'session-2',
    workspaceId: 'ws-marketing',
    title: 'Competitor Pricing Analysis',
    modelId: 'gemini-3-pro-preview',
    createdAt: Date.now() - 100000000, // Older
    contextItemIds: [],
    messages: []
  },
  // Engineering Chats
  {
    id: 'session-3',
    workspaceId: 'ws-engineering',
    title: 'API Authentication Error',
    modelId: 'gemini-3-pro-preview',
    contextItemIds: ['ctx-eng-1'],
    createdAt: Date.now() - 300000,
    messages: [
      {
         id: 'msg-eng-1',
         role: Role.USER,
         text: 'Why am I getting a 403 on the /users endpoint based on the spec?',
         timestamp: Date.now() - 300000
      }
    ]
  },
  // Legal Chats
  {
    id: 'session-4',
    workspaceId: 'ws-legal',
    title: 'NDA Clause Review',
    modelId: 'gemini-3-flash-preview',
    contextItemIds: ['ctx-leg-1'],
    createdAt: Date.now() - 50000,
    messages: []
  }
];

export const DUMMY_USERS: UserProfile[] = [
  { id: 'u-admin', name: 'Admin User', email: 'admin@local.host', role: 'admin', status: 'active' },
  { id: 'u2', name: 'Sarah Connor', email: 'sarah@skynet.com', role: 'default', status: 'active' },
  { id: 'u3', name: 'John Doe', email: 'john@example.com', role: 'default', status: 'invited' },
];

export const DUMMY_GENERATED_FOLDERS: Folder[] = [
    { id: 'gf-1', name: 'Q1 Reports', dateCreated: Date.now() - 2000000, isStarred: true },
    { id: 'gf-2', name: 'Media Assets', dateCreated: Date.now() - 1000000 },
    { id: 'gf-3', name: 'Drafts', dateCreated: Date.now() - 500000, parentId: 'gf-1' }, 
    { id: 'gf-4', name: 'Old Archives', dateCreated: Date.now() - 9000000, isTrashed: true },
];

export const DUMMY_GENERATED_FILES: GeneratedFile[] = [
  { 
    id: 'gen-1', 
    name: 'Q1_Strategy_Overview.pdf', 
    type: 'pdf', 
    dateCreated: Date.now() - 1500000, 
    size: 2450000,
    snippet: 'Comprehensive overview of Q1 marketing strategies including budget allocation...',
    folderId: 'gf-1',
    isStarred: true,
    ownerId: 'u-admin',
    sharedWith: []
  },
  { 
    id: 'gen-2', 
    name: 'Competitor_Analysis.docx', 
    type: 'docx', 
    dateCreated: Date.now() - 800000, 
    size: 56000,
    snippet: 'Deep dive into top 3 competitors and their recent product launches...',
    isShared: true,
    ownerId: 'u-admin',
    sharedWith: []
  },
  // File shared WITH the user (owned by someone else)
  { 
    id: 'gen-3', 
    name: 'Skynet_Protocols_v1.pdf', 
    type: 'pdf', 
    dateCreated: Date.now() - 20000, 
    size: 102400,
    snippet: 'Confidential system protocols for neural net deployment...',
    isShared: true,
    ownerId: 'u2', // Sarah
    sharedWith: ['u-admin']
  },
];

export const DUMMY_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    title: 'File Generated Successfully',
    message: 'Competitor_Analysis.docx is ready for download.',
    type: 'success',
    timestamp: Date.now() - 800000,
    read: false
  },
  {
    id: 'n2',
    title: 'File Generated Successfully',
    message: 'Q1_Strategy_Overview.pdf is ready for download.',
    type: 'success',
    timestamp: Date.now() - 1500000,
    read: true
  },
  {
    id: 'n3',
    title: 'Welcome to WorkPai',
    message: 'Get started by creating your first workspace.',
    type: 'info',
    timestamp: Date.now() - 10000000,
    read: true
  }
];
