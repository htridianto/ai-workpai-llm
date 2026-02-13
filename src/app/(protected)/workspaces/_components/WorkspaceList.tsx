import React, { useState } from 'react';
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
import { Workspace } from '@/shared/types/types';
import { WorkspaceService } from '@/client/services/workspaceService';
import { useDashboard } from '@/app/(protected)/dashboard/DashboardContext';
import { WorkspaceModal } from '@/client/components/Shared/WorkspaceModal';
import { ConfirmationModal } from '@/client/components/Shared/ConfirmationModal';

interface WorkspaceListProps {
  isOpen: boolean;
  selectedWorkspaceId: string | null;
  onSelectWorkspace: (id: string) => void;
  onCollapse: () => void;
  onNavigateHome: () => void;
  onEnterChat: (workspaceId: string) => void;
}

export const WorkspaceList: React.FC<WorkspaceListProps> = ({
  isOpen,
  selectedWorkspaceId,
  onSelectWorkspace,
  onCollapse,
  onNavigateHome,
  onEnterChat
}) => {
  const { workspaces, refreshWorkspaces, setToast, isLoadingData: isLoading } = useDashboard();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToEditId, setItemToEditId] = useState<string | null>(null);

  const handleCreateWorkspace = async () => {
    if (workspaces.length >= 5) {
        setToast({ 
            message: "Workspace Limit Reached", 
            subMessage: "You have reached the maximum number of workspaces.",
            type: 'error' 
        });
        return;
    }

    try {
        const savedAuth = localStorage.getItem('workpai_llm_auth');
        const user = savedAuth ? JSON.parse(savedAuth) : null;
        
        const newWorkspaceData = {
          title: 'New Workspace ' + (workspaces.length + 1),
          description: 'A new workspace for your documents and chats.',
          userId: user?.id ? [user.id] : []
        };
        
        await WorkspaceService.createWorkspace(newWorkspaceData);
        await refreshWorkspaces();
        setToast({ message: "Workspace Created", type: "success" });
    } catch (err: any) {
        setToast({ message: "Failed to create workspace", type: "error", subMessage: err.message });
    }
  };

  const handleUpdateWorkspace = async (title: string, description: string) => {
    if (itemToEditId) {
        const ws = workspaces.find(s => s.id === itemToEditId);
        if(ws) {
            try {
                await WorkspaceService.updateWorkspace(ws.slug, { title, description });
                await refreshWorkspaces();
                setToast({ message: "Workspace Updated", type: "success" });
            } catch (err: any) {
                setToast({ message: "Failed to update workspace", type: "error", subMessage: err.message });
            }
        }
        setIsEditModalOpen(false);
        setItemToEditId(null);
    }
  };

  const handleDeleteWorkspace = async () => {
    if (itemToEditId) {
      const ws = workspaces.find(s => s.id === itemToEditId);
      if(ws) {  
        try {
            await WorkspaceService.deleteWorkspace(ws.slug);
            await refreshWorkspaces();
            setToast({ message: "Workspace Deleted", type: "info" });
        } catch (err: any) {
            setToast({ message: "Failed to delete workspace", type: "error", subMessage: err.message });
        }
        setIsDeleteModalOpen(false);
        setItemToEditId(null);
      }
    }
  };

  const handleCreateDemoWorkspace = async () => {
    if (workspaces.length >= 5) {
        setToast({ 
            message: "Free Tier Limit Reached", 
            subMessage: "Limit reached.",
            type: 'error' 
        });
        return;
    }

    const savedAuth = localStorage.getItem('workpai_llm_auth');
    const user = savedAuth ? JSON.parse(savedAuth) : null;
    const userId = user?.id;    

    const demoWorkspaces = [{
        title: 'Global Markets & Policy Risk',
        description: 'Integrasi dokumen strategi bisnis dan arsip kebijakan publik untuk analisis RAG real-time.',
        userId: userId ? [userId] : []
    }, {
        title: 'Political Marketing Engine',
        description: 'Data demografi pemilih (Marketing) dengan janji kampanye dan isu daerah (Politik).',
        userId: userId ? [userId] : []
    }, {
        title: 'Market Analysis 2024',
        description: 'Penyimpanan laporan riset pasar, data kompetitor, dan tren industri terbaru. Memungkinkan LLM melakukan sintesis data untuk strategi penetapan harga atau peluncuran produk baru.',
        userId: userId ? [userId] : []
    }];
    
    try {
        await Promise.all(demoWorkspaces.map(ws => WorkspaceService.createWorkspace(ws)));
        await refreshWorkspaces();
        setToast({ message: "Demo Workspace Created", type: "success" });
    } catch (err: any) {
        setToast({ message: "Failed to create demo workspace", type: "error", subMessage: err.message });
    }
  };

  return (
    <>
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
              { selectedWorkspaceId && (
              <button 
                  onClick={onCollapse}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-charcoal-800 text-charcoal-400 hover:text-slate-900 dark:hover:text-slate-200"
                  title="Collapse Sidebar"
              >
                  <ChevronsLeft size={18} />
              </button>
              )}
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
                                          {ws.symbol || ws.title.substring(0, 1).toUpperCase()}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                          <h3 className={`text-sm font-semibold truncate ${isSelected ? 'text-accent-700 dark:text-accent-400' : 'text-slate-700 dark:text-slate-200'}`}>{ws.title}</h3>
                                      </div>
                                  </div>
                                  {ws.description && (
                                      <p className="text-xs text-charcoal-500 dark:text-charcoal-400 line-clamp-3 pl-11 mb-2">
                                          {ws.description}
                                      </p>
                                  )}
                                  <div className="flex items-center justify-between text-xs text-charcoal-500 pl-11">
                                      <span className="font-mono text-[10px]">{ws.slug}</span>
                                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <button onClick={(e) => { e.stopPropagation(); setItemToEditId(ws.id); setIsEditModalOpen(true); }} className="p-1 hover:text-slate-900 dark:hover:text-white"><Edit2 size={12} /></button>
                                          <button onClick={(e) => { e.stopPropagation(); setItemToEditId(ws.id); setIsDeleteModalOpen(true); }} className="p-1 hover:text-red-500"><Trash2 size={12} /></button>
                                      </div>
                                  </div>
                                  
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
                          onClick={handleCreateWorkspace}
                          className="w-full flex items-center gap-3 px-3 py-3 mb-2 rounded-xl border border-dashed border-gray-300 dark:border-charcoal-700 hover:border-accent-500 text-charcoal-500 dark:text-charcoal-400 hover:text-accent-600 dark:hover:text-accent-500 hover:bg-gray-50 dark:hover:bg-charcoal-800/50 transition-all text-sm font-medium"
                      >
                          <Plus size={18} />
                          <span>Create New Workspace</span>
                      </button>
                      
                      {workspaces.length === 0 && (
                          <div className="px-1 mt-4 w-full">
                              <button 
                                  onClick={handleCreateDemoWorkspace}
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

      <WorkspaceModal
          isOpen={isEditModalOpen}
          title="Edit Workspace"
          initialTitle={workspaces.find(s => s.id === itemToEditId)?.title || ''}
          initialDescription={workspaces.find(s => s.id === itemToEditId)?.description || ''}
          onConfirm={handleUpdateWorkspace}
          onCancel={() => { setIsEditModalOpen(false); setItemToEditId(null); }}
      />

      <ConfirmationModal
          isOpen={isDeleteModalOpen}
          title="Delete Workspace?"
          message={`Are you sure you want to delete "${workspaces.find(s => s.id === itemToEditId)?.title}"?`}
          validationString={workspaces.find(s => s.id === itemToEditId)?.slug}
          isDanger={true}
          onConfirm={handleDeleteWorkspace}
          onCancel={() => { setIsDeleteModalOpen(false); setItemToEditId(null); }}
      />
    </>
  );
};
