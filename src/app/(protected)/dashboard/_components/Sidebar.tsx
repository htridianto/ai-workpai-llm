
import React, { useMemo, useState } from 'react';
import { 
  Box, 
  MessageSquare, 
  Plus, 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  Layout,
  FileBox,
  Search,
  X,
  Edit2,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatSession, Workspace } from '@/shared/types/types';
import { ConfirmationModal } from '@/client/components/Shared/ConfirmationModal';
import { InputModal } from '@/client/components/Shared/InputModal';
import { useRouter } from 'next/navigation';
import { useDashboard } from '@/app/(protected)/dashboard/DashboardContext';
import { useTheme } from '@/client/components/ThemeProvider';

export const Sidebar = React.memo(() => {
  const {
      workspaces,
      currentWorkspaceId,
      handleSelectWorkspace: onSelectWorkspace,
      sessions: allSessions, // Renaming to avoid conflict if needed, or just use sessions
      filteredSessions: sessions, // We want the filtered ones
      currentSessionId,
      createNewSession: onNewChat,
      setCurrentSessionId: onSelectSession,
      deleteSession: onDeleteSession,
      renameSession: onRenameSession,
      handleLogout: onLogout,
      isSidebarOpen: isOpen,
      setIsSidebarOpen,
  } = useDashboard();
  
  const { isDarkMode, toggleTheme: onToggleTheme } = useTheme();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [renameSessionId, setRenameSessionId] = useState<string | null>(null);

  const router = useRouter();

  const sidebarVariants = {
    open: { 
      width: "320px", 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: { 
      width: "0px", 
      opacity: 0, 
      x: -20, // Subtle slide
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };
   // For mobile, we might want a different variant, but let's stick to this for now as it handles desktop width too.

  // Group Sessions by Date
  const groupedSessions = useMemo(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    const groups: { [key: string]: ChatSession[] } = {
      'Today': [],
      'Yesterday': [],
      'Previous 7 Days': [],
      'Older': []
    };

    // Sort descending by activity
    const sorted = [...sessions].sort((a, b) => {
        const aTime = a.messages.length > 0 ? a.messages[a.messages.length - 1].timestamp : a.createdAt;
        const bTime = b.messages.length > 0 ? b.messages[b.messages.length - 1].timestamp : b.createdAt;
        return bTime - aTime;
    });

    const filtered = sorted.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()));

    filtered.forEach(session => {
      const date = new Date(session.messages.length > 0 ? session.messages[session.messages.length - 1].timestamp : session.createdAt);
      
      if (date.toDateString() === today.toDateString()) {
        groups['Today'].push(session);
      } else if (date.toDateString() === yesterday.toDateString()) {
        groups['Yesterday'].push(session);
      } else if (date > lastWeek) {
        groups['Previous 7 Days'].push(session);
      } else {
        groups['Older'].push(session);
      }
    });

    return groups;
  }, [sessions, searchQuery]);

  const activeWorkspace = workspaces.find(w => w.slug === currentWorkspaceId);
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            />
            
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="h-full flex z-50 overflow-hidden fixed inset-y-0 left-0 lg:relative shadow-xl lg:shadow-none"
            >
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="absolute right-4 top-4 lg:hidden p-2 text-charcoal-400 hover:text-slate-900 dark:hover:text-white z-50"
              >
                <X size={20} />
              </button>

              {/* 1. Workspace Rail (Leftmost) */}
              <div className="w-[72px] h-full bg-gray-100 dark:bg-charcoal-950 border-r border-gray-200 dark:border-charcoal-800 flex flex-col items-center py-4 gap-3 shrink-0 z-40">
                {workspaces.map(ws => (
                    <button
                        key={ws.id}
                        onClick={() => onSelectWorkspace(ws.slug)}
                        className={`group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                            currentWorkspaceId === ws.slug
                            ? `bg-${ws.color || 'accent-500'} text-white shadow-lg shadow-accent-500/20` 
                            : `bg-white dark:bg-charcoal-800 text-${ws.color || 'charcoal-500'} x-dark:text-charcoal-400 hover:bg-accent-100 dark:hover:bg-charcoal-700`
                        }`}
                        title={ws.title}
                    >
                        {ws.symbol ? <span className="font-bold text-sm">{ws.symbol}</span> : <Box size={18} />}
                        {/* Active Indicator */}
                        {currentWorkspaceId === ws.id && (
                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent-500 rounded-r-full"></div>
                        )}
                        {/* Tooltip (Glassmorphism) */}
                        <div className="absolute left-14 bg-charcoal-900/80 backdrop-blur-xl border border-white/10 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-50 transition-all duration-200 shadow-xl scale-95 group-hover:scale-100 origin-left">
                            <span className="font-bold block text-xs mb-0.5 text-left text-accent-500">{ws.title}</span>
                            {ws.description && <span className="block font-normal text-[10px] opacity-70 max-w-[180px] truncate">{ws.description}</span>}
                        </div>
                    </button>
                ))}

                <button
                    onClick={() => router.push('/workspaces')}
                    className="w-10 h-10 rounded-xl bg-transparent border-2 border-dashed border-charcoal-300 dark:border-charcoal-700 text-charcoal-400 hover:border-accent-500 hover:text-accent-500 flex items-center justify-center transition-all mt-2"
                    title="Manage Workspaces"
                >
                    <Plus size={18} />
                </button>

                <div className="mt-auto flex flex-col gap-3">
                    <button 
                        onClick={onToggleTheme}
                        className="w-10 h-10 rounded-xl bg-transparent hover:bg-gray-200 dark:hover:bg-charcoal-800 text-charcoal-500 flex items-center justify-center transition-all"
                    >
                        {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                    </button>
                    <button 
                        onClick={() => setIsLogoutModalOpen(true)}
                        className="w-10 h-10 rounded-xl bg-transparent hover:bg-red-50 dark:hover:bg-red-900/20 text-charcoal-500 hover:text-red-500 flex items-center justify-center transition-all"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>

            {/* 2. Chat List Panel (Right) */}
            <div className="flex-1 h-full bg-gray-50 dark:bg-charcoal-900 flex flex-col overflow-hidden border-r border-gray-200 dark:border-charcoal-800">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-charcoal-800 shrink-0">
                    
                    {/* Brand Title Addition */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-accent-500/20">
                            <Box size={20} strokeWidth={2.5} />
                        </div>
                        <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
                           WorkpAI
                        </h1>
                    </div>

                    <div className="h-px bg-gray-200 dark:bg-charcoal-800 mb-4"></div>

                    <h2 className="font-bold text-slate-800 dark:text-slate-100 truncate mb-1 text-sm">
                        {activeWorkspace?.title || 'Select Workspace'}
                    </h2>
                    
                    {activeWorkspace?.description && (
                        <p className="text-xs text-charcoal-500 dark:text-charcoal-400 line-clamp-2 mb-3 leading-relaxed">
                            {activeWorkspace.description}
                        </p>
                    )}

                    <div className="flex items-center justify-between mb-3">
                         <p className="text-[10px] text-charcoal-500 uppercase tracking-wider font-semibold">
                            Chat History
                        </p>
                    </div>

                    <button 
                        onClick={onNewChat}
                        disabled={!currentWorkspaceId}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-accent-600 hover:bg-accent-500 text-white rounded-lg shadow-md shadow-accent-900/10 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Plus size={16} />
                        <span>New Chat</span>
                    </button>
                </div>

                {/* Search */}
                <div className="px-4 py-2">
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-2.5 text-charcoal-400" />
                        <input 
                            type="text" 
                            placeholder="Find a chat..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-8 py-2 bg-gray-200 dark:bg-charcoal-800 border-none rounded-lg text-xs text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-accent-500 focus:outline-none placeholder-charcoal-500"
                        />
                         {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-2 top-2 text-charcoal-400 hover:text-slate-500"><X size={14} /></button>
                        )}
                    </div>
                </div>

                {/* Session List */}
                <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-charcoal-300 dark:scrollbar-thumb-charcoal-700 space-y-4">
                    {!currentWorkspaceId ? (
                        <div className="text-center py-10 px-4 text-charcoal-500 text-sm">
                            <Box size={24} className="mx-auto mb-2 opacity-50" />
                            Please select a workspace from the left rail.
                        </div>
                    ) : (
                        Object.entries(groupedSessions).map(([group, groupSessions]) => (
                            groupSessions.length > 0 && (
                                <div key={group}>
                                    <div className="px-3 py-1 text-[10px] font-bold text-charcoal-400 uppercase tracking-wider mb-1">
                                        {group}
                                    </div>
                                    <div className="space-y-0.5">
                                        {groupSessions.map(session => (
                                            <div 
                                                key={session.id}
                                                onClick={() => onSelectSession(session.id)}
                                                className={`group relative flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                                                    currentSessionId === session.id 
                                                    ? 'bg-white dark:bg-charcoal-800 text-slate-900 dark:text-slate-100 shadow-sm border-l-2 border-accent-500' 
                                                    : 'text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-charcoal-800/50 border-l-2 border-transparent'
                                                }`}
                                            >
                                                <MessageSquare size={14} className={currentSessionId === session.id ? 'text-accent-500' : 'text-charcoal-400'} />
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-xs font-normal truncate pr-6">{session.title}</p>
                                                </div>
                                                
                                                {/* Hover Actions */}
                                                <div className={`absolute right-1 flex items-center bg-gradient-to-l from-white via-white to-transparent dark:from-charcoal-800 dark:via-charcoal-800 dark:to-transparent pl-4 py-1 ${currentSessionId === session.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); setRenameSessionId(session.id); }}
                                                        className="p-1 hover:text-slate-900 dark:hover:text-white transition-colors"
                                                        title="Rename"
                                                    >
                                                        <Edit2 size={12} />
                                                    </button>
                                                    <button 
                                                        onClick={(e) => onDeleteSession(session.id, e)}
                                                        className="p-1 hover:text-red-500 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))
                    )}
                    {currentWorkspaceId && Object.values(groupedSessions).every(g => g.length === 0) && (
                         <div className="text-center py-8 text-charcoal-400 text-xs italic">
                            No chats in this workspace yet.
                         </div>
                    )}
                </div>

                {/* Bottom Links */}
                <div className="p-3 border-t border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900/50 space-y-1">
                     <button 
                        onClick={() => router.push('/workspaces')}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-charcoal-600 dark:text-charcoal-400 hover:bg-white dark:hover:bg-charcoal-800 hover:text-slate-900 dark:hover:text-white transition-all text-sm group"
                     >
                        <Layout size={16} className="group-hover:text-accent-500 transition-colors" />
                        <span>Workspaces</span>
                     </button>
                     <button 
                        onClick={() => router.push('/generated')}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-charcoal-600 dark:text-charcoal-400 hover:bg-white dark:hover:bg-charcoal-800 hover:text-slate-900 dark:hover:text-white transition-all text-sm group"
                     >
                        <FileBox size={16} className="group-hover:text-accent-500 transition-colors" />
                        <span>Generated Contents</span>
                     </button>
                     <button 
                       onClick={() => router.push('/settings')}
                       className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-charcoal-600 dark:text-charcoal-400 hover:bg-white dark:hover:bg-charcoal-800 hover:text-slate-900 dark:hover:text-white transition-all text-sm group"
                     >
                        <Settings size={16} className="group-hover:text-accent-500 transition-colors" />
                        <span>Settings</span>
                     </button>
                </div>
            </div>
          </motion.div>
        </>
        )}
      </AnimatePresence>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        title="Sign Out"
        message="Are you sure you want to sign out?"
        confirmLabel="Sign Out"
        isDanger={false}
        onConfirm={() => {
          setIsLogoutModalOpen(false);
          onLogout();
        }}
        onCancel={() => setIsLogoutModalOpen(false)}
      />

      <InputModal
          isOpen={!!renameSessionId}
          title="Rename Chat"
          initialValue={sessions.find(s => s.id === renameSessionId)?.title || ''}
          confirmLabel="Rename"
          onConfirm={(newTitle) => {
             if (renameSessionId) {
                 onRenameSession(renameSessionId, newTitle);
                 setRenameSessionId(null);
             }
          }}
          onCancel={() => setRenameSessionId(null)}
      />
    </>
  );
});
