import React, { useState } from 'react';
import { FileContext, Folder as FolderType, Workspace } from '@/shared/types/types';
import { Eye, Edit2, MoveHorizontal, Trash2, RefreshCw, FileText, Link as LinkIcon, Database, MessageCircle, Loader2, Phone, Settings, Info, Plus, X, UploadCloud } from 'lucide-react';
import { useDashboard } from '@/app/(protected)/dashboard/DashboardContext';
import { WorkspaceService } from '@/client/services/workspaceService';

const DUMMY_GROUPS = [
    { id: 'wa-1', name: 'Product Launch 🚀', count: 12 },
    { id: 'wa-2', name: 'Dev Team Updates', count: 5 },
    { id: 'wa-3', name: 'Marketing Alerts', count: 8 },
    { id: 'wa-4', name: 'Family Group', count: 4 },
    { id: 'wa-5', name: 'Client: Acme Corp', count: 3 },
];

interface TroopListProps {
    files: FileContext[];
    viewMode: 'grid' | 'list';
    currentFolder?: FolderType;
    workspace?: Workspace;
    onPreviewFile: (file: FileContext) => void;
    onRenameFile: (file: FileContext) => void;
    onMoveFile: (file: FileContext) => void;
    onDeleteFile: (id: string, name: string) => void;
}

export const TroopList: React.FC<TroopListProps> = ({
    files,
    viewMode,
    currentFolder,
    workspace,
    onPreviewFile,
    onRenameFile,
    onMoveFile,
    onDeleteFile
}) => {
    const { refreshWorkspaces, setToast } = useDashboard();
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    let meta: any = {};
    if (currentFolder?.meta) {
        try {
            meta = typeof currentFolder.meta === 'string' ? JSON.parse(currentFolder.meta) : currentFolder.meta;
        } catch (e) {
            console.error('Failed to parse meta', e);
        }
    }

    const handleSaveGroups = async () => {
        if (!workspace || !currentFolder) {
            setToast({ message: "Workspace or Folder context missing.", type: "error" });
            return;
        }

        setIsSaving(true);
        try {
            const groupsToSave = DUMMY_GROUPS.filter(g => selectedGroups.includes(g.id));
            
            await Promise.all(groupsToSave.map(async (group) => {
                const existing = files.find(f => {
                    let fMeta = f.meta;
                    if (typeof fMeta === 'string') {
                        try { fMeta = JSON.parse(fMeta); } catch { fMeta = {}; }
                    }
                    return fMeta?.waGroupId === group.id;
                });
                
                if (existing) return; // Prevent duplicate adds

                return WorkspaceService.createFileContext({
                    workspaceId: workspace.slug,
                    folderId: currentFolder.id,
                    name: group.name,
                    type: 'whatsapp',
                    status: 'indexed',
                    size: 0,
                    meta: { waGroupId: group.id, count: group.count }
                });
            }));

            await refreshWorkspaces();
            setToast({ message: `Successfully synced groups.`, type: "success" });
            setIsManageModalOpen(false);
            setSelectedGroups([]);
        } catch (error: any) {
            setToast({ message: "Failed to sync groups", type: "error", subMessage: error.message });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {currentFolder && (
                <div className="lg:w-1/3 shrink-0">
                    {/* <h3 className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider mb-3">Troop Information</h3> */}
                    <div className="bg-white dark:bg-charcoal-800 border border-green-500/50 rounded-xl p-5 shadow-sm">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-charcoal-700">
                            <div className="w-12 h-12 bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-500 rounded-full flex items-center justify-center shrink-0">
                                <MessageCircle size={24} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800 dark:text-slate-200">{currentFolder.name}</h4>
                                <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${meta.session?.status === 'WORKING' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
                                    {meta.session?.status || 'Status Unknown'}
                                </span>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-charcoal-500 flex items-center gap-1"><Phone size={12} /> WA Number</span>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{meta.waNumber || 'N/A'}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-charcoal-500 flex items-center gap-1"><Settings size={12} /> WA Session</span>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{meta.session?.name || 'N/A'}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-charcoal-500 flex items-center gap-1"><Info size={12} /> WA ID</span>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate" title={meta.session?.me?.id}>{meta.session?.me?.id || 'N/A'}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-charcoal-500 flex items-center gap-1"><Info size={12} /> Registered</span>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{currentFolder?.dateCreated ? new Date(currentFolder.dateCreated).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) : 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                    {/* <h3 className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider mb-0 flex-shrink-0">Channels</h3> */}
                    <span></span>
                    <button 
                        onClick={() => setIsManageModalOpen(true)}
                        className="flex items-center gap-1.5 text-xs font-semibold bg-accent-50 text-accent-600 hover:bg-accent-100 dark:bg-accent-900/20 dark:text-accent-500 dark:hover:bg-accent-900/40 px-3 py-1.5 rounded-lg transition-colors border border-accent-100 dark:border-accent-800"
                    >
                        <Plus size={14} /> Manage Groups
                    </button>
                </div>
                {files.length === 0 && (
                    <div className="h-40 flex flex-col items-center justify-center text-charcoal-400 border-2 border-dashed border-gray-300 dark:border-charcoal-700 rounded-2xl bg-white/50 dark:bg-charcoal-900/50">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-charcoal-800 rounded-full flex items-center justify-center mb-4">
                            <UploadCloud size={32} className="opacity-50" />
                        </div>
                        <p className="font-medium text-slate-600 dark:text-slate-300">This WhatsApp Group is empty</p>
                        <p className="text-sm">Add WhatsApp Groups to get started.</p>
                    </div>
                )}

                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {files.map(file => {
                            const isIndexing = file.status === 'indexing';
                            const progress = file.progress || 0;
                            return (
                                <div key={file.id} className="group relative bg-white dark:bg-charcoal-800 border border-gray-200 dark:border-charcoal-700 rounded-xl hover:shadow-lg hover:border-accent-500/50 transition-all cursor-pointer flex flex-col aspect-[1/1] overflow-hidden">
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
                                            <MessageCircle size={32} className="text-green-500 drop-shadow-sm" />
                                        )}
                                        {isIndexing && <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200 dark:bg-charcoal-700"><div className="h-full bg-accent-500 transition-all duration-300 ease-out" style={{ width: `${progress}%` }} /></div>}
                                    </div>
                                    <div className="p-3 border-t border-gray-100 dark:border-charcoal-700 bg-white dark:bg-charcoal-800">
                                        <div className="font-medium text-sm text-slate-700 dark:text-slate-200 line-clamp-2 truncate" title={file.name}>{file.name}</div>
                                        <div className="text-[10px] text-charcoal-400 mt-1 flex justify-between items-center"><span className="uppercase">{file.type === 'whatsapp' ? 'WA Group' : file.type}</span>{isIndexing ? <span className="text-accent-600 dark:text-accent-400 font-mono">{progress}%</span> : <span>{new Date(file.dateCreated).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })}</span>}</div>
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
                                            <MessageCircle size={16} className="text-green-500" />}
                                        </div>
                                        <div className="flex flex-col min-w-0"><span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate hover:text-accent-500">{file.name}</span>{isIndexing && <div className="w-24 h-1 bg-gray-200 dark:bg-charcoal-900 rounded-full mt-1 overflow-hidden"><div className="h-full bg-accent-500" style={{ width: `${progress}%` }} /></div>}</div>
                                    </div>
                                    <div className="col-span-2 text-xs text-charcoal-500 uppercase">{file.type === 'whatsapp' ? 'WA Group' : file.type}</div>
                                    <div className="col-span-3 text-xs text-charcoal-500">{isIndexing ? <span className="text-accent-600 dark:text-accent-400 animate-pulse">Indexing... {progress}%</span> : new Date(file.dateCreated).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })}</div>
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

            {/* Manage Groups Modal */}
            {isManageModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm" onClick={() => setIsManageModalOpen(false)} />
                    <div className="relative w-full max-w-md bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 rounded-2xl shadow-xl flex flex-col max-h-[85vh]">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-charcoal-800">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Manage WhatsApp Groups</h3>
                                <p className="text-sm text-charcoal-500 mt-1">Select groups to sync with this troop.</p>
                            </div>
                            <button onClick={() => setIsManageModalOpen(false)} className="p-1 text-charcoal-400 hover:text-red-500 rounded-lg transition-colors"><X size={20}/></button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-2">
                            {DUMMY_GROUPS.map(group => {
                                const isAlreadyAdded = files.some(f => {
                                    let fMeta = f.meta;
                                    if (typeof fMeta === 'string') {
                                        try { fMeta = JSON.parse(fMeta); } catch { fMeta = {}; }
                                    }
                                    return fMeta?.waGroupId === group.id;
                                });
                                const isSelected = selectedGroups.includes(group.id) || isAlreadyAdded;

                                return (
                                    <div 
                                        key={group.id}
                                        onClick={() => {
                                            if (isAlreadyAdded) return;
                                            if (isSelected) {
                                                setSelectedGroups(prev => prev.filter(id => id !== group.id));
                                            } else {
                                                setSelectedGroups(prev => [...prev, group.id]);
                                            }
                                        }}
                                        className={`flex items-center gap-3 p-3 mx-3 my-1 rounded-xl transition-colors border ${isAlreadyAdded ? 'opacity-50 cursor-not-allowed bg-gray-50 border-gray-200 dark:bg-charcoal-800 dark:border-charcoal-700' : 'cursor-pointer'} ${(!isAlreadyAdded && isSelected) ? 'bg-accent-50 border-accent-200 dark:bg-accent-900/20 dark:border-accent-800' : (!isAlreadyAdded ? 'border-transparent hover:bg-gray-50 dark:hover:bg-charcoal-800' : '')}`}
                                    >
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${isSelected ? 'bg-accent-500 border-accent-500 text-white' : 'bg-white border-gray-300 dark:bg-charcoal-800 dark:border-charcoal-600'}`}>
                                            {isSelected && <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3"><path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                        </div>
                                        <div className="w-10 h-10 bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-500 rounded-full flex items-center justify-center shrink-0">
                                            <MessageCircle size={20} />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm text-slate-800 dark:text-slate-200">{group.name}</div>
                                            <div className="text-xs text-charcoal-500">{group.count} members</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        <div className="p-4 border-t border-gray-100 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-800/50 rounded-b-2xl flex justify-end gap-3">
                            <button 
                                onClick={() => setIsManageModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-charcoal-600 dark:text-slate-300 hover:bg-white dark:hover:bg-charcoal-700 bg-transparent rounded-lg transition-colors border border-transparent shadow-[0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSaveGroups}
                                disabled={isSaving || selectedGroups.length === 0}
                                className="flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium text-white bg-accent-600 hover:bg-accent-500 active:bg-accent-700 rounded-lg transition-colors disabled:opacity-50 shadow-md shadow-accent-900/20"
                            >
                                {isSaving && <Loader2 size={16} className="animate-spin" />}
                                Sync Selected
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
