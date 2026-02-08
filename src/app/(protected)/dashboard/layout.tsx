'use client';

import React from 'react';
import { Sidebar } from './_components/Sidebar';
import { ContextSidebar } from './_components/ContextSidebar';
import { Toast } from '../../../components/Shared/Toast';
import { useDashboard, DashboardProvider } from './DashboardContext';
import { AVAILABLE_MODELS } from '../../../constants';

function DashboardShell({ children }: { children: React.ReactNode }) {
  const {
    isSidebarOpen, setIsSidebarOpen,
    isContextOpen, setIsContextOpen,
    isDarkMode, toggleTheme,
    workspaces, currentWorkspaceId, handleSelectWorkspace,
    filteredSessions, currentSessionId, setCurrentSessionId,
    createNewSession, deleteSession, renameSession,
    handleLogout,
    currentContextItems, currentWorkspace, updateThreshold,
    handleRemoveContextItem, handleToggleContextItemActive,
    currentSession, settings, toast, setToast, isLoadingData
  } = useDashboard();

  if (isLoadingData) {
    return (
       <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-charcoal-950 text-accent-500">
         <div className="flex flex-col items-center gap-4">
           <div className="w-10 h-10 border-4 border-charcoal-200 dark:border-charcoal-800 border-t-accent-500 rounded-full animate-spin"></div>
           <p className="text-charcoal-500 dark:text-charcoal-400 text-sm animate-pulse">Loading Workspace...</p>
         </div>
       </div>
    );
  }

  const currentModelName = AVAILABLE_MODELS.find(m => m.id === (currentSession?.modelId || settings.defaultModelId))?.name;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-charcoal-950 transition-colors duration-300">
      <Sidebar
        workspaces={workspaces}
        currentWorkspaceId={currentWorkspaceId}
        onSelectWorkspace={handleSelectWorkspace}
        sessions={filteredSessions}
        currentSessionId={currentSessionId}
        onNewChat={createNewSession}
        onSelectSession={setCurrentSessionId}
        onDeleteSession={deleteSession}
        onRenameSession={renameSession}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={handleLogout}
        onOpenSwitchModal={() => {}}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-charcoal-900 transition-colors duration-300 relative">
        <header className="h-16 border-b border-gray-200 dark:border-charcoal-800 flex items-center justify-between px-6 shrink-0 bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4 min-w-0">
             {!isSidebarOpen && (
                 <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-charcoal-800 rounded-lg text-charcoal-500 transition-colors"
                 >
                    <div className="w-5 h-0.5 bg-current mb-1"></div>
                    <div className="w-5 h-0.5 bg-current mb-1"></div>
                    <div className="w-5 h-0.5 bg-current"></div>
                 </button>
             )}
             <div className="min-w-0">
                <h2 className="text-sm font-bold text-slate-800 dark:text-white truncate">
                    {currentSession?.title || 'New Chat'}
                </h2>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-accent-600 dark:text-accent-400 font-bold uppercase tracking-widest">{currentModelName || 'Select Model'}</span>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsContextOpen(!isContextOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isContextOpen ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/20' : 'bg-gray-100 dark:bg-charcoal-800 text-charcoal-500 hover:bg-gray-200 dark:hover:bg-charcoal-700'}`}
              >
                  {currentContextItems.filter(i => i.isActive !== false).length} Active Context
              </button>
          </div>
        </header>

        <main className="flex-1 overflow-hidden flex flex-col relative">
          {children}
        </main>
      </div>

      <ContextSidebar
        isOpen={isContextOpen}
        contextItems={currentContextItems}
        similarityThreshold={currentWorkspace?.similarityThreshold || 0.7}
        onUpdateThreshold={updateThreshold}
        onRemoveItem={handleRemoveContextItem}
        onToggleActive={handleToggleContextItemActive}
      />

      <Toast 
        message={toast?.message || null}
        type={toast?.type}
        subMessage={toast?.subMessage}
        onClose={() => setToast(null)}
      />
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardShell>
        {children}
      </DashboardShell>
    </DashboardProvider>
  );
}
