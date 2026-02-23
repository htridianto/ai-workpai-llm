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
  ChevronLeft,
  UserCheck
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
import { FolderList } from './FolderList';
import { FileList } from './FileList';
import { TroopList } from './TroopList';

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
      type: 'file' | 'folder' | 'Troop'; 
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
                          {isAddContextOpen ? `Add ${currentFolder?.isStarred ? 'Troop' : 'Data Source'}` : (currentFolderId ? breadcrumbs[breadcrumbs.length - 1]?.name : selectedWorkspace.title)}
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
                                setDeleteConfirmation({ id: currentFolderId, type: `${currentFolder?.isStarred ? 'Troop' : 'folder'}`, name: breadcrumbs[breadcrumbs.length - 1]?.name, validationString: (currentFiles.length > 0 ? currentFolder?.name : undefined) });
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
                    {isAddContextOpen ? `Select and import ${currentFolder?.isStarred ? 'Troop' : 'Data'} to your campaign` : (currentFolder ? `Manage ${currentFolder.name} Contents` : (selectedWorkspace.description || 'Manage your documents'))}
                  </p>
              </div>
              <div className="flex gap-3">
                  {(!isAddContextOpen && currentFolder && currentFolder.isShared && !currentFolder.isStarred) && (
                      <button 
                          onClick={() => setIsNewFolderModalOpen(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-charcoal-800 border border-gray-300 dark:border-charcoal-600 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-gray-50 dark:hover:bg-charcoal-700 transition-colors text-sm font-medium"
                      >
                          <FolderPlus size={18} />
                          <span>New Folder</span>
                      </button>
                  )}
                  {(currentFolder && !currentFolder.isStarred) && (
                      <button 
                          onClick={() => {setIsAddContextOpen(!isAddContextOpen);}}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all text-sm font-medium ${isAddContextOpen ? 'bg-charcoal-200 dark:bg-charcoal-700 text-slate-800 dark:text-slate-100' : 'bg-accent-600 hover:bg-accent-500 text-white shadow-accent-900/20'}`}
                      >
                          {isAddContextOpen ? <X size={18} /> : <UploadCloud size={18} />}
                          <span>{isAddContextOpen ? 'Cancel' : 'Add Context'}</span>
                      </button>
                  )}

                  {(!isAddContextOpen && currentFolder && currentFolder.isShared && currentFolder.isStarred) && (
                      <button 
                          onClick={() => {setIsAddContextOpen(!isAddContextOpen);}}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all text-sm font-medium ${isAddContextOpen ? 'bg-charcoal-200 dark:bg-charcoal-700 text-slate-800 dark:text-slate-100' : 'bg-accent-600 hover:bg-accent-500 text-white shadow-accent-900/20'}`}
                      >
                          <UserCheck size={18} />
                          <span>Register New Troop</span>
                      </button>
                  )}
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
                    <>
                        {currentFolder?.isStarred && (
                            !currentFolder?.parentId ? (
                                <div className="h-64 flex flex-col items-center justify-center text-charcoal-400 border-2 border-dashed border-gray-300 dark:border-charcoal-700 rounded-2xl bg-white/50 dark:bg-charcoal-900/50">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-charcoal-800 rounded-full flex items-center justify-center mb-4">
                                    <UploadCloud size={32} className="opacity-50" />
                                </div>
                                <p className="font-medium text-slate-600 dark:text-slate-300">This <i>Troops</i> is empty</p>
                                <p className="text-sm">Register new troop to get started.</p>
                                </div>
                            )  : (                          
                            <TroopList 
                                workspace={selectedWorkspace}
                                files={currentFiles}
                                viewMode={viewMode}
                                currentFolder={currentFolder}
                                onPreviewFile={setFileToPreview}
                                onRenameFile={(file) => { setFileToRename(file); setIsRenameFileModalOpen(true); }}
                                onMoveFile={(file) => { setFileToMove(file); setIsMoveFileModalOpen(true); }}
                                onDeleteFile={(id, name) => setDeleteConfirmation({ id, type: 'file', name })}
                            />
                            )
                        )}
                        {!currentFolder?.isStarred && (
                            <div className="h-64 flex flex-col items-center justify-center text-charcoal-400 border-2 border-dashed border-gray-300 dark:border-charcoal-700 rounded-2xl bg-white/50 dark:bg-charcoal-900/50">
                              <div className="w-16 h-16 bg-gray-100 dark:bg-charcoal-800 rounded-full flex items-center justify-center mb-4">
                                  <UploadCloud size={32} className="opacity-50" />
                              </div>
                              <p className="font-medium text-slate-600 dark:text-slate-300">This folder <i>{(currentFolderId ? breadcrumbs[breadcrumbs.length - 1]?.name : selectedWorkspace.title)}</i> is empty</p>
                              <p className="text-sm">Add files, database connections, or links to get started.</p>
                            </div>
                        )}
                    </>
                    ) : (
                      <>
                        {currentFolders.length > 0 && (
                            <FolderList 
                                folders={currentFolders}
                                viewMode={viewMode}
                                selectedWorkspace={selectedWorkspace}
                                currentFolder={currentFolder}
                                onSelectFolder={setCurrentFolderId}
                                onDeleteFolder={(id, name, validationString) => setDeleteConfirmation({ id, type: `${currentFolder?.isStarred ? 'Troop' : 'folder'}`, name, validationString })}
                            />
                        )}

                        {!currentFolder?.isStarred && currentFiles.length > 0 && (
                            <FileList 
                                files={currentFiles}
                                viewMode={viewMode}
                                currentFolder={currentFolder}
                                onPreviewFile={setFileToPreview}
                                onRenameFile={(file) => { setFileToRename(file); setIsRenameFileModalOpen(true); }}
                                onMoveFile={(file) => { setFileToMove(file); setIsMoveFileModalOpen(true); }}
                                onDeleteFile={(id, name) => setDeleteConfirmation({ id, type: 'file', name })}
                            />
                        )}

                        {currentFolder?.isStarred && currentFiles.length > 0  && (
                            <TroopList 
                                workspace={selectedWorkspace}
                                files={currentFiles}
                                viewMode={viewMode}
                                currentFolder={currentFolder}
                                onPreviewFile={setFileToPreview}
                                onRenameFile={(file) => { setFileToRename(file); setIsRenameFileModalOpen(true); }}
                                onMoveFile={(file) => { setFileToMove(file); setIsMoveFileModalOpen(true); }}
                                onDeleteFile={(id, name) => setDeleteConfirmation({ id, type: 'file', name })}
                            />
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
          title={`Rename ${currentFolder?.isStarred ? 'Troop' : 'Folder'}`}
          initialValue={currentFolder?.name || ''}
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
         title={`Delete ${deleteConfirmation?.type !== 'file' ? deleteConfirmation?.type : 'Context'}?`}
         message={deleteConfirmation?.type !== 'file' ? (deleteConfirmation?.validationString ? `This ${deleteConfirmation?.type} is not empty. To confirm deletion of "${deleteConfirmation.name}" and all its contents, please type the folder name below.` : `Are you sure you want to delete empty ${deleteConfirmation?.type} "${deleteConfirmation?.name}"?`) : `Are you sure you want to delete "${deleteConfirmation?.name}"?`}
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
