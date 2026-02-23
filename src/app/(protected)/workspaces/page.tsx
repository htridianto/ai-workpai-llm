'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Grid, 
  List as ListIcon, 
  Menu, 
  PanelLeftClose, 
  PanelLeft,
  Box,
  ChevronRight,
  ChevronsRight
} from 'lucide-react';
import { useDashboard } from '@/app/(protected)/dashboard/DashboardContext';

// New Sub-Components
import { WorkspaceList } from './_components/WorkspaceList';
import { FileManager } from './_components/FileManager';

export default function WorkspacesPage() {
  const router = useRouter();
  const { workspaces, isLoadingData } = useDashboard();

  // Layout State
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Sidebar Toggles
  const [isWorkspaceSidebarOpen, setIsWorkspaceSidebarOpen] = useState(true);
  const [isFolderTreeOpen, setIsFolderTreeOpen] = useState(false);
  const selectedWorkspace = workspaces.find(s => s.id === selectedWorkspaceId);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-charcoal-950 text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200 overflow-hidden">
      
      {/* LEFT PANEL: Workspace List (Collapsible) */}
      <WorkspaceList 
          isOpen={isWorkspaceSidebarOpen}
          selectedWorkspaceId={selectedWorkspaceId}
          onSelectWorkspace={(id) => { setSelectedWorkspaceId(id); }}
          onCollapse={() => setIsWorkspaceSidebarOpen(false)}
          onNavigateHome={() => router.push('/')}
          onEnterChat={(id) => router.push(`/dashboard/${id}`)}
      />

      {/* RIGHT PANEL: File Manager */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50 dark:bg-charcoal-950">
          
          {selectedWorkspace ? (
              <>
                {/* Manager Header */}
                <div className="h-16 border-b border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                        {/* Toggle Workspace Sidebar (If Closed) */}
                        {!isWorkspaceSidebarOpen && (
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => router.push('/')} 
                                    className="p-2 text-charcoal-500 hover:bg-gray-100 dark:hover:bg-charcoal-800 rounded-lg transition-colors"
                                    title="Back to Dashboard"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                                <div className="h-4 w-px bg-gray-300 dark:bg-charcoal-700 mx-1"></div>
                                <button 
                                    onClick={() => setIsWorkspaceSidebarOpen(true)}
                                    className="p-2 text-charcoal-500 hover:bg-gray-100 dark:hover:bg-charcoal-800 rounded-lg"
                                    title="Expand Workspace List"
                                >
                                    <ChevronsRight size={20} />
                                </button>
                            </div>
                        )}

                        {/* Toggle Folder Tree Sidebar */}
                        <button 
                            onClick={() => setIsFolderTreeOpen(!isFolderTreeOpen)}
                            className={`p-2 rounded-lg transition-colors ${
                                isFolderTreeOpen 
                                ? 'bg-accent-50 dark:bg-accent-900/10 text-accent-600 dark:text-accent-500' 
                                : 'text-charcoal-500 hover:bg-gray-100 dark:hover:bg-charcoal-800'
                            }`}
                            title={isFolderTreeOpen ? "Collapse Folders" : "Expand Folders"}
                        >
                            {isFolderTreeOpen ? <PanelLeftClose size={20} /> : <PanelLeft size={20} />}
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex bg-gray-100 dark:bg-charcoal-800 p-1 rounded-lg">
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-charcoal-700 shadow-sm text-accent-600 dark:text-accent-500' : 'text-charcoal-500 hover:text-slate-700'}`}
                            >
                                <Grid size={18} />
                            </button>
                            <button 
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-charcoal-700 shadow-sm text-accent-600 dark:text-accent-500' : 'text-charcoal-500 hover:text-slate-700'}`}
                            >
                                <ListIcon size={18} />
                            </button>
                        </div>
                    </div>
                </div>
                 
                 <FileManager 
                     selectedWorkspace={selectedWorkspace}
                     viewMode={viewMode}
                     isFolderTreeOpen={isFolderTreeOpen}
                     setIsFolderTreeOpen={setIsFolderTreeOpen}
                 />
              </>
          ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-charcoal-400">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-charcoal-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                      <Box size={40} className="text-accent-500 opacity-50" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">No Campaign Selected</h2>
                  <p className="max-w-lg text-center">Select a campaign from the sidebar or create a new one to manage your knowledge base.</p>
              </div>
          )}
      </div>
    </div>
  );
}
