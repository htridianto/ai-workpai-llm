import React from 'react';
import { FileContext, Folder as FolderType } from '@/shared/types/types';
import { Eye, Edit2, MoveHorizontal, Trash2, RefreshCw, FileText, Link as LinkIcon, Database, MessageCircle, Loader2 } from 'lucide-react';

interface FileListProps {
    files: FileContext[];
    viewMode: 'grid' | 'list';
    currentFolder?: FolderType;
    onPreviewFile: (file: FileContext) => void;
    onRenameFile: (file: FileContext) => void;
    onMoveFile: (file: FileContext) => void;
    onDeleteFile: (id: string, name: string) => void;
}

export const FileList: React.FC<FileListProps> = ({
    files,
    viewMode,
    currentFolder,
    onPreviewFile,
    onRenameFile,
    onMoveFile,
    onDeleteFile
}) => {
    return (
        <div>
            <h3 className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider mb-3">{currentFolder?.id.startsWith('.wa_number_') ? 'WhatsApp Groups' : 'Files'}</h3>
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {files.map(file => {
                        const isIndexing = file.status === 'indexing';
                        const progress = file.progress || 0;
                        return (
                            <div key={file.id} className="group relative bg-white dark:bg-charcoal-800 border border-gray-200 dark:border-charcoal-700 rounded-xl hover:shadow-lg hover:border-accent-500/50 transition-all cursor-pointer flex flex-col aspect-[4/5] overflow-hidden">
                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    {!isIndexing && <button onClick={(e) => { e.stopPropagation(); onPreviewFile(file); }} className="mr-auto p-1.5 bg-white dark:bg-charcoal-700 text-charcoal-500 hover:text-accent-500 rounded-full shadow-md"><Eye size={14} /></button>}
                                    {file.type !== 'whatsapp' && <button onClick={(e) => { e.stopPropagation(); onRenameFile(file); }} className="p-1.5 bg-white dark:bg-charcoal-700 text-charcoal-500 hover:text-accent-500 rounded-full shadow-md"><Edit2 size={14} /></button>}
                                    {file.type === 'file' && <button onClick={(e) => { e.stopPropagation(); onMoveFile(file); }} className="p-1.5 bg-white dark:bg-charcoal-700 text-charcoal-500 hover:text-accent-500 rounded-full shadow-md"><MoveHorizontal size={14} /></button>}
                                    <button onClick={(e) => { e.stopPropagation(); onDeleteFile(file.id, file.name); }} className="p-1.5 bg-white dark:bg-charcoal-700 text-charcoal-500 hover:text-red-600 rounded-full shadow-md"><Trash2 size={14} /></button>
                                </div>
                                <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-charcoal-800/50 p-6 relative" onClick={() => !isIndexing && onPreviewFile(file)}>
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
                    {files.map(file => {
                        const isIndexing = file.status === 'indexing';
                        const progress = file.progress || 0;
                        return (
                            <div key={file.id} className="grid grid-cols-12 gap-4 px-4 py-3 bg-white dark:bg-charcoal-800 border border-transparent hover:border-gray-200 dark:hover:border-charcoal-700 rounded-lg items-center group hover:bg-gray-50 dark:hover:bg-charcoal-700/50 transition-colors">
                                <div className="col-span-6 flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => !isIndexing && onPreviewFile(file)}>
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
                                    {!isIndexing && <button onClick={() => onPreviewFile(file)} className="p-1.5 text-charcoal-400 hover:text-accent-500 rounded opacity-0 group-hover:opacity-100 transition-opacity"><Eye size={16} /></button>}
                                    {file.type !== 'whatsapp' && <button onClick={(e) => { e.stopPropagation(); onRenameFile(file); }} className="p-1.5 text-charcoal-400 hover:text-accent-500 rounded opacity-0 group-hover:opacity-100 transition-opacity"><Edit2 size={16} /></button>}
                                    {file.type == 'file' && <button onClick={(e) => { e.stopPropagation(); onMoveFile(file); }} className="p-1.5 text-charcoal-400 hover:text-accent-500 rounded opacity-0 group-hover:opacity-100 transition-opacity"><MoveHorizontal size={16} /></button>}
                                    <button onClick={(e) => { e.stopPropagation(); onDeleteFile(file.id, file.name); }} className="p-1.5 text-charcoal-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
