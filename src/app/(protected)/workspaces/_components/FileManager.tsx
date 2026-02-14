import React, { useState, useEffect } from 'react';
import { 
  Folder, 
  Trash2, 
  Eye, 
  FileText, 
  Link as LinkIcon, 
  Database,
  MessageCircle,
  UploadCloud,
  Lock,
  Calendar,
  Layers,
  Loader2,
  RefreshCw,
  FolderPlus,
  Edit2,
  X,
  MoveHorizontal,
  ChevronLeft
} from 'lucide-react';
import { Folder as FolderType, FileContext, Workspace } from '@/shared/types/types';
import { WorkspaceService } from '@/client/services/workspaceService';
import { useDashboard } from '@/app/(protected)/dashboard/DashboardContext';
import { InputModal } from '@/client/components/Shared/InputModal';
import { ConfirmationModal } from '@/client/components/Shared/ConfirmationModal';
import { FilePreviewModal } from '@/client/components/Shared/FilePreviewModal';
import { FolderTree } from './FolderTree';
import { AddContextPanel } from './AddContextPanel';
import { MoveToFolderModal } from './MoveToFolderModal';

interface FileManagerProps {
  selectedWorkspace: Workspace;
  viewMode: 'grid' | 'list';
  isFolderTreeOpen: boolean;
  setIsFolderTreeOpen: (open: boolean) => void;
}


export const FileManager: React.FC<FileManagerProps> = ({
  selectedWorkspace,
  viewMode,
  isFolderTreeOpen,
  setIsFolderTreeOpen
}) => {
  const { refreshWorkspaces, setToast } = useDashboard();
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [isAddContextOpen, setIsAddContextOpen] = useState(false);
  const [lastFolderTreeOpen, setLastFolderTreeOpen] = useState<boolean | null>(null);
  
  // Modals state
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [isRenameFolderModalOpen, setIsRenameFolderModalOpen] = useState(false);
  const [isRenameFileModalOpen, setIsRenameFileModalOpen] = useState(false);
  const [isMoveFileModalOpen, setIsMoveFileModalOpen] = useState(false);
  const [fileToRename, setFileToRename] = useState<FileContext | null>(null);
  const [fileToMove, setFileToMove] = useState<FileContext | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ 
      id: string; 
      type: 'file' | 'folder'; 
      name: string;
      validationString?: string;
  } | null>(null);
  const [fileToPreview, setFileToPreview] = useState<FileContext | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  // Sync currentFolderId when workspace changes
  useEffect(() => {
    setCurrentFolderId(null);
    setIsAddContextOpen(false);  
    setIsFolderTreeOpen(lastFolderTreeOpen || true);   
  }, [selectedWorkspace.id]);

  useEffect(() => {
    if(!isAddContextOpen){
      setLastFolderTreeOpen(isFolderTreeOpen);
    }
  }, [isFolderTreeOpen]);

//   useEffect(() => {    
//     if(currentFolderId){
//       setIsFolderTreeOpen(lastFolderTreeOpen || true); 
//     }
//   }, [currentFolderId]);
  
  useEffect(() => {
    if(isAddContextOpen){
        setIsFolderTreeOpen(false); 
    }else if(lastFolderTreeOpen){
        setIsFolderTreeOpen(true); 
    }
  }, [isAddContextOpen]);

  // --- Folder Actions ---
  const handleCreateFolder = async (folderName: string) => {
    setIsLoading(true);
    try {
        await WorkspaceService.createFolder({
            name: folderName,
            workspaceId: selectedWorkspace.slug,
            parentFolderId: currentFolderId || undefined
        });
        await refreshWorkspaces();
        setIsNewFolderModalOpen(false);
        setToast({ message: "Folder Created", type: "success" });
    } catch (error: any) {
        setToast({ message: "Failed to create folder", type: "error", subMessage: error.message });
    } finally {
        setIsLoading(false);
    }
  };

  const handleRenameFolder = async (newName: string) => {
      if (!currentFolderId) return;
      setIsLoading(true);
      try {
          await WorkspaceService.updateFolder(currentFolderId, { name: newName });
          await refreshWorkspaces();
          setIsRenameFolderModalOpen(false);
          setToast({ message: "Folder Renamed", type: "success" });
      } catch (error: any) {
          setToast({ message: "Failed to rename folder", type: "error", subMessage: error.message });
      } finally {
          setIsLoading(false);
      }
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmation) return;
    setIsLoading(true);
    try {
        if (deleteConfirmation.type === 'file') {
            await WorkspaceService.deleteFileContext(deleteConfirmation.id);
        } else {
            await WorkspaceService.deleteFolder(deleteConfirmation.id);
            if (currentFolderId === deleteConfirmation.id) setCurrentFolderId(null);
        }

        await refreshWorkspaces();
        setDeleteConfirmation(null);
        setToast({ message: `${deleteConfirmation.type === 'file' ? 'File' : 'Folder'} Deleted`, type: "success" });
    } catch (error: any) {
        setToast({ message: `Failed to delete ${deleteConfirmation.type}`, type: "error", subMessage: error.message });
    } finally {
        setIsLoading(false);
    }
  };

  const handleRenameFile = async (newName: string) => {
    if (!fileToRename) return;
    setIsLoading(true);
    try {
        await WorkspaceService.updateFileContext(fileToRename.id, { name: newName });
        await refreshWorkspaces();
        setIsRenameFileModalOpen(false);
        setFileToRename(null);
        setToast({ message: "File Renamed", type: "success" });
    } catch (error: any) {
        setToast({ message: "Failed to rename file", type: "error", subMessage: error.message });
    } finally {
        setIsLoading(false);
    }
  };

  const handleMoveFile = async (targetFolderId: string | null) => {
    if (!fileToMove) return;
    setIsLoading(true);
    try {
        await WorkspaceService.updateFileContext(fileToMove.id, { folderId: targetFolderId });
        await refreshWorkspaces();
        setIsMoveFileModalOpen(false);
        setFileToMove(null);
        setToast({ message: "File Moved", type: "success" });
    } catch (error: any) {
        setToast({ message: "Failed to move file", type: "error", subMessage: error.message });
    } finally {
        setIsLoading(false);
    }
  };

    const allFoldersForTree = [...(selectedWorkspace?.folders || [])];

  let currentFolders: FolderType[] = [];
  let currentFiles: FileContext[] = [];

  const isWaNumberFolder = (id: string) => id.startsWith('.wa_number_');

  if (currentFolderId === null) {
      currentFolders = (selectedWorkspace?.folders || []).filter(f => !f.parentId);
      currentFiles = (selectedWorkspace?.fileContexts || []).filter(f => !f.folderId && !['link', 'whatsapp', 'database'].includes(f.type));
  } else {
      currentFolders = (selectedWorkspace?.folders || []).filter(f => f.parentId === currentFolderId);
      currentFiles = (selectedWorkspace?.fileContexts || []).filter(f => f.folderId === currentFolderId);
  }

  // Breadcrumbs Logic
  const breadcrumbs: FolderType[] = [];
  let tempId = currentFolderId;
  while (currentFolderId && selectedWorkspace?.folders) {
      const folder = selectedWorkspace.folders.find(f => f.id === tempId);
      if(folder) {
          breadcrumbs.unshift(folder);
          tempId = folder.parentId || null;
      } else break;
  }
  const currentFolder = allFoldersForTree?.find(v => v.id === currentFolderId);
  const canRenameCurrent = currentFolderId && !currentFolder?.isReadOnly;

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* FOLDER SIDEBAR (Collapsible) */}
      <div className={`
          bg-white dark:bg-charcoal-900 overflow-y-auto transition-all duration-300 ease-in-out
          ${isFolderTreeOpen ? 'w-64 border-r border-gray-200 dark:border-charcoal-800' : 'w-0 border-none'}
      `}>
          <div className="min-w-[256px]">
              <FolderTree 
                  workspace={selectedWorkspace}
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
                      {canRenameCurrent && !isAddContextOpen && (
                        <>
                          <button 
                              onClick={() => setIsRenameFolderModalOpen(true)}
                              className="p-1.5 bg-gray-100 dark:bg-charcoal-800 hover:bg-gray-200 dark:hover:bg-charcoal-700 text-charcoal-500 rounded-lg transition-colors"
                              title="Rename Folder"
                          >
                              <Edit2 size={16} />
                          </button>
                           <button 
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                setDeleteConfirmation({ id: currentFolderId, type: 'folder', name: breadcrumbs[breadcrumbs.length - 1]?.name, validationString: undefined }); 
                              }}
                              className="ms-[-10px] p-1.5 bg-gray-100 dark:bg-charcoal-800 hover:bg-gray-200 dark:hover:bg-charcoal-700 text-charcoal-500 rounded-lg transition-colors"
                              title="Delete Folder"
                          >
                              <Trash2 size={16} />
                          </button>
                        </>
                      )}
                  </div>
                  <p className="flex items-center gap-1 text-sm text-charcoal-500 mt-1 --truncate --line-clamp-3">
                    {(!isAddContextOpen && currentFolderId) && (
                    <button 
                        onClick={() => setCurrentFolderId(currentFolder?.parentId || null)}
                        className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-charcoal-800 text-charcoal-400 hover:text-slate-900 dark:hover:text-slate-200"
                        title="Collapse Sidebar"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    )}
                    {isAddContextOpen ? 'Select and import data to your workspace' : (currentFolderId ? (isWaNumberFolder(currentFolderId || '') ? 'Connected Groups' : 'Folder Contents') : (selectedWorkspace.description || 'Manage your documents'))}
                  </p>
              </div>
              <div className="flex gap-3">
                  {(currentFolder && currentFolder.isShared) && !isAddContextOpen && (
                      <button 
                          onClick={() => setIsNewFolderModalOpen(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-charcoal-800 border border-gray-300 dark:border-charcoal-600 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-gray-50 dark:hover:bg-charcoal-700 transition-colors text-sm font-medium"
                      >
                          <FolderPlus size={18} />
                          <span>New Folder</span>
                      </button>
                  )}
                  <button 
                      onClick={() => {setIsAddContextOpen(!isAddContextOpen);}}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all text-sm font-medium ${isAddContextOpen ? 'bg-charcoal-200 dark:bg-charcoal-700 text-slate-800 dark:text-slate-100' : 'bg-accent-600 hover:bg-accent-500 text-white shadow-accent-900/20'}`}
                  >
                      {isAddContextOpen ? <X size={18} /> : <UploadCloud size={18} />}
                      <span>{isAddContextOpen ? 'Cancel' : 'Add Context'}</span>
                  </button>
              </div>
          </div>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4">
            {isAddContextOpen ? (
                <AddContextPanel 
                    isOpen={true}
                    onClose={() => setIsAddContextOpen(false)}
                    onAddContext={refreshWorkspaces}
                    currentFolderId={currentFolderId}
                    folders={selectedWorkspace?.folders || []}
                    selectedWorkspace={selectedWorkspace}
                />
            ) : (
                <>
                  {currentFolders.length === 0 && currentFiles.length === 0 ? (
                      <div className="h-64 flex flex-col items-center justify-center text-charcoal-400 border-2 border-dashed border-gray-300 dark:border-charcoal-700 rounded-2xl bg-white/50 dark:bg-charcoal-900/50">
                          <div className="w-16 h-16 bg-gray-100 dark:bg-charcoal-800 rounded-full flex items-center justify-center mb-4">
                              <UploadCloud size={32} className="opacity-50" />
                          </div>
                          <p className="font-medium text-slate-600 dark:text-slate-300">This folder <i>{(currentFolderId ? breadcrumbs[breadcrumbs.length - 1]?.name : selectedWorkspace.title)}</i> is empty</p>
                          <p className="text-sm">Add files, database connections, or links to get started.</p>
                      </div>
                  ) : (
                      <>
                        {currentFolders.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider mb-3">{currentFolder?.name === '.whatsapp' ? 'WhatsApp Numbers' : 'Folders'}</h3>
                                <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-1'}`}>
                                    {currentFolders.map(folder => {
                                        const isPrivate = folder.isReadOnly;
                                        const childrenCount = (selectedWorkspace?.folders || []).filter(f => f.parentId === folder.id).length;
                                        const fileCount = (selectedWorkspace.fileContexts || []).filter(f => f.folderId === folder.id).length;
                                        return (
                                            (folder.isShared || (!folder.isShared && (fileCount > 0 || childrenCount > 0))) && (
                                            <div 
                                                key={folder.id}
                                                onClick={() => setCurrentFolderId(folder.id)}
                                                className={`group relative flex items-center gap-3 p-4 bg-white dark:bg-charcoal-800 border border-gray-200 dark:border-charcoal-700 rounded-xl hover:border-accent-500/50 hover:shadow-md cursor-pointer transition-all ${viewMode === 'list' ? 'flex-row' : 'flex-col justify-between text-center aspect-[4/3]'}`}
                                            >
                                                <div className={`p-3 rounded-lg ${isPrivate ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-500' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-500'} ${viewMode === 'list' ? '' : 'mb-2 mx-auto'}`}>
                                                    {isPrivate ? <Lock size={viewMode === 'grid' ? 32 : 24} className="opacity-80" /> : <Folder size={viewMode === 'grid' ? 32 : 24} fill="currentColor" className="opacity-80" />}
                                                </div>
                                                <div className={`min-w-0 flex-1 w-full`}>
                                                    <span className={`font-medium text-sm truncate w-full block ${isPrivate ? 'text-orange-600 dark:text-orange-400 font-mono tracking-tight' : 'text-slate-700 dark:text-slate-200'}`}>{folder.name}</span>
                                                    <div className={`flex items-center gap-2 text-[10px] text-charcoal-400 ${viewMode === 'grid' ? 'justify-center mt-1.5' : 'justify-end mt-[-25px]'}`}>
                                                        <span className="flex items-center gap-1 bg-gray-100 dark:bg-charcoal-700 px-1.5 py-0.5 rounded-md"><Layers size={10} /> {fileCount}</span>
                                                        {!folder.isReadOnly && <span className="hidden sm:flex items-center gap-1"><Calendar size={10} /> {new Date(folder.dateCreated).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>}
                                                    </div>
                                                </div>
                                                {!folder.isReadOnly && (
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); setDeleteConfirmation({ id: folder.id, type: 'folder', name: folder.name, validationString: (fileCount > 0 ? folder.name : undefined) }); }}
                                                        className="absolute top-2 right-2 p-1.5 text-charcoal-400 hover:text-red-500 bg-white dark:bg-charcoal-800 rounded-full shadow-sm border border-gray-100 dark:border-charcoal-600 transition-colors z-10 opacity-0 group-hover:opacity-100"
                                                    ><Trash2 size={14} /></button>
                                                )}
                                            </div>
                                            )
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {currentFiles.length > 0 && (
                            <div>
                                <h3 className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider mb-3">{currentFolder?.id.startsWith('.wa_number_') ? 'WhatsApp Groups' : 'Files'}</h3>
                                {viewMode === 'grid' ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {currentFiles.map(file => {
                                            const isIndexing = file.status === 'indexing';
                                            const progress = file.progress || 0;
                                            return (
                                                <div key={file.id} className="group relative bg-white dark:bg-charcoal-800 border border-gray-200 dark:border-charcoal-700 rounded-xl hover:shadow-lg hover:border-accent-500/50 transition-all cursor-pointer flex flex-col aspect-[4/5] overflow-hidden">
                                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                        {!isIndexing && <button onClick={(e) => { e.stopPropagation(); setFileToPreview(file); }} className="mr-auto p-1.5 bg-white dark:bg-charcoal-700 text-charcoal-500 hover:text-accent-500 rounded-full shadow-md"><Eye size={14} /></button>}
                                                        {file.type !== 'whatsapp' && <button onClick={(e) => { e.stopPropagation(); setFileToRename(file); setIsRenameFileModalOpen(true); }} className="p-1.5 bg-white dark:bg-charcoal-700 text-charcoal-500 hover:text-accent-500 rounded-full shadow-md"><Edit2 size={14} /></button>}
                                                        {file.type === 'file' && <button onClick={(e) => { e.stopPropagation(); setFileToMove(file); setIsMoveFileModalOpen(true); }} className="p-1.5 bg-white dark:bg-charcoal-700 text-charcoal-500 hover:text-accent-500 rounded-full shadow-md"><MoveHorizontal size={14} /></button>}
                                                        <button onClick={(e) => { e.stopPropagation(); setDeleteConfirmation({ id: file.id, type: 'file', name: file.name }); }} className="p-1.5 bg-white dark:bg-charcoal-700 text-charcoal-500 hover:text-red-600 rounded-full shadow-md"><Trash2 size={14} /></button>
                                                    </div>
                                                    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-charcoal-800/50 p-6 relative" onClick={() => !isIndexing && setFileToPreview(file)}>
                                                        {isIndexing ? (
                                                             <div className="flex flex-col items-center animate-pulse">
                                                                 <RefreshCw size={32} className="text-accent-500 animate-spin mb-2" />
                                                                 <span className="text-xs font-semibold text-accent-600 dark:text-accent-400">Processing...</span>
                                                             </div>
                                                        ) : (
                                                            <>
                                                                {file.type === 'file' && <FileText size={48} className="text-slate-400 drop-shadow-sm" />}
                                                                {file.type === 'link' && <LinkIcon size={48} className="text-blue-500 drop-shadow-sm" />}
                                                                {file.type === 'database' && <Database size={48} className="text-emerald-500 drop-shadow-sm" />}
                                                                {file.type === 'whatsapp' && <MessageCircle size={48} className="text-green-500 drop-shadow-sm" />}
                                                            </>
                                                        )}
                                                        {isIndexing && <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200 dark:bg-charcoal-700"><div className="h-full bg-accent-500 transition-all duration-300 ease-out" style={{ width: `${progress}%` }} /></div>}
                                                    </div>
                                                    <div className="p-3 border-t border-gray-100 dark:border-charcoal-700 bg-white dark:bg-charcoal-800">
                                                        <div className="font-medium text-sm text-slate-700 dark:text-slate-200 truncate" title={file.name}>{file.name}</div>
                                                        <div className="text-[10px] text-charcoal-400 mt-1 flex justify-between items-center"><span className="uppercase">{file.type === 'whatsapp' ? 'WA Group' : file.type}</span>{isIndexing ? <span className="text-accent-600 dark:text-accent-400 font-mono">{progress}%</span> : <span>{new Date(file.dateCreated).toLocaleDateString()}</span>}</div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-1">
                                        <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-semibold text-charcoal-500 border-b border-gray-200 dark:border-charcoal-800 mb-2"><div className="col-span-6">Name</div><div className="col-span-2">Type</div><div className="col-span-3">Date Added</div><div className="col-span-1 text-right">Action</div></div>
                                        {currentFiles.map(file => {
                                            const isIndexing = file.status === 'indexing';
                                            const progress = file.progress || 0;
                                            return (
                                                <div key={file.id} className="grid grid-cols-12 gap-4 px-4 py-3 bg-white dark:bg-charcoal-800 border border-transparent hover:border-gray-200 dark:hover:border-charcoal-700 rounded-lg items-center group hover:bg-gray-50 dark:hover:bg-charcoal-700/50 transition-colors">
                                                    <div className="col-span-6 flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => !isIndexing && setFileToPreview(file)}>
                                                        <div className="shrink-0 p-1.5 bg-gray-100 dark:bg-charcoal-700 rounded relative overflow-hidden">
                                                            {isIndexing ? <Loader2 size={16} className="text-accent-500 animate-spin" /> : 
                                                            file.type === 'file' ? <FileText size={16} className="text-slate-400" /> : 
                                                            file.type === 'link' ? <LinkIcon size={16} className="text-blue-500" /> : 
                                                            file.type === 'database' ? <Database size={16} className="text-emerald-500" /> :
                                                            file.type === 'whatsapp' ? <MessageCircle size={16} className="text-green-500" /> : 
                                                            <FileText size={16} className="text-slate-400" />}
                                                        </div>
                                                        <div className="flex flex-col min-w-0"><span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate hover:text-accent-500">{file.name}</span>{isIndexing && <div className="w-24 h-1 bg-gray-200 dark:bg-charcoal-900 rounded-full mt-1 overflow-hidden"><div className="h-full bg-accent-500" style={{ width: `${progress}%` }} /></div>}</div>
                                                    </div>
                                                    <div className="col-span-2 text-xs text-charcoal-500 uppercase">{file.type}</div>
                                                    <div className="col-span-3 text-xs text-charcoal-500">{isIndexing ? <span className="text-accent-600 dark:text-accent-400 animate-pulse">Indexing... {progress}%</span> : new Date(file.dateCreated).toLocaleDateString()}</div>
                                                    <div className="col-span-1 flex justify-end gap-1">
                                                        {!isIndexing && <button onClick={() => setFileToPreview(file)} className="p-1.5 text-charcoal-400 hover:text-accent-500 rounded opacity-0 group-hover:opacity-100 transition-opacity"><Eye size={16} /></button>}
                                                        {file.type !== 'whatsapp' && <button onClick={(e) => { e.stopPropagation(); setFileToRename(file); setIsRenameFileModalOpen(true); }} className="p-1.5 text-charcoal-400 hover:text-accent-500 rounded opacity-0 group-hover:opacity-100 transition-opacity"><Edit2 size={16} /></button>}
                                                        {file.type == 'file' && <button onClick={(e) => { e.stopPropagation(); setFileToMove(file); setIsMoveFileModalOpen(true); }} className="p-1.5 text-charcoal-400 hover:text-accent-500 rounded opacity-0 group-hover:opacity-100 transition-opacity"><MoveHorizontal size={16} /></button>}
                                                        <button onClick={(e) => { e.stopPropagation(); setDeleteConfirmation({ id: file.id, type: 'file', name: file.name }); }} className="p-1.5 text-charcoal-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                      </>
                  )}
                </>
            )}
          </div>
      </div>

      <InputModal
          isOpen={isNewFolderModalOpen}
          title="Create New Folder"
          initialValue="New Folder"
          confirmLabel="Create"
          onConfirm={handleCreateFolder}
          onCancel={() => setIsNewFolderModalOpen(false)}
          isLoading={isLoading}
      />
      <InputModal
          isOpen={isRenameFolderModalOpen}
          title="Rename Folder"
          initialValue={selectedWorkspace?.folders.find(f => f.id === currentFolderId)?.name || ''}
          confirmLabel="Rename"
          onConfirm={handleRenameFolder}
          onCancel={() => setIsRenameFolderModalOpen(false)}
          isLoading={isLoading}
      />
      <InputModal
          isOpen={isRenameFileModalOpen}
          title="Rename File"
          initialValue={fileToRename?.name || ''}
          confirmLabel="Rename"
          onConfirm={handleRenameFile}
          onCancel={() => { setIsRenameFileModalOpen(false); setFileToRename(null); }}
          isLoading={isLoading}
      />
      <MoveToFolderModal 
          isOpen={isMoveFileModalOpen}
          onClose={() => { setIsMoveFileModalOpen(false); setFileToMove(null); }}
          onConfirm={handleMoveFile}
          folders={selectedWorkspace?.folders || []}
          itemName={fileToMove?.name || ''}
          initialFolderId={fileToMove?.folderId || null}
          isLoading={isLoading}
      />
      <ConfirmationModal
         isOpen={!!deleteConfirmation}
         title={`Delete ${deleteConfirmation?.type === 'folder' ? 'Folder' : 'File'}?`}
         message={deleteConfirmation?.type === 'folder' ? (deleteConfirmation.validationString ? `This folder is not empty. To confirm deletion of "${deleteConfirmation.name}" and all its contents, please type the folder name below.` : `Are you sure you want to delete empty folder "${deleteConfirmation?.name}"?`) : `Are you sure you want to delete "${deleteConfirmation?.name}"?`}
         validationString={deleteConfirmation?.validationString}
         confirmLabel="Delete"
         isDanger={true}
         onConfirm={handleConfirmDelete}
         onCancel={() => setDeleteConfirmation(null)}
         isLoading={isLoading}
      />
      <FilePreviewModal
          file={fileToPreview}
          onClose={() => setFileToPreview(null)}
      />
    </div>
  );
};
