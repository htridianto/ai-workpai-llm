'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { 
  ArrowLeft, 
  Grid, 
  List as ListIcon, 
  Search, 
  FolderPlus,
  Home,
  ChevronRight,
  Menu
} from 'lucide-react';
import { GeneratedFile, Folder } from '../../../types';
import { MockApi } from '../../../services/mockApiService';
import { DUMMY_USERS } from '../../../services/mockData';
import { FileCard } from '../../../components/Generated/FileCard';
import { FileRow } from '../../../components/Generated/FileRow';
import { FolderCard } from '../../../components/Generated/FolderCard';
import { FolderRow } from '../../../components/Generated/FolderRow';
import { GeneratedSidebar, GeneratedCategory } from '../../../components/Generated/GeneratedSidebar';
import { ConfirmationModal } from '../../../components/Shared/ConfirmationModal';
import { GeneratedFilePreviewModal } from '../../../components/Generated/GeneratedFilePreviewModal';
import { ShareModal } from '../../../components/Generated/ShareModal';
import { InputModal } from '../../../components/Shared/InputModal';
import { Toast, ToastType } from '../../../components/Shared/Toast';

const CURRENT_USER_ID = 'u-admin'; // Mocking logged in user for filter logic

export default function GeneratedContentPage() {
  const router = useRouter();
  
  // Data State
  const [files, setFiles] = useState<GeneratedFile[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Navigation State
  const [currentCategory, setCurrentCategory] = useState<GeneratedCategory>('home');
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // View State
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Actions State
  const [fileToDelete, setFileToDelete] = useState<GeneratedFile | null>(null);
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);
  const [fileToPreview, setFileToPreview] = useState<GeneratedFile | null>(null);
  const [fileToShare, setFileToShare] = useState<GeneratedFile | null>(null);
  const [toast, setToast] = useState<{message: string, type: ToastType, subMessage?: string} | null>(null);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const [fetchedFiles, fetchedFolders] = await Promise.all([
        MockApi.fetchGeneratedFiles(),
        MockApi.fetchGeneratedFolders()
    ]);
    setFiles(fetchedFiles);
    setFolders(fetchedFolders);
    setIsLoading(false);
  };

  const getUserName = (userId?: string) => {
      if (!userId) return undefined;
      const user = DUMMY_USERS.find(u => u.id === userId);
      return user ? user.name : undefined;
  };

  // --- Filtering Logic ---
  
  const getFilteredContent = () => {
    let filteredFiles = files;
    let filteredFolders = folders;

    // 1. Filter by Search Query (Global Search)
    if (searchQuery) {
       const lowerQuery = searchQuery.toLowerCase();
       const inTrash = currentCategory === 'trash';
       
       return {
         displayFiles: files.filter(f => 
             f.name.toLowerCase().includes(lowerQuery) && (inTrash ? f.isTrashed : !f.isTrashed)
         ),
         displayFolders: folders.filter(f => 
             f.name.toLowerCase().includes(lowerQuery) && (inTrash ? f.isTrashed : !f.isTrashed)
         )
       };
    }

    // 2. Filter by Category
    switch (currentCategory) {
        case 'home':
            // Show only non-trashed, match current folder (or root if null), owned by ME
            filteredFiles = files.filter(f => 
                !f.isTrashed && 
                (f.ownerId === undefined || f.ownerId === CURRENT_USER_ID) && // Backward compatibility for undefined owner
                (currentFolderId ? f.folderId === currentFolderId : !f.folderId)
            );
            filteredFolders = folders.filter(f => !f.isTrashed && (currentFolderId ? f.parentId === currentFolderId : !f.parentId));
            break;
        case 'shared':
             // Show non-trashed files SHARED WITH ME (not owned by me, but sharedWith includes me)
             filteredFiles = files.filter(f => 
                 !f.isTrashed && 
                 f.ownerId !== CURRENT_USER_ID && 
                 f.sharedWith?.includes(CURRENT_USER_ID)
             );
             filteredFolders = []; 
             break;
        case 'recent':
             // Flatten structure, sort by date, show all accessible (owned + shared)
             filteredFiles = files.filter(f => 
                 !f.isTrashed && 
                 (f.ownerId === CURRENT_USER_ID || f.sharedWith?.includes(CURRENT_USER_ID))
             ).sort((a, b) => b.dateCreated - a.dateCreated);
             filteredFolders = []; 
             break;
        case 'starred':
             // Show starred files (owned or shared) - NO FOLDERS requested
             filteredFiles = files.filter(f => !f.isTrashed && f.isStarred);
             filteredFolders = []; 
             break;
        case 'trash':
             // Show trashed files owned by me
             filteredFiles = files.filter(f => f.isTrashed && f.ownerId === CURRENT_USER_ID);
             filteredFolders = folders.filter(f => f.isTrashed);
             break;
    }

    return { displayFiles: filteredFiles, displayFolders: filteredFolders };
  };

  const { displayFiles, displayFolders } = getFilteredContent();

  // --- Breadcrumb Logic ---
  const breadcrumbs: Folder[] = [];
  if (currentCategory === 'home' && !searchQuery) {
    let tempId = currentFolderId;
    while (tempId) {
        const folder = folders.find(f => f.id === tempId);
        if(folder) {
            breadcrumbs.unshift(folder);
            tempId = folder.parentId || null;
        } else {
            break;
        }
    }
  }

  // --- Actions ---

  const showNotification = (msg: string, type: ToastType = 'success') => {
      setToast({ message: msg, type });
  };

  const handleCategoryChange = (category: GeneratedCategory) => {
      setCurrentCategory(category);
      setCurrentFolderId(null); // Reset folder navigation when switching categories
      setIsMobileSidebarOpen(false);
  };

  const handleCreateFolder = async (name: string) => {
      const newFolder: Folder = {
          id: uuidv4(),
          name,
          dateCreated: Date.now(),
          parentId: currentFolderId || undefined
      };
      
      await MockApi.createGeneratedFolder(newFolder);
      setFolders(prev => [...prev, newFolder]);
      setIsNewFolderModalOpen(false);
      showNotification(`Folder "${name}" created.`);
  };

  const handleDownload = (file: GeneratedFile) => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = file.name;
    showNotification(`Downloading ${file.name}...`, 'info');
    setTimeout(() => {
        showNotification(`Download Complete: ${file.name}`);
    }, 1500);
  };

  const handleShareFile = (file: GeneratedFile) => {
    setFileToShare(file);
  };

  const confirmShare = async (userIds: string[]) => {
      if (fileToShare && userIds.length > 0) {
          await MockApi.shareFile(fileToShare.id, userIds);
          // Update local state
          setFiles(prev => prev.map(f => {
              if (f.id === fileToShare.id) {
                  const currentShared = f.sharedWith || [];
                  const newShared = [...new Set([...currentShared, ...userIds])];
                  return { ...f, sharedWith: newShared, isShared: true };
              }
              return f;
          }));
          showNotification(`File shared with ${userIds.length} users.`);
          setFileToShare(null);
      }
  };

  const handleToggleStar = async (file: GeneratedFile) => {
      await MockApi.toggleFileStar(file.id);
      setFiles(prev => prev.map(f => f.id === file.id ? { ...f, isStarred: !f.isStarred } : f));
      // No notification needed for quick star actions usually, feels snappier without
  };

  const handleDeleteFileRequest = (file: GeneratedFile) => {
    setFileToDelete(file);
  };
  
  const handleDeleteFolderRequest = (folder: Folder) => {
      setFolderToDelete(folder);
  };

  const confirmDeleteFile = async () => {
    if (fileToDelete) {
        await MockApi.deleteGeneratedFile(fileToDelete.id);
        setFiles(prev => prev.filter(f => f.id !== fileToDelete.id));
        setFileToDelete(null);
        showNotification("File deleted.");
    }
  };

  const confirmDeleteFolder = async () => {
      if(folderToDelete) {
          await MockApi.deleteGeneratedFolder(folderToDelete.id);
          setFolders(prev => prev.filter(f => f.id !== folderToDelete.id));
          setFiles(prev => prev.filter(f => f.folderId !== folderToDelete.id));
          setFolderToDelete(null);
          showNotification("Folder deleted.");
      }
  };

  const calculateStorage = () => {
      return files.reduce((acc, curr) => acc + curr.size, 0);
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-charcoal-950 text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200 flex flex-col overflow-hidden">
      
      {/* Header */}
      <header className="bg-white dark:bg-charcoal-900 border-b border-gray-200 dark:border-charcoal-800 shrink-0 z-20">
        <div className="max-w-full px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 min-w-0 mr-4">
            <button 
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className="md:hidden p-2 text-charcoal-500 hover:bg-gray-100 dark:hover:bg-charcoal-800 rounded-lg"
            >
                <Menu size={20} />
            </button>
            <button 
              onClick={() => router.push('/')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-charcoal-800 text-charcoal-500 transition-colors shrink-0"
              title="Back to Dashboard"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold hidden sm:block">Generated Contents</h1>

            {/* Breadcrumbs - Only visible in Home category */}
            {currentCategory === 'home' && !searchQuery && (
                <div className="hidden md:flex items-center overflow-hidden whitespace-nowrap mask-linear-fade ml-4 pl-4 border-l border-gray-200 dark:border-charcoal-800 h-8">
                    <button 
                        onClick={() => setCurrentFolderId(null)}
                        className={`flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors text-sm ${!currentFolderId ? 'text-slate-900 dark:text-white font-bold' : 'text-charcoal-500'}`}
                    >
                        <Home size={16} />
                        <span className="hidden lg:inline">My Content</span>
                    </button>
                    {breadcrumbs.map(folder => (
                        <React.Fragment key={folder.id}>
                            <ChevronRight size={14} className="mx-1 text-charcoal-400 shrink-0" />
                            <button 
                                onClick={() => setCurrentFolderId(folder.id)}
                                className={`hover:text-slate-900 dark:hover:text-white transition-colors text-sm ${currentFolderId === folder.id ? 'text-slate-900 dark:text-white font-bold' : 'text-charcoal-500'}`}
                            >
                                {folder.name}
                            </button>
                        </React.Fragment>
                    ))}
                </div>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
             {/* Search */}
             <div className="flex items-center bg-gray-100 dark:bg-charcoal-800 px-3 py-2 rounded-lg border border-transparent focus-within:border-accent-500 focus-within:ring-1 focus-within:ring-accent-500 transition-all">
                 <Search size={16} className="text-charcoal-400" />
                 <input 
                   type="text" 
                   placeholder="Search..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-32 md:w-64 text-slate-800 dark:text-slate-200 placeholder-charcoal-500" 
                 />
             </div>

             {/* View Toggle */}
             <div className="hidden sm:flex items-center bg-gray-100 dark:bg-charcoal-800 rounded-lg p-1 border border-gray-200 dark:border-charcoal-700">
                 <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-charcoal-700 shadow-sm text-accent-600 dark:text-accent-400' : 'text-charcoal-400'}`}>
                    <Grid size={16} />
                 </button>
                 <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white dark:bg-charcoal-700 shadow-sm text-accent-600 dark:text-accent-400' : 'text-charcoal-400'}`}>
                    <ListIcon size={16} />
                 </button>
             </div>
             
             {currentCategory === 'home' && !searchQuery && (
                 <button 
                    onClick={() => setIsNewFolderModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-accent-600 hover:bg-accent-500 text-white rounded-lg shadow-md transition-colors text-sm font-medium"
                 >
                     <FolderPlus size={16} />
                     <span className="hidden sm:inline">New Folder</span>
                 </button>
             )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
          {/* Sidebar */}
          <div className={`
              absolute inset-y-0 left-0 z-10 transform transition-transform duration-300 md:relative md:translate-x-0
              ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
              <GeneratedSidebar 
                 activeCategory={currentCategory} 
                 onSelectCategory={handleCategoryChange}
                 storageUsed={calculateStorage()}
                 storageLimit={15 * 1024 * 1024 * 1024} // 15GB Mock Limit
              />
          </div>

          {/* Backdrop for mobile */}
          {isMobileSidebarOpen && (
              <div 
                className="absolute inset-0 z-0 bg-black/50 md:hidden"
                onClick={() => setIsMobileSidebarOpen(false)}
              ></div>
          )}

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-charcoal-950 p-4 sm:p-6 lg:p-8 w-full">
            
            {/* Context Title for Mobile or when Breadcrumbs Hidden */}
            {(currentCategory !== 'home' || searchQuery) && (
                <h2 className="text-xl font-bold mb-6 capitalize text-slate-800 dark:text-slate-100">
                    {searchQuery ? `Search Results: "${searchQuery}"` : currentCategory.replace('-', ' ')}
                </h2>
            )}

            {isLoading ? (
               <div className="flex items-center justify-center h-64">
                  <div className="w-8 h-8 border-4 border-charcoal-200 dark:border-charcoal-800 border-t-accent-500 rounded-full animate-spin"></div>
               </div>
            ) : displayFiles.length === 0 && displayFolders.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-96 text-charcoal-400">
                   <div className="w-20 h-20 bg-gray-100 dark:bg-charcoal-800 rounded-2xl flex items-center justify-center mb-6">
                      {searchQuery ? <Search size={40} className="text-charcoal-300" /> : <FolderPlus size={40} className="text-charcoal-300" />}
                   </div>
                   <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                       {searchQuery ? 'No results found' : 'No items here'}
                   </h3>
                   <p className="text-sm">
                       {searchQuery ? 'Try a different search term.' : `Your ${currentCategory} list is empty.`}
                   </p>
               </div>
            ) : (
               <div className="space-y-8">
                  {/* Folders Section */}
                  {displayFolders.length > 0 && (
                      <div>
                          <h2 className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider mb-4">Folders</h2>
                          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' : 'grid-cols-1'}`}>
                              {displayFolders.map(folder => (
                                  viewMode === 'grid' ? (
                                      <FolderCard 
                                        key={folder.id} 
                                        folder={folder} 
                                        onOpen={(f) => {
                                            if (currentCategory === 'home') setCurrentFolderId(f.id);
                                            else showNotification("Folder navigation only available in My Content", 'info');
                                        }} 
                                        onDelete={handleDeleteFolderRequest}
                                      />
                                  ) : (
                                      <FolderRow 
                                        key={folder.id} 
                                        folder={folder} 
                                        onOpen={(f) => {
                                            if (currentCategory === 'home') setCurrentFolderId(f.id);
                                            else showNotification("Folder navigation only available in My Content", 'info');
                                        }} 
                                        onDelete={handleDeleteFolderRequest}
                                      />
                                  )
                              ))}
                          </div>
                      </div>
                  )}
                  
                  {/* Files Section */}
                  {displayFiles.length > 0 && (
                      <div>
                          <h2 className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider mb-4">Files</h2>
                          {viewMode === 'grid' ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                              {displayFiles.map(file => (
                                <FileCard 
                                    key={file.id} 
                                    file={file} 
                                    ownerName={file.ownerId && file.ownerId !== CURRENT_USER_ID ? getUserName(file.ownerId) : undefined}
                                    onView={setFileToPreview}
                                    onDownload={handleDownload}
                                    onShare={handleShareFile}
                                    onDelete={handleDeleteFileRequest}
                                    onToggleStar={handleToggleStar}
                                />
                              ))}
                            </div>
                          ) : (
                            <div className="bg-white dark:bg-charcoal-900 rounded-xl border border-gray-200 dark:border-charcoal-800 overflow-hidden">
                               <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold text-charcoal-500 border-b border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-950">
                                   <div className="col-span-5">Name</div>
                                   <div className="col-span-2">Date Modified</div>
                                   <div className="col-span-2">File Size</div>
                                   <div className="col-span-3 text-right">Actions</div>
                               </div>
                               {displayFiles.map(file => (
                                 <FileRow 
                                    key={file.id} 
                                    file={file}
                                    ownerName={file.ownerId && file.ownerId !== CURRENT_USER_ID ? getUserName(file.ownerId) : undefined}
                                    onView={setFileToPreview}
                                    onDownload={handleDownload}
                                    onShare={handleShareFile}
                                    onDelete={handleDeleteFileRequest}
                                    onToggleStar={handleToggleStar}
                                 />
                               ))}
                            </div>
                          )}
                      </div>
                  )}
               </div>
            )}
          </main>
      </div>

      {/* Delete Confirmation Modal for Files */}
      <ConfirmationModal 
         isOpen={!!fileToDelete}
         title="Delete File"
         message={`Are you sure you want to delete "${fileToDelete?.name}"? ${currentCategory === 'trash' ? 'This will be permanent.' : 'It will be moved to trash.'}`}
         confirmLabel="Delete"
         isDanger={true}
         onConfirm={confirmDeleteFile}
         onCancel={() => setFileToDelete(null)}
      />

       {/* Delete Confirmation Modal for Folders */}
       <ConfirmationModal 
         isOpen={!!folderToDelete}
         title="Delete Folder"
         message={`Are you sure you want to delete "${folderToDelete?.name}"? All contents inside will be lost.`}
         confirmLabel="Delete Folder"
         isDanger={true}
         onConfirm={confirmDeleteFolder}
         onCancel={() => setFolderToDelete(null)}
      />

      {/* New Folder Modal */}
      <InputModal 
         isOpen={isNewFolderModalOpen}
         title="Create New Folder"
         initialValue=""
         confirmLabel="Create"
         onConfirm={handleCreateFolder}
         onCancel={() => setIsNewFolderModalOpen(false)}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={!!fileToShare}
        fileName={fileToShare?.name || ''}
        users={DUMMY_USERS.filter(u => u.id !== CURRENT_USER_ID)} // Don't allow sharing with self in this list
        onConfirm={confirmShare}
        onCancel={() => setFileToShare(null)}
      />

      {/* Preview Modal */}
      <GeneratedFilePreviewModal 
        file={fileToPreview}
        onClose={() => setFileToPreview(null)}
        onDownload={handleDownload}
      />
      
      {/* Toast Notification */}
      <Toast 
        message={toast?.message || null}
        type={toast?.type}
        subMessage={toast?.subMessage}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
