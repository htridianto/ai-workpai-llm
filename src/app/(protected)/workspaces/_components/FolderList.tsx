import React from 'react';
import { Folder as FolderType, Workspace } from '@/shared/types/types';
import { Lock, Folder, Layers, Calendar, Trash2, MessageCircle } from 'lucide-react';

interface FolderListProps {
    folders: FolderType[];
    viewMode: 'grid' | 'list';
    selectedWorkspace: Workspace;
    currentFolder?: FolderType;
    onSelectFolder: (id: string | null) => void;
    onDeleteFolder: (id: string, name: string, validationString?: string) => void;
}

export const FolderList: React.FC<FolderListProps> = ({
    folders,
    viewMode,
    selectedWorkspace,
    currentFolder,
    onSelectFolder,
    onDeleteFolder
}) => {
    return (
        <div className="mb-6">
            {currentFolder && <h3 className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider mb-3">{currentFolder.isStarred ? 'Registered Troops' : 'Folders'}</h3>}
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-1'}`}>
                {folders.map(folder => {
                    const isPrivate = folder.isReadOnly;
                    const childrenCount = (selectedWorkspace?.folders || []).filter(f => f.parentId === folder.id).length;
                    const fileCount = (selectedWorkspace.fileContexts || []).filter(f => f.folderId === folder.id).length;
                    return (
                        (folder.isShared || (!folder.isShared && (fileCount > 0 || childrenCount > 0))) && (
                        <div 
                            key={folder.id}
                            onClick={() => onSelectFolder(folder.id)}
                            className={`group relative flex items-center gap-3 p-4 bg-white dark:bg-charcoal-800 border border-gray-200 dark:border-charcoal-700 rounded-xl hover:border-accent-500/50 hover:shadow-md cursor-pointer transition-all ${viewMode === 'list' ? 'flex-row' : 'flex-col justify-between text-center aspect-[4/3]'}`}
                        >
                            <div className={`p-3 rounded-lg ${isPrivate ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-500' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-500'} ${viewMode === 'list' ? '' : 'mb-2 mx-auto'}`}>
                               {folder.isStarred && <MessageCircle size={viewMode === 'grid' ? 32 : 24} className="opacity-80" />}
                               {!folder.isStarred && (isPrivate ? <Lock size={viewMode === 'grid' ? 32 : 24} className="opacity-80" /> : <Folder size={viewMode === 'grid' ? 32 : 24} fill="currentColor" className="opacity-80" />)}
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
                                    onClick={(e) => { e.stopPropagation(); onDeleteFolder(folder.id, folder.name, fileCount > 0 ? folder.name : undefined); }}
                                    className="absolute top-2 right-2 p-1.5 text-charcoal-400 hover:text-red-500 bg-white dark:bg-charcoal-800 rounded-full shadow-sm border border-gray-100 dark:border-charcoal-600 transition-colors z-10 opacity-0 group-hover:opacity-100"
                                ><Trash2 size={14} /></button>
                            )}
                        </div>
                        )
                    );
                })}
            </div>
        </div>
    );
};
