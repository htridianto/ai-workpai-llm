
import React from 'react';
import { 
  ArrowLeft, 
  ChevronsLeft, 
  Plus, 
  Box, 
  Edit2, 
  Trash2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Workspace } from '../../../../types';

interface WorkspaceListProps {
  isOpen: boolean;
  workspaces: Workspace[];
  selectedWorkspaceId: string | null;
  isLoading: boolean;
  onSelectWorkspace: (id: string) => void;
  onCreateWorkspace: () => void;
  onCreateDemoWorkspace: () => void;
  onEditWorkspace: (id: string) => void;
  onDeleteWorkspace: (id: string) => void;
  onCollapse: () => void;
  onNavigateHome: () => void;
  onEnterChat: (workspaceId: string) => void;
}

export const WorkspaceList: React.FC<WorkspaceListProps> = ({
  isOpen,
  workspaces,
  selectedWorkspaceId,
  isLoading,
  onSelectWorkspace,
  onCreateWorkspace,
  onCreateDemoWorkspace,
  onEditWorkspace,
  onDeleteWorkspace,
  onCollapse,
  onNavigateHome,
  onEnterChat
}) => {
  return (
    <div className={`
          border-r border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 flex flex-col shrink-0 transition-all duration-300 ease-in-out
          ${isOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full border-r-0 overflow-hidden'}
      `}>
         <div className="p-4 border-b border-gray-200 dark:border-charcoal-800 flex items-center justify-between">
             <div className="flex items-center gap-3">
                 <button onClick={onNavigateHome} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-charcoal-800 text-charcoal-500 transition-colors">
                     <ArrowLeft size={18} />
                 </button>
                 <h2 className="font-bold text-lg truncate">Workspaces</h2>
             </div>
             {/* Collapse Button */}
             <button 
                onClick={onCollapse}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-charcoal-800 text-charcoal-400 hover:text-slate-900 dark:hover:text-slate-200"
                title="Collapse Sidebar"
             >
                 <ChevronsLeft size={18} />
             </button>
         </div>
         
         <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-charcoal-300 dark:scrollbar-thumb-charcoal-700">

             {isLoading ? (
                 <div className="flex justify-center p-4">
                     <div className="w-6 h-6 border-2 border-charcoal-200 border-t-accent-500 rounded-full animate-spin"></div>
                 </div>
             ) : (
                 <>
                    {workspaces.map(ws => {
                        const isSelected = selectedWorkspaceId === ws.id;
                        return (
                            <div 
                                key={ws.id}
                                onClick={() => onSelectWorkspace(ws.id)}
                                className={`w-full group relative p-3 rounded-xl cursor-pointer border transition-all ${
                                    isSelected
                                    ? 'bg-accent-50 dark:bg-accent-900/10 border-accent-500/50 shadow-sm' 
                                    : 'bg-transparent border-transparent hover:bg-gray-100 dark:hover:bg-charcoal-800'
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-1">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-${ws.color ? ws.color : 'gray-200'} text-white`}>
                                        {ws.symbol || <Box size={16} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`text-sm font-semibold truncate ${isSelected ? 'text-accent-700 dark:text-accent-400' : 'text-slate-700 dark:text-slate-200'}`}>{ws.title}</h3>
                                    </div>
                                </div>
                                {ws.description && (
                                    <p className="text-xs text-charcoal-500 dark:text-charcoal-400 line-clamp-2 pl-11 mb-2">
                                        {ws.description}
                                    </p>
                                )}
                                <div className="flex items-center justify-between text-xs text-charcoal-500 pl-11">
                                    <span className="font-mono text-[10px]">{ws.slug}</span>
                                    {/* <span className="font-mono text-[10px] uppercase">{(ws.contextItems || []).length} items</span> */}
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={(e) => { e.stopPropagation(); onEditWorkspace(ws.id); }} className="p-1 hover:text-slate-900 dark:hover:text-white"><Edit2 size={12} /></button>
                                        <button onClick={(e) => { e.stopPropagation(); onDeleteWorkspace(ws.id); }} className="p-1 hover:text-red-500"><Trash2 size={12} /></button>
                                    </div>
                                </div>
                                
                                {/* Enter Chat Button moved here */}
                                {isSelected && (
                                    <div className="mt-3 pl-1">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onEnterChat(ws.slug); }}
                                            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 dark:bg-white/80 text-white dark:text-charcoal-900 rounded-lg hover:opacity-90 transition-all text-xs font-bold shadow-md"
                                        >
                                            <span>Enter Chat Assistant</span>
                                            <ArrowRight size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}

             <button 
                onClick={onCreateWorkspace}
                className="w-full flex items-center gap-3 px-3 py-3 mb-2 rounded-xl border border-dashed border-gray-300 dark:border-charcoal-700 hover:border-accent-500 text-charcoal-500 dark:text-charcoal-400 hover:text-accent-600 dark:hover:text-accent-500 hover:bg-gray-50 dark:hover:bg-charcoal-800/50 transition-all text-sm font-medium"
             >
                <Plus size={18} />
                <span>Create New Workspace</span>
             </button>
             
                    {/* Demo Workspace Button */}
                    {workspaces.length === 0 && (
                         <div className="px-1 mt-4 w-full">
                             <button 
                                onClick={onCreateDemoWorkspace}
                                className="w-full flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-dashed border-charcoal-200 dark:border-charcoal-700 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 group transition-all"
                             >
                                 <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                     <Sparkles size={24} />
                                 </div>
                                 <div className="text-center">
                                     <p className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Start with a Demo</p>
                                     <p className="text-xs text-charcoal-400 mt-1">Populate a sample workspace to explore features.</p>
                                 </div>
                             </button>
                         </div>
                    )}
                 </>
             )}
         </div>
      </div>
  );
};
