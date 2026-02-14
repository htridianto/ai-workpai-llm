
import React, { useState } from 'react';
import { 
  File, 
  Globe, 
  Database, 
  X, 
  MessageCircle,
} from 'lucide-react';
import { FileContext, Folder as FolderType, Workspace } from '@/shared/types/types';
import { useDashboard } from '@/app/(protected)/dashboard/DashboardContext';
import { WorkspaceService } from '@/client/services/workspaceService';
import { FilesTab } from './AddContextTabs/FilesTab';
import { LinkTab } from './AddContextTabs/LinkTab';
import { DatabaseTab } from './AddContextTabs/DatabaseTab';
import { WhatsappTab } from './AddContextTabs/WhatsappTab';

interface AddContextPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContext: () => void;
  currentFolderId: string | null;
  folders: FolderType[];
  // selectedWorkspaceId: string;
  selectedWorkspace: Workspace;
}

export const AddContextPanel: React.FC<AddContextPanelProps> = ({ 
  isOpen, 
  onClose, 
  onAddContext, 
  currentFolderId,
  folders,
  selectedWorkspace
}) => {
  const { setWorkspaces, workspaces, refreshWorkspaces, setToast } = useDashboard();
  const [activeTab, setActiveTab] = useState<'files' | 'link' | 'whatsapp' | 'database'>('files');
  
  const addFileContexts = async (wsId: string, newItems: FileContext[]) => {
    const ws = selectedWorkspace;//workspaces.find(w => w.id === wsId);
    if (!ws) return;

    const updatedWs = {
      ...ws,
      fileContexts: [...(ws.fileContexts || []), ...newItems]
    };

    // Optimistic update
    setWorkspaces(prev => prev.map(w => w.id === ws.id ? updatedWs : w));
    
    // Persist
    try {
        await Promise.all(newItems.map(item => 
            WorkspaceService.createFileContext({
                workspaceId: ws.slug,
                folderId: item.folderId,
                name: item.name,
                type: item.type,
                size: item.size,
                snippet: item.snippet,
                status: item.status || 'indexing',
                meta: {
                    progress: item.meta?.progress || 0,
                    ...item.meta // Keep original meta if any
                }
            })
        ));        
        await refreshWorkspaces();
        setToast({ message: `${newItems.length} items queued for indexing`, type: "info" });
    } catch (error: any) {
        setToast({ message: "Failed to add file contexts", type: "error", subMessage: error.message });
        return;
    }

    // Simulation
    /*
    newItems.forEach(item => {
      let currentStep = 0;
      const totalSteps = 20;      
      const tick = () => {
        currentStep++;
        const progress = Math.min(Math.round((currentStep / totalSteps) * 100), 100);        
        setWorkspaces(prev => prev.map(w => {
          if (w.id === ws.id) {
            return {
              ...w,
              fileContexts: w.fileContexts.map(i => {
                if (i.id === item.id) {
                  if (progress === 100) return { ...i, progress: 100, status: 'indexed' };
                  return { ...i, progress };
                }
                return i;
              })
            };
          }
          return w;
        }));

        if (currentStep < totalSteps) {
          setTimeout(tick, Math.random() * 200 + 100);
        }
      };
      tick();
    });
    */
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="mx-6 mb-4 mt-2 p-6 bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 rounded-2xl shadow-sm animate-in slide-in-from-top-2 duration-300 min-h-[400px] flex flex-col relative overflow-hidden">
        
        {/* Header Tabs */}
        <div className="flex gap-6 border-b border-gray-200 dark:border-charcoal-800 mb-6 overflow-x-auto shrink-0">
            <button 
                onClick={() => setActiveTab('files')}
                className={`pb-3 flex items-center gap-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'files' ? 'border-accent-500 text-accent-600 dark:text-accent-500' : 'border-transparent text-charcoal-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
                <File size={16} /> Upload Files
            </button>
            <button 
                onClick={() => setActiveTab('link')}
                className={`pb-3 flex items-center gap-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'link' ? 'border-accent-500 text-accent-600 dark:text-accent-500' : 'border-transparent text-charcoal-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
                <Globe size={16} /> Website Link
            </button>
            <button 
                onClick={() => setActiveTab('whatsapp')}
                className={`pb-3 flex items-center gap-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'whatsapp' ? 'border-green-500 text-green-600 dark:text-green-500' : 'border-transparent text-charcoal-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
                <MessageCircle size={16} /> WhatsApp Group
            </button>
            <button 
                onClick={() => setActiveTab('database')}
                className={`pb-3 flex items-center gap-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'database' ? 'border-accent-500 text-accent-600 dark:text-accent-500' : 'border-transparent text-charcoal-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
                <Database size={16} /> Database
            </button>
            <button onClick={onClose} className="p-1 ml-auto text-charcoal-400 hover:text-red-500 rounded"><X size={20}/></button>
        </div>

        <div className="flex-1">
          {activeTab === 'files' && (
            <FilesTab 
              workspace={selectedWorkspace}
              onClose={onClose}
              onSuccess={onAddContext}
              folders={folders}
              currentFolderId={currentFolderId}
              addFileContexts={addFileContexts}
            />
          )}

          {activeTab === 'link' && (
            <LinkTab 
              workspaceId={selectedWorkspace.id}
              onClose={onClose}
              onSuccess={onAddContext}
              addFileContexts={addFileContexts}
            />
          )}

          {activeTab === 'database' && (
            <DatabaseTab 
              workspaceId={selectedWorkspace.id}
              onClose={onClose}
              onSuccess={onAddContext}
              addFileContexts={addFileContexts}
            />
          )}

          {activeTab === 'whatsapp' && (
            <WhatsappTab 
              workspace={selectedWorkspace}
              onClose={onClose}
              onSuccess={onAddContext}
              addFileContexts={addFileContexts}
            />
          )}
        </div>
    </div>
  );
};
