'use client';

import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  UploadCloud, 
  Grid, 
  List as ListIcon, 
  Search, 
  ChevronRight, 
  Home, 
  FolderPlus, 
  Menu, 
  PanelLeftClose, 
  PanelLeft, 
  X, 
  Box, 
  Edit2 
} from 'lucide-react';
import { Workspace, ContextItem, Folder as FolderType } from '../../../types';
import { MockApi } from '../../../services/mockApiService';
import { WorkspaceService } from '../../../services/workspaceService';
import { InputModal } from '../../../components/Shared/InputModal';
import { ConfirmationModal } from '../../../components/Shared/ConfirmationModal';
import { FilePreviewModal } from '../../../components/Shared/FilePreviewModal';
import { WorkspaceModal } from '../../../components/Shared/WorkspaceModal';
import { FolderTree } from './_components/FolderTree';
import { Toast, ToastType } from '../../../components/Shared/Toast';

// New Sub-Components
import { AddContextPanel } from './_components/AddContextPanel';
import { WorkspaceList } from './_components/WorkspaceList';
import { FileManager } from './_components/FileManager';
import { useDashboard } from '../dashboard/DashboardContext';

// Define Virtual Folders
const VIRTUAL_FOLDERS = [
    { id: '.website_links', name: '.website_links', type: 'link', isVirtual: true },
    { id: '.whatsapp_groups', name: '.whatsapp_groups', type: 'whatsapp', isVirtual: true },
    { id: '.databases', name: '.databases', type: 'database', isVirtual: true }
];

export default function WorkspacesPage() {
  const router = useRouter();
  const { refreshWorkspaces } = useDashboard();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Layout State
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(null);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [toast, setToast] = useState<{message: string, type: ToastType, subMessage?: string} | null>(null);
  
  // Sidebar Toggles
  const [isWorkspaceSidebarOpen, setIsWorkspaceSidebarOpen] = useState(true);
  const [isFolderTreeOpen, setIsFolderTreeOpen] = useState(false); // Default Minimized

  // Modals & Actions
  const [isEditWorkspaceModalOpen, setIsEditWorkspaceModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [isRenameFolderModalOpen, setIsRenameFolderModalOpen] = useState(false); // New state for renaming folder
  
  // Inline Context Adder State
  const [isAddContextOpen, setIsAddContextOpen] = useState(false);
  
  // Specific Delete State for Files/Folders
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ 
      id: string; 
      type: 'file' | 'folder'; 
      name: string;
      validationString?: string;
  } | null>(null);

  // Preview State
  const [fileToPreview, setFileToPreview] = useState<ContextItem | null>(null);

  // Temporary state for Workspace actions
  const [itemToEditId, setItemToEditId] = useState<string | null>(null); 
  
  // Simulation Refs
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    loadWorkspaces();
    return () => {
        // Cleanup simulation timeouts on unmount
        timeouts.current.forEach(clearTimeout);
    };
  }, []);

  const loadWorkspaces = async () => {
    setIsLoading(true);
    try {
        const data = await WorkspaceService.fetchWorkspaces();
        setWorkspaces(data);
        if (data.length > 0 && !selectedWorkspaceId) {
            setSelectedWorkspaceId(data[0].id);
        }
    } catch (err) {
        setToast({ message: "Failed to load workspaces", type: "error" });
    } finally {
        setIsLoading(false);
    }
  };

  const selectedWorkspace = workspaces.find(s => s.id === selectedWorkspaceId);

  // --- Workspace Actions ---

  const handleCreateWorkspace = async () => {
    // 1. Check Limit (Optional, maybe remove for real API or keep as UI safeguard)
    if (workspaces.length >= 5) { // Bumped limit for now
        setToast({ 
            message: "Workspace Limit Reached", 
            subMessage: "You have reached the maximum number of workspaces.",
            type: 'error' 
        });
        return;
    }

    try {
        // Retrieve user ID from localStorage
        const savedAuth = localStorage.getItem('workpai_llm_auth');
        const user = savedAuth ? JSON.parse(savedAuth) : null;
        const userId = user?.id;

        const newWorkspaceData: any = {
          title: 'New Workspace ' + (workspaces.length + 1),
          description: 'A new workspace for your documents and chats.',
          user_id: userId
          // other defaults handled by API/Service
        };
        
        await WorkspaceService.createWorkspace(newWorkspaceData);
        // Refresh list
        loadWorkspaces(); 
        refreshWorkspaces();
        setToast({ message: "Workspace Created", type: "success" });
    } catch (err: any) {
        setToast({ message: "Failed to create workspace", type: "error", subMessage: err.message });
    }
  };

  const handleUpdateWorkspace = async (title: string, description: string) => {
    if (itemToEditId) {
      const ws = workspaces.find(s => s.id === itemToEditId);
      if(ws) {
          const updatedWs = { ...ws, title, description };
          await WorkspaceService.updateWorkspace(updatedWs.slug, updatedWs);
          setWorkspaces(prev => prev.map(s => s.id === itemToEditId ? updatedWs : s));
          refreshWorkspaces();
      }
      setIsEditWorkspaceModalOpen(false);
      setItemToEditId(null);
      setToast({ message: "Workspace Updated", type: "success" });
    }
  };    

  const handleDeleteWorkspace = async () => {
    if (itemToEditId) {
      const ws = workspaces.find(s => s.id === itemToEditId);
      if(ws) {  
        await WorkspaceService.deleteWorkspace(ws.slug);
        setWorkspaces(prev => prev.filter(s => s.id !== itemToEditId));
        if (selectedWorkspaceId === itemToEditId) {
          setSelectedWorkspaceId(null);
        }
        refreshWorkspaces();
        setIsDeleteModalOpen(false);
        setItemToEditId(null);
        setToast({ message: "Workspace Deleted", type: "info" });
      }else{
        setToast({ message: "Workspace to delete not found", type: "error" });
      }
    }else {
        setToast({ message: "Workspace to delete not found", type: "error" });
    }
  };

  const handleCreateDemoWorkspace = async () => {
    // Check limit for demo as well
    if (workspaces.length >= 5) {
        setToast({ 
            message: "Free Tier Limit Reached", 
            subMessage: "You cannot create a demo workspace because you have reached the limit of 4 workspaces.",
            type: 'error' 
        });
        return;
    }

    // Retrieve user ID from localStorage
    const savedAuth = localStorage.getItem('workpai_llm_auth');
    const user = savedAuth ? JSON.parse(savedAuth) : null;
    const userId = user?.id;    

    const newWorkspaceData: any = [{
        title: 'Marketing & Brand',
        description: 'Campaign assets, brand guidelines, and Q1 strategy docs.',
        user_id: userId
    }, {
        title: 'Engineering',
        description: 'API documentation, architecture decision records (ADRs), and sprint logs.',
        user_id: userId
    }, {
        title: 'Legal & HR',
        description: 'Contract templates, employee handbook, and compliance docs.',
        user_id: userId
    }];        
    setIsLoading(true);
    await Promise.all(newWorkspaceData.map(async (workspace) => {
        await WorkspaceService.createWorkspace(workspace);
    }));
    setIsLoading(false);
    loadWorkspaces();
    refreshWorkspaces();
    setToast({ message: "Demo Workspace Created", type: "success" });

    // const folder1Id = uuidv4();
    // const folder2Id = uuidv4();
    // const demoWorkspace: Workspace = {
    //   id: uuidv4(),
    //   slug: 'demo-project',
    //   title: 'Demo Project',
    //   description: 'A demo workspace pre-populated with folders and documents to showcase features.',
    //   symbol: 'D',
    //   color: 'bg-indigo-500',
    //   createdAt: Date.now(),
    //   similarityThreshold: 0.6,
    //   systemInstruction: 'You are a helpful demo assistant.',
    //   folders: [
    //     { id: folder1Id, name: 'Financials', dateCreated: Date.now() },
    //     { id: folder2Id, name: 'Marketing', dateCreated: Date.now() }
    //   ],
    //   contextItems: [
    //     { id: uuidv4(), name: 'Q1_Budget_Analysis.pdf', type: 'pdf', status: 'indexed', dateAdded: Date.now(), folderId: folder1Id },
    //     { id: uuidv4(), name: 'Campaign_Brief_v2.txt', type: 'txt', status: 'indexed', dateAdded: Date.now(), folderId: folder2Id },
    //     { id: uuidv4(), name: 'Competitor_Analysis.pdf', type: 'pdf', status: 'indexed', dateAdded: Date.now(), folderId: folder2Id },
    //     { id: uuidv4(), name: 'Meeting_Notes.txt', type: 'txt', status: 'indexed', dateAdded: Date.now() },
    //     // Add sample whatsapp for demo
    //     { id: uuidv4(), name: 'WA +15550192: Product Team', type: 'whatsapp', status: 'indexed', dateAdded: Date.now() },
    //     { id: uuidv4(), name: 'WA +15550192: Design Group', type: 'whatsapp', status: 'indexed', dateAdded: Date.now() },
    //     { id: uuidv4(), name: 'WA +447700900: Client A', type: 'whatsapp', status: 'indexed', dateAdded: Date.now() }
    //   ]
    // };

    // setIsLoading(true);
    // await MockApi.createWorkspace(demoWorkspace);
    // const updated = await MockApi.fetchWorkspaces();
    // setWorkspaces(updated);
    // setSelectedWorkspaceId(demoWorkspace.id);
    // setIsLoading(false);
    // setToast({ message: "Demo Workspace Ready", type: "success" });
  };

  // --- Context Handling ---

  const handleAddContext = async (newItems: ContextItem[]) => {
      if (!selectedWorkspace) return;
      
      const workspaceId = selectedWorkspace.id;
      
      const updatedWs = {
        ...selectedWorkspace,
        contextItems: [...(selectedWorkspace.contextItems || []), ...newItems]
      };
      
      // Optimistic update
      setWorkspaces(prev => prev.map(s => s.id === workspaceId ? updatedWs : s));
      
      // Persist initial state
      await MockApi.updateWorkspace(updatedWs);
      setToast({ message: `${newItems.length} items queued for indexing`, type: "info" });
      
      // Start Simulation
      newItems.forEach(item => {
          simulateItemProgress(workspaceId, item.id);
      });
  };
  
  const simulateItemProgress = (wsId: string, itemId: string) => {
    const totalSteps = 20;
    let currentStep = 0;
    
    const tick = () => {
        currentStep++;
        const progress = Math.min(Math.round((currentStep / totalSteps) * 100), 100);
        
        setWorkspaces(prev => prev.map(ws => {
            if (ws.id === wsId) {
                return {
                    ...ws,
                    contextItems: ws.contextItems.map(item => {
                        if (item.id === itemId) {
                             if (progress === 100) {
                                 return { ...item, progress: 100, status: 'indexed' };
                             }
                             return { ...item, progress: progress };
                        }
                        return item;
                    })
                };
            }
            return ws;
        }));

        if (currentStep < totalSteps) {
            // Random delay between 100ms and 300ms
            const delay = Math.random() * 200 + 100;
            const timeout = setTimeout(tick, delay);
            timeouts.current.push(timeout);
        } else {
             // Finalize (optional: sync with API)
             // In a real app, this would happen via websocket or polling
        }
    };

    tick();
  };

  // --- File Manager Actions ---

  const handleCreateFolder = async (folderName: string) => {
    if (!selectedWorkspace) return;
    
    const newFolder: FolderType = {
        id: uuidv4(),
        name: folderName,
        dateCreated: Date.now(),
        parentId: currentFolderId || undefined
    };

    const updatedWs = {
        ...selectedWorkspace,
        folders: [...(selectedWorkspace.folders || []), newFolder]
    };

    await MockApi.updateWorkspace(updatedWs);
    setWorkspaces(prev => prev.map(s => s.id === selectedWorkspace.id ? updatedWs : s));
    setIsNewFolderModalOpen(false);
    setToast({ message: "Folder Created", type: "success" });
  };

  const handleRenameFolder = async (newName: string) => {
      if (!selectedWorkspace || !currentFolderId) return;
      
      const updatedWs = { ...selectedWorkspace };
      updatedWs.folders = updatedWs.folders.map(f => f.id === currentFolderId ? { ...f, name: newName } : f);
      
      await MockApi.updateWorkspace(updatedWs);
      setWorkspaces(prev => prev.map(s => s.id === selectedWorkspace.id ? updatedWs : s));
      setIsRenameFolderModalOpen(false);
      setToast({ message: "Folder Renamed", type: "success" });
  };

  // Triggers Confirmation
  const requestDeleteFile = (file: ContextItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmation({ id: file.id, type: 'file', name: file.name });
  };

  // Triggers Confirmation
  const requestDeleteFolder = (folder: FolderType, e: React.MouseEvent) => {
    e.stopPropagation();
    if (folder.isReadOnly) return;

    // Check content
    const hasFiles = (selectedWorkspace?.contextItems || []).some(i => i.folderId === folder.id);
    const hasSubfolders = (selectedWorkspace?.folders || []).some(f => f.parentId === folder.id);
    const isNotEmpty = hasFiles || hasSubfolders;

    setDeleteConfirmation({ 
        id: folder.id, 
        type: 'folder', 
        name: folder.name,
        validationString: isNotEmpty ? folder.name : undefined
    });
  };

  // Executed after confirmation
  const handleConfirmDelete = async () => {
    if (!selectedWorkspace || !deleteConfirmation) return;

    let updatedWs = { ...selectedWorkspace };

    if (deleteConfirmation.type === 'file') {
       updatedWs.contextItems = (selectedWorkspace.contextItems || []).filter(i => i.id !== deleteConfirmation.id);
    } else {
       // Folder deletion: Remove folder AND items inside it (mock logic only)
       const folderIdsToDelete = [deleteConfirmation.id]; 
       const children = (selectedWorkspace.folders || []).filter(f => f.parentId === deleteConfirmation.id);
       children.forEach(c => folderIdsToDelete.push(c.id));

       updatedWs.folders = (selectedWorkspace.folders || []).filter(f => !folderIdsToDelete.includes(f.id));
       updatedWs.contextItems = (selectedWorkspace.contextItems || []).filter(i => !i.folderId || !folderIdsToDelete.includes(i.folderId));
       
       if (currentFolderId === deleteConfirmation.id) setCurrentFolderId(null);
    }

    await MockApi.updateWorkspace(updatedWs);
    setWorkspaces(prev => prev.map(s => s.id === selectedWorkspace.id ? updatedWs : s));
    setDeleteConfirmation(null);
    setToast({ message: `${deleteConfirmation.type === 'file' ? 'File' : 'Folder'} Deleted`, type: "success" });
  };

  // --- Filtering & Virtual Folders Logic ---
  
  // 1. Calculate Dynamic WA Folders based on file names
  const waFiles = (selectedWorkspace?.contextItems || []).filter(f => f.type === 'whatsapp');
  const uniqueWaNumbers = Array.from(new Set(waFiles.map(f => {
      // Expecting format: "WA <number>: <groupname>"
      const match = f.name.match(/^WA\s(.*?):/);
      return match ? match[1] : null;
  }))).filter(n => n !== null) as string[];

  const waVirtualFolders: FolderType[] = uniqueWaNumbers.map(num => ({
      id: `wa_virtual_${num}`,
      name: num,
      dateCreated: 0, 
      parentId: '.whatsapp_groups',
      isReadOnly: true
  }));

  // 2. Prepare Tree Data
  // Base Virtual Folders
  const baseVirtualFolders: FolderType[] = VIRTUAL_FOLDERS.map(vf => ({
      id: vf.id,
      name: vf.name,
      dateCreated: 0,
      parentId: undefined,
      isReadOnly: true
  }));

  // Combine: Base Virtual + Dynamic WA Children + User Folders
  const allFoldersForTree = [
      ...baseVirtualFolders, 
      ...waVirtualFolders,
      ...(selectedWorkspace?.folders || [])
  ];

  let currentFolders: FolderType[] = [];
  let currentFiles: ContextItem[] = [];

  // Helper to check if a folder ID is a virtual WA number folder
  const isWaNumberFolder = (id: string) => id.startsWith('wa_virtual_');

  if (currentFolderId === null) {
      // Root View
      const userFolders = (selectedWorkspace?.folders || []).filter(f => !f.parentId);
      
      const virtualFoldersForDisplay = VIRTUAL_FOLDERS.map(vf => ({
        id: vf.id,
        name: vf.name,
        dateCreated: Date.now(),
        parentId: undefined,
        isReadOnly: true
      }));

      currentFolders = [...virtualFoldersForDisplay, ...userFolders];

      currentFiles = (selectedWorkspace?.contextItems || []).filter(f => 
          !f.folderId && 
          !['link', 'whatsapp', 'database'].includes(f.type)
      );

  } else if (currentFolderId === '.whatsapp_groups') {
      // Inside .whatsapp_groups: Show folders for each phone number
      currentFolders = waVirtualFolders.map(f => ({ ...f, dateCreated: Date.now() }));
      currentFiles = []; // Don't show files directly here, force drilling down

  } else if (isWaNumberFolder(currentFolderId)) {
      // Inside a specific WA Number folder
      const number = currentFolderId.replace('wa_virtual_', '');
      
      currentFolders = [];
      currentFiles = (selectedWorkspace?.contextItems || []).filter(f => 
          f.type === 'whatsapp' && f.name.includes(number)
      );

  } else if (VIRTUAL_FOLDERS.find(v => v.id === currentFolderId)) {
      // Inside other Virtual Folders
      const vType = VIRTUAL_FOLDERS.find(v => v.id === currentFolderId)?.type;
      currentFolders = [];
      currentFiles = (selectedWorkspace?.contextItems || []).filter(f => f.type === vType);
  } else {
      // Inside a regular User Folder
      currentFolders = (selectedWorkspace?.folders || []).filter(f => f.parentId === currentFolderId);
      currentFiles = (selectedWorkspace?.contextItems || []).filter(f => f.folderId === currentFolderId);
  }

  // Breadcrumbs Logic
  const breadcrumbs: FolderType[] = [];
  let tempId = currentFolderId;
  
  // Handle WA Virtual Number Folders
  if (tempId && isWaNumberFolder(tempId)) {
      const num = tempId.replace('wa_virtual_', '');
      breadcrumbs.unshift({ id: tempId, name: num, dateCreated: 0, isReadOnly: true } as FolderType);
      tempId = '.whatsapp_groups'; // Parent is .whatsapp_groups
  }

  // Handle Standard Virtual Folders
  const currentVirtual = VIRTUAL_FOLDERS.find(v => v.id === tempId);
  if (currentVirtual) {
      breadcrumbs.unshift({ id: currentVirtual.id, name: currentVirtual.name, dateCreated: 0 } as FolderType);
      tempId = null;
  }

  // Handle Standard User Folders
  while (tempId && selectedWorkspace?.folders) {
      const folder = selectedWorkspace.folders.find(f => f.id === tempId);
      if(folder) {
          breadcrumbs.unshift(folder);
          tempId = folder.parentId || null;
      } else {
          break;
      }
  }

  // Rename ability check
  const canRenameCurrent = currentFolderId && 
                           !VIRTUAL_FOLDERS.find(v => v.id === currentFolderId) && 
                           !isWaNumberFolder(currentFolderId);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-charcoal-950 text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200 overflow-hidden">
      
      {/* LEFT PANEL: Workspace List (Collapsible) */}
      <WorkspaceList 
          isOpen={isWorkspaceSidebarOpen}
          workspaces={workspaces}
          selectedWorkspaceId={selectedWorkspaceId}
          isLoading={isLoading}
          onSelectWorkspace={(id) => { setSelectedWorkspaceId(id); setCurrentFolderId(null); }}
          onCreateWorkspace={handleCreateWorkspace}
          onCreateDemoWorkspace={handleCreateDemoWorkspace}
          onEditWorkspace={(id) => { setItemToEditId(id); setIsEditWorkspaceModalOpen(true); }}
          onDeleteWorkspace={(id) => { setItemToEditId(id); setIsDeleteModalOpen(true); }}
          onCollapse={() => setIsWorkspaceSidebarOpen(false)}
          onNavigateHome={() => router.push('/')}
          onEnterChat={(id) => router.push(`/dashboard/${id}`)}
      />

      {/* RIGHT PANEL: File Manager */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50 dark:bg-charcoal-950">
          
          {selectedWorkspace ? (
              <>
                {/* Manager Header */}
                <div className="h-16 border-b border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                        
                        {/* Toggle Workspace Sidebar (If Closed) */}
                        {!isWorkspaceSidebarOpen && (
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => router.push('/')} 
                                    className="p-2 text-charcoal-500 hover:bg-gray-100 dark:hover:bg-charcoal-800 rounded-lg transition-colors"
                                    title="Back to Dashboard"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                                <div className="h-4 w-px bg-gray-300 dark:bg-charcoal-700 mx-1"></div>
                                <button 
                                    onClick={() => setIsWorkspaceSidebarOpen(true)}
                                    className="p-2 text-charcoal-500 hover:bg-gray-100 dark:hover:bg-charcoal-800 rounded-lg"
                                    title="Expand Workspace List"
                                >
                                    <Menu size={20} />
                                </button>
                            </div>
                        )}

                        {/* Toggle Folder Tree Sidebar */}
                        <button 
                            onClick={() => setIsFolderTreeOpen(!isFolderTreeOpen)}
                            className={`p-2 rounded-lg transition-colors ${
                                isFolderTreeOpen 
                                ? 'bg-accent-50 dark:bg-accent-900/10 text-accent-600 dark:text-accent-500' 
                                : 'text-charcoal-500 hover:bg-gray-100 dark:hover:bg-charcoal-800'
                            }`}
                            title={isFolderTreeOpen ? "Collapse Folders" : "Expand Folders"}
                        >
                            {isFolderTreeOpen ? <PanelLeftClose size={20} /> : <PanelLeft size={20} />}
                        </button>
                    </div>
                </div>
                {/* ... Rest of structure similar to React version ... */}
                 
                 <div className="flex-1 flex overflow-hidden">
                    {/* FOLDER SIDEBAR (Collapsible) */}
                    <div className={`
                        bg-white dark:bg-charcoal-900 overflow-y-auto transition-all duration-300 ease-in-out
                        ${isFolderTreeOpen ? 'w-64 border-r border-gray-200 dark:border-charcoal-800' : 'w-0 border-none'}
                    `}>
                        <div className="min-w-[256px]">
                            <FolderTree 
                                folders={allFoldersForTree}
                                currentFolderId={currentFolderId}
                                onSelectFolder={setCurrentFolderId}
                                className="p-3"
                            />
                        </div>
                    </div>

                    {/* MAIN CONTENT AREA */}
                    <div className="flex-1 flex flex-col min-w-0">
                        {/* Toolbar */}
                        <div className="px-6 py-4 flex items-center justify-between border-b border-transparent md:border-gray-100 dark:md:border-charcoal-800/50">
                            <div className="flex-1 mr-4">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white truncate">
                                        {isAddContextOpen ? 'Add Data Source' : (currentFolderId ? breadcrumbs[breadcrumbs.length - 1]?.name : selectedWorkspace.title)}
                                    </h1>
                                    {/* Rename Button for Regular Folders */}
                                    {canRenameCurrent && !isAddContextOpen && (
                                        <button 
                                            onClick={() => setIsRenameFolderModalOpen(true)}
                                            className="p-1.5 bg-gray-100 dark:bg-charcoal-800 hover:bg-gray-200 dark:hover:bg-charcoal-700 text-charcoal-500 rounded-lg transition-colors"
                                            title="Rename Folder"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                    )}
                                </div>
                                <p className="text-sm text-charcoal-500 truncate mt-1">
                                    {isAddContextOpen ? 'Select and import data to your workspace' : (currentFolderId ? (isWaNumberFolder(currentFolderId || '') ? 'Connected Groups' : 'Folder Contents') : (selectedWorkspace.description || 'Manage your documents'))}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                {!isAddContextOpen && (
                                    <button 
                                        onClick={() => setIsNewFolderModalOpen(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-charcoal-800 border border-gray-300 dark:border-charcoal-600 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-gray-50 dark:hover:bg-charcoal-700 transition-colors text-sm font-medium"
                                    >
                                        <FolderPlus size={18} />
                                        <span>New Folder</span>
                                    </button>
                                )}
                                <button 
                                    onClick={() => setIsAddContextOpen(!isAddContextOpen)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all text-sm font-medium ${isAddContextOpen ? 'bg-charcoal-200 dark:bg-charcoal-700 text-slate-800 dark:text-slate-100' : 'bg-accent-600 hover:bg-accent-500 text-white shadow-accent-900/20'}`}
                                >
                                    {isAddContextOpen ? <X size={18} /> : <UploadCloud size={18} />}
                                    <span>{isAddContextOpen ? 'Cancel' : 'Add Context'}</span>
                                </button>
                            </div>
                        </div>

                        {/* INLINE ADD CONTEXT PANEL */}
                        {isAddContextOpen ? (
                            <div className="flex-1 overflow-y-auto">
                                <AddContextPanel 
                                    isOpen={true}
                                    onClose={() => setIsAddContextOpen(false)}
                                    onAddContext={handleAddContext}
                                    currentFolderId={currentFolderId}
                                    folders={selectedWorkspace?.folders || []}
                                />
                            </div>
                        ) : (
                            <FileManager 
                               currentFolders={currentFolders}
                               currentFiles={currentFiles}
                               allWorkspaceFiles={selectedWorkspace?.contextItems || []}
                               viewMode={viewMode}
                               onFolderClick={setCurrentFolderId}
                               onDeleteFolder={requestDeleteFolder}
                               onPreviewFile={setFileToPreview}
                               onDeleteFile={requestDeleteFile}
                            />
                        )}
                    </div>
                </div>
              </>
          ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-charcoal-400">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-charcoal-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                      <Box size={40} className="text-accent-500 opacity-50" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">No Workspace Selected</h2>
                  <p className="max-w-xs text-center">Select a workspace from the sidebar or create a new one to manage your files.</p>
              </div>
          )}
      </div>

      {/* --- Modals --- */}
      
      {/* Edit Workspace Details */}
      <WorkspaceModal
         isOpen={isEditWorkspaceModalOpen}
         title="Edit Workspace"
         initialTitle={workspaces.find(s => s.id === itemToEditId)?.title || ''}
         initialDescription={workspaces.find(s => s.id === itemToEditId)?.description || ''}
         onConfirm={handleUpdateWorkspace}
         onCancel={() => { setIsEditWorkspaceModalOpen(false); setItemToEditId(null); }}
      />

      {/* Rename Folder Modal */}
      <InputModal
          isOpen={isRenameFolderModalOpen}
          title="Rename Folder"
          initialValue={selectedWorkspace?.folders.find(f => f.id === currentFolderId)?.name || ''}
          confirmLabel="Rename"
          onConfirm={handleRenameFolder}
          onCancel={() => setIsRenameFolderModalOpen(false)}
      />

      {/* Workspace Delete Confirmation */}
      <ConfirmationModal
         isOpen={isDeleteModalOpen}
         title="Delete Workspace?"
         message={`Are you sure you want to delete "${workspaces.find(s => s.id === itemToEditId)?.title}"?`}
         validationString={workspaces.find(s => s.id === itemToEditId)?.slug}
         isDanger={true}
         onConfirm={handleDeleteWorkspace}
         onCancel={() => { setIsDeleteModalOpen(false); setItemToEditId(null); }}
      />
      
      {/* File/Folder Delete Confirmation */}
      <ConfirmationModal
         isOpen={!!deleteConfirmation}
         title={`Delete ${deleteConfirmation?.type === 'folder' ? 'Folder' : 'File'}?`}
         message={
             deleteConfirmation?.type === 'folder'
                ? deleteConfirmation.validationString
                    ? `This folder is not empty. To confirm deletion of "${deleteConfirmation.name}" and all its contents, please type the folder name below.`
                    : `Are you sure you want to delete empty folder "${deleteConfirmation?.name}"?`
                : `Are you sure you want to delete "${deleteConfirmation?.name}"?`
         }
         validationString={deleteConfirmation?.validationString}
         confirmLabel="Delete"
         isDanger={true}
         onConfirm={handleConfirmDelete}
         onCancel={() => setDeleteConfirmation(null)}
      />

      <InputModal
          isOpen={isNewFolderModalOpen}
          title="Create New Folder"
          initialValue="New Folder"
          confirmLabel="Create"
          onConfirm={handleCreateFolder}
          onCancel={() => setIsNewFolderModalOpen(false)}
      />

      <FilePreviewModal
          file={fileToPreview}
          onClose={() => setFileToPreview(null)}
      />

      <Toast 
        message={toast?.message || null}
        type={toast?.type}
        subMessage={toast?.subMessage}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
