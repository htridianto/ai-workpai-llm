import React from 'react';
import { Layers } from 'lucide-react';
import { useDashboard } from '@/app/(protected)/dashboard/DashboardContext';
import { NotificationCenter } from '@/client/components/Shared/NotificationCenter';

export const Header: React.FC = () => {
    const {
        isSidebarOpen, setIsSidebarOpen,
        isContextOpen, setIsContextOpen,
        currentSession
    } = useDashboard();

    return (
        <header className="h-16 border-b border-gray-200 dark:border-charcoal-800 flex items-center justify-between px-6 shrink-0 bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-md z-10 transition-colors duration-300">
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
                <h2 className="text-sm text-slate-800 dark:text-white truncate">
                    {currentSession?.title || 'New Chat'}
                </h2>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <NotificationCenter />            
            <button 
              onClick={() => setIsContextOpen(!isContextOpen)}
              className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium ${isContextOpen ? 'bg-gray-100 dark:bg-charcoal-800 text-accent-600 dark:text-accent-400' : 'text-charcoal-500 dark:text-charcoal-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
              title="Toggle Context Panel"
            >
              <Layers size={18} />              
            </button>
          </div>
        </header>
    );
};
