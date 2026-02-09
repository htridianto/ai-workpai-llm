
import React from 'react';
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
  RefreshCw
} from 'lucide-react';
import { Folder as FolderType, ContextItem } from '../../../../types';

interface FileManagerProps {
  currentFolders: FolderType[];
  currentFiles: ContextItem[];
  allWorkspaceFiles: ContextItem[]; // Needed to count files inside folders
  viewMode: 'grid' | 'list';
  onFolderClick: (id: string) => void;
  onDeleteFolder: (folder: FolderType, e: React.MouseEvent) => void;
  onPreviewFile: (file: ContextItem) => void;
  onDeleteFile: (file: ContextItem, e: React.MouseEvent) => void;
}

export const FileManager: React.FC<FileManagerProps> = ({
  currentFolders,
  currentFiles,
  allWorkspaceFiles,
  viewMode,
  onFolderClick,
  onDeleteFolder,
  onPreviewFile,
  onDeleteFile
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4">
        {currentFolders.length === 0 && currentFiles.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-charcoal-400 border-2 border-dashed border-gray-300 dark:border-charcoal-700 rounded-2xl bg-white/50 dark:bg-charcoal-900/50">
                <div className="w-16 h-16 bg-gray-100 dark:bg-charcoal-800 rounded-full flex items-center justify-center mb-4">
                    <UploadCloud size={32} className="opacity-50" />
                </div>
                <p className="font-medium text-slate-600 dark:text-slate-300">This folder is empty</p>
                <p className="text-sm">Add files, database connections, or links to get started.</p>
            </div>
        ) : (
            <>
                {/* Folders Section */}
                {currentFolders.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider mb-3">Folders</h3>
                        <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-1'}`}>
                            {currentFolders.map(folder => {
                                const isPrivate = folder.isReadOnly;
                                // Calculate file count for this folder from the global workspace file list
                                const fileCount = allWorkspaceFiles.filter(f => f.folderId === folder.id).length;
                                
                                return (
                                    <div 
                                        key={folder.id}
                                        onClick={() => onFolderClick(folder.id)}
                                        className={`group relative flex items-center gap-3 p-4 bg-white dark:bg-charcoal-800 border border-gray-200 dark:border-charcoal-700 rounded-xl hover:border-accent-500/50 hover:shadow-md cursor-pointer transition-all ${viewMode === 'list' ? 'flex-row' : 'flex-col justify-between text-center aspect-[4/3]'}`}
                                    >
                                        <div className={`p-3 rounded-lg ${
                                            isPrivate 
                                            ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-500' 
                                            : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-500'
                                        } ${viewMode === 'list' ? '' : 'mb-2 mx-auto'}`}>
                                            {isPrivate ? (
                                                <Lock size={viewMode === 'grid' ? 32 : 24} className="opacity-80" />
                                            ) : (
                                                <Folder size={viewMode === 'grid' ? 32 : 24} fill="currentColor" className="opacity-80" />
                                            )}
                                        </div>
                                        
                                        <div className="min-w-0 flex-1 w-full">
                                            <span className={`font-medium text-sm truncate w-full block ${isPrivate ? 'text-orange-600 dark:text-orange-400 font-mono tracking-tight' : 'text-slate-700 dark:text-slate-200'}`}>
                                                {folder.name}
                                            </span>
                                            
                                            {/* Folder Metadata */}
                                            <div className={`flex items-center gap-2 mt-1.5 text-[10px] text-charcoal-400 ${viewMode === 'grid' ? 'justify-center' : ''}`}>
                                                <span className="flex items-center gap-1 bg-gray-100 dark:bg-charcoal-700 px-1.5 py-0.5 rounded-md">
                                                    <Layers size={10} /> {fileCount}
                                                </span>
                                                {!folder.isReadOnly && (
                                                    <span className="hidden sm:flex items-center gap-1">
                                                        <Calendar size={10} /> {new Date(folder.dateCreated).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {!folder.isReadOnly && (
                                            <button 
                                                onClick={(e) => onDeleteFolder(folder, e)}
                                                className="absolute top-2 right-2 p-1.5 text-charcoal-400 hover:text-red-500 bg-white dark:bg-charcoal-800 rounded-full shadow-sm border border-gray-100 dark:border-charcoal-600 transition-colors z-10 opacity-0 group-hover:opacity-100"
                                                title="Delete Folder"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Files Section */}
                {currentFiles.length > 0 && (
                    <div>
                        <h3 className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider mb-3">Files</h3>
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {currentFiles.map(file => {
                                    const isIndexing = file.status === 'indexing';
                                    const progress = file.progress || 0;
                                    
                                    return (
                                        <div key={file.id} className="group relative bg-white dark:bg-charcoal-800 border border-gray-200 dark:border-charcoal-700 rounded-xl hover:shadow-lg hover:border-accent-500/50 transition-all cursor-pointer flex flex-col aspect-[4/5] overflow-hidden">
                                            
                                            {/* Top Actions */}
                                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                {!isIndexing && (
                                                  <button 
                                                      onClick={(e) => { e.stopPropagation(); onPreviewFile(file); }}
                                                      className="p-1.5 bg-white dark:bg-charcoal-700 text-charcoal-500 hover:text-accent-500 rounded-full shadow-md"
                                                      title="Preview"
                                                  >
                                                      <Eye size={14} />
                                                  </button>
                                                )}
                                                <button 
                                                    onClick={(e) => onDeleteFile(file, e)}
                                                    className="p-1.5 bg-white dark:bg-charcoal-700 text-charcoal-500 hover:text-red-600 rounded-full shadow-md"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>

                                            {/* Preview/Icon Area */}
                                            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-charcoal-800/50 p-6 relative" onClick={() => !isIndexing && onPreviewFile(file)}>
                                                {isIndexing ? (
                                                     <div className="flex flex-col items-center animate-pulse">
                                                         <RefreshCw size={32} className="text-accent-500 animate-spin mb-2" />
                                                         <span className="text-xs font-semibold text-accent-600 dark:text-accent-400">Processing...</span>
                                                     </div>
                                                ) : (
                                                    <>
                                                        {file.type === 'pdf' && <FileText size={48} className="text-red-500 drop-shadow-sm" />}
                                                        {file.type === 'txt' && <FileText size={48} className="text-slate-400 drop-shadow-sm" />}
                                                        {file.type === 'link' && <LinkIcon size={48} className="text-blue-500 drop-shadow-sm" />}
                                                        {file.type === 'database' && <Database size={48} className="text-emerald-500 drop-shadow-sm" />}
                                                        {file.type === 'whatsapp' && <MessageCircle size={48} className="text-green-500 drop-shadow-sm" />}
                                                    </>
                                                )}
                                                
                                                {/* Progress Bar Overlay for Grid */}
                                                {isIndexing && (
                                                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200 dark:bg-charcoal-700">
                                                        <div 
                                                            className="h-full bg-accent-500 transition-all duration-300 ease-out" 
                                                            style={{ width: `${progress}%` }} 
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Info Area */}
                                            <div className="p-3 border-t border-gray-100 dark:border-charcoal-700 bg-white dark:bg-charcoal-800">
                                                <div className="font-medium text-sm text-slate-700 dark:text-slate-200 truncate" title={file.name}>{file.name}</div>
                                                <div className="text-[10px] text-charcoal-400 mt-1 flex justify-between items-center">
                                                    <span className="uppercase">{file.type === 'whatsapp' ? 'WA Group' : file.type}</span>
                                                    {isIndexing ? (
                                                        <span className="text-accent-600 dark:text-accent-400 font-mono">{progress}%</span>
                                                    ) : (
                                                        <span>{new Date(file.dateAdded).toLocaleDateString()}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-1">
                                <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-semibold text-charcoal-500 border-b border-gray-200 dark:border-charcoal-800 mb-2">
                                    <div className="col-span-6">Name</div>
                                    <div className="col-span-2">Type</div>
                                    <div className="col-span-3">Date Added</div>
                                    <div className="col-span-1 text-right">Action</div>
                                </div>
                                {currentFiles.map(file => {
                                    const isIndexing = file.status === 'indexing';
                                    const progress = file.progress || 0;

                                    return (
                                        <div key={file.id} className="grid grid-cols-12 gap-4 px-4 py-3 bg-white dark:bg-charcoal-800 border border-transparent hover:border-gray-200 dark:hover:border-charcoal-700 rounded-lg items-center group hover:bg-gray-50 dark:hover:bg-charcoal-700/50 transition-colors">
                                            <div className="col-span-6 flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => !isIndexing && onPreviewFile(file)}>
                                                <div className="shrink-0 p-1.5 bg-gray-100 dark:bg-charcoal-700 rounded relative overflow-hidden">
                                                    {isIndexing ? (
                                                        <Loader2 size={16} className="text-accent-500 animate-spin" />
                                                    ) : (
                                                        <>
                                                            {file.type === 'pdf' ? <FileText size={16} className="text-red-500" /> : 
                                                            file.type === 'link' ? <LinkIcon size={16} className="text-blue-500" /> : 
                                                            file.type === 'database' ? <Database size={16} className="text-emerald-500" /> :
                                                            file.type === 'whatsapp' ? <MessageCircle size={16} className="text-green-500" /> :
                                                            <FileText size={16} className="text-slate-400" />}
                                                        </>
                                                    )}
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate hover:text-accent-500">{file.name}</span>
                                                    {isIndexing && (
                                                        <div className="w-24 h-1 bg-gray-200 dark:bg-charcoal-900 rounded-full mt-1 overflow-hidden">
                                                            <div className="h-full bg-accent-500" style={{ width: `${progress}%` }} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-span-2 text-xs text-charcoal-500 uppercase">{file.type}</div>
                                            <div className="col-span-3 text-xs text-charcoal-500">
                                                {isIndexing ? (
                                                    <span className="text-accent-600 dark:text-accent-400 animate-pulse">Indexing... {progress}%</span>
                                                ) : (
                                                    new Date(file.dateAdded).toLocaleDateString()
                                                )}
                                            </div>
                                            <div className="col-span-1 flex justify-end gap-2">
                                                {!isIndexing && (
                                                    <button 
                                                        onClick={() => onPreviewFile(file)}
                                                        className="p-1.5 text-charcoal-400 hover:text-accent-500 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={(e) => onDeleteFile(file, e)}
                                                    className="p-1.5 text-charcoal-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
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
    </div>
  );
};
