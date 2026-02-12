import React, { useState } from 'react';
import { 
  FileText, 
  Link as LinkIcon, 
  SlidersHorizontal, 
  X,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContextItem } from '../../../../types/types';

import { useDashboard } from '../DashboardContext';

export const ContextSidebar: React.FC = () => {
  const {
    isContextOpen: isOpen,
    setIsContextOpen,
    currentContextItems: contextItems,
    currentWorkspace,
    currentSession,
    updateThreshold: onUpdateThreshold,
    handleRemoveContextItem: onRemoveItem,
    handleToggleContextItemActive: onToggleActive
  } = useDashboard();

  const similarityThreshold = currentWorkspace?.similarityThreshold || 0.7;
  const [activeTab, setActiveTab] = useState<'documents' | 'settings'>('documents');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsContextOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          />

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full bg-gray-50 dark:bg-charcoal-900 border-l lg:border-l border-gray-200 dark:border-charcoal-800 flex flex-col flex-shrink-0 z-50 fixed inset-y-0 right-0 lg:relative overflow-hidden transition-colors duration-200 shadow-xl lg:shadow-none"
          >
            {/* Header tabs */}
            <div className="flex items-center border-b border-gray-200 dark:border-charcoal-800">
              <button 
                onClick={() => setIsContextOpen(false)}
                className="lg:hidden p-4 text-charcoal-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X size={20} />
              </button>
             <button 
              onClick={() => setActiveTab('documents')}
              className={`flex-1 ps-2 py-4 text-sm font-medium text-left transition-colors border-b-2 ${
                activeTab === 'documents' 
                  ? 'border-accent-500 text-slate-800 dark:text-slate-100' 
                  : 'border-transparent text-charcoal-500 dark:text-charcoal-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
             >
               Context
             </button>
             {/* <button 
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-4 text-sm font-medium text-center transition-colors border-b-2 ${
                activeTab === 'settings' 
                  ? 'border-accent-500 text-slate-800 dark:text-slate-100' 
                  : 'border-transparent text-charcoal-500 dark:text-charcoal-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
             >
               Vector Settings
             </button> */}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {activeTab === 'documents' ? (
              <>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold text-charcoal-500 dark:text-charcoal-400 uppercase tracking-wider mb-3">Active Context</h3>
                    <p className="text-[10px] text-charcoal-400 mb-2">Select files to include in this chat session.</p>
                    
                    {contextItems.length === 0 ? (
                      <div className="text-center py-8 text-charcoal-500 text-sm border-2 border-dashed border-charcoal-200 dark:border-charcoal-700 rounded-xl">
                        No documents indexed in this workspace. <br/> Go to "Workspaces" to manage files.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {contextItems.map(item => {
                           const isActive = currentSession?.contextItemIds?.includes(item.id);
                           
                           return (
                           <div key={item.id} className="flex items-center gap-3 p-3 bg-white dark:bg-charcoal-800 rounded-lg border border-gray-200 dark:border-charcoal-700 shadow-sm group">
                             
                             {/* Checkbox */}
                             <div className="relative flex items-center">
                                <input 
                                  type="checkbox" 
                                  checked={!!isActive} 
                                  onChange={() => onToggleActive(item.id)}
                                  disabled={!currentSession}
                                  className="w-4 h-4 rounded border-gray-300 text-accent-600 focus:ring-accent-500 cursor-pointer disabled:opacity-50"
                                />
                             </div>

                             {item.type === 'link' ? <LinkIcon size={16} className="text-blue-500 dark:text-blue-400" /> : <FileText size={16} className="text-orange-500 dark:text-orange-400" />}
                             <div className="flex-1 min-w-0">
                               <p className={`text-sm truncate transition-colors ${isActive ? 'text-slate-700 dark:text-slate-200' : 'text-charcoal-400 line-through'}`}>
                                   {item.name}
                               </p>
                               <p className="text-[10px] text-charcoal-400 flex items-center gap-1">
                                 {item.status === 'indexed' && <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>}
                                 {item.status.toUpperCase()}
                                 {!currentSession && <span className="ml-2 text-red-500">(No Active Session)</span>}
                               </p>
                             </div>
                           </div>
                        )})}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                 <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
                        <SlidersHorizontal size={16} />
                        Similarity Threshold
                      </h3>
                      <span className="text-xs font-mono bg-gray-200 dark:bg-charcoal-800 px-2 py-1 rounded text-accent-600 dark:text-accent-400">{similarityThreshold.toFixed(2)}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05"
                      value={similarityThreshold}
                      onChange={(e) => onUpdateThreshold(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 dark:bg-charcoal-700 rounded-lg appearance-none cursor-pointer accent-accent-500"
                    />
                    <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-2">
                      Higher values force stricter matching for document retrieval.
                    </p>
                 </div>

                 <div className="p-4 bg-gray-100 dark:bg-charcoal-800/50 rounded-lg border border-gray-200 dark:border-charcoal-700">
                    <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Vector Database Status</h4>
                    <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                       <RefreshCw size={12} className="animate-spin" />
                       <span>System Ready</span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                       <div className="bg-white dark:bg-charcoal-900 p-2 rounded border border-gray-200 dark:border-charcoal-800">
                          <span className="block text-[10px] text-charcoal-500 dark:text-charcoal-400">Vectors</span>
                          <span className="text-sm font-mono text-slate-700 dark:text-slate-200">14,205</span>
                       </div>
                       <div className="bg-white dark:bg-charcoal-900 p-2 rounded border border-gray-200 dark:border-charcoal-800">
                          <span className="block text-[10px] text-charcoal-500 dark:text-charcoal-400">Dimension</span>
                          <span className="text-sm font-mono text-slate-700 dark:text-slate-200">1536</span>
                       </div>
                    </div>
                 </div>
              </div>
            )}
          </div>
        </motion.div>
      </>
      )}
    </AnimatePresence>
  );
};
