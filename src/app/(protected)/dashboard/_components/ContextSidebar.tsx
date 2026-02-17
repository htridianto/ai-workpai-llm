import React, { useState } from 'react';
import { 
  FileText, 
  Link as LinkIcon, 
  SlidersHorizontal, 
  X,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileContext } from '@/shared/types/types';
import { useDashboard } from '@/app/(protected)/dashboard/DashboardContext';

const generateSnippet = (text: string, wordLimit: number) => {
  const words = text.split(/\s+/); // Memecah berdasarkan spasi
  if (words.length <= wordLimit) return text;
  
  return words.slice(0, wordLimit).join(" ") + "...";
}

export const ContextSidebar: React.FC = () => {
  const {
    isContextOpen: isOpen,
    setIsContextOpen,
    currentFileContexts: fileContexts,
    currentWorkspace,
    currentSession,
    updateThreshold: onUpdateThreshold,
    handleRemoveFileContext: onRemoveItem,
    handleToggleFileContextActive: onToggleActive
  } = useDashboard();

  const similarityThreshold = currentWorkspace?.similarityThreshold || 0.7;
  const [activeTab, setActiveTab] = useState<'documents' | 'settings'>('documents');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

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
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full bg-white dark:bg-charcoal-900 border-l border-gray-200 dark:border-charcoal-800 flex flex-col flex-shrink-0 z-50 fixed inset-y-0 right-0 lg:relative overflow-hidden transition-colors duration-200 shadow-2xl lg:shadow-none"
          >
            {/* Header tabs */}
            <div className="flex items-center border-b border-gray-200 dark:border-charcoal-800 bg-gray-50/50 dark:bg-charcoal-950/20 backdrop-blur-md">
              <button 
                onClick={() => setIsContextOpen(false)}
                className="lg:hidden p-4 text-charcoal-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X size={20} />
              </button>
             <button 
              onClick={() => setActiveTab('documents')}
              className={`flex-1 px-4 py-4 text-xs font-bold tracking-widest text-left transition-all border-b-2 ${
                activeTab === 'documents' 
                  ? 'border-accent-500 text-accent-600 dark:text-accent-400' 
                  : 'border-transparent text-charcoal-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
             >
               Documents
             </button>
             {/* <button 
              onClick={() => setActiveTab('settings')}
              className={`flex-1 px-4 py-4 text-xs font-bold tracking-widest text-center transition-all border-b-2 ${
                activeTab === 'settings' 
                  ? 'border-accent-500 text-accent-600 dark:text-accent-400' 
                  : 'border-transparent text-charcoal-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
             >
               Settings
             </button> */}
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-charcoal-200 dark:scrollbar-thumb-charcoal-800">
            {activeTab === 'documents' ? (
              <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[10px] font-bold text-charcoal-400 uppercase tracking-widest">Active Context</h3>
                        <div className="px-2 py-0.5 rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400 text-[10px] font-bold">
                            {fileContexts.length} Total
                        </div>
                    </div>
                    
                    {fileContexts.length === 0 ? (
                      <div className="text-center py-12 px-6 bg-gray-50 dark:bg-charcoal-950/40 border border-dashed border-gray-200 dark:border-charcoal-800 rounded-2xl">
                        <FileText size={32} className="mx-auto mb-3 text-charcoal-300 dark:text-charcoal-700" />
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">No documents indexed</p>
                        <p className="text-xs text-charcoal-400 mt-1">Manage files in your "Workspaces" settings.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {fileContexts.map(item => {
                           const isActive = currentSession?.fileContextIds?.includes(item.id);
                           const isExpanded = expandedItems.includes(item.id);
                           
                           return (
                           <div 
                             key={item.id} 
                             className={`group flex flex-col transition-all duration-300 rounded-xl border ${
                               isActive 
                                ? 'bg-white dark:bg-charcoal-800 border-accent-200 dark:border-accent-500/30 shadow-md shadow-accent-500/5' 
                                : 'bg-gray-50/50 dark:bg-charcoal-900/30 border-gray-100 dark:border-charcoal-800 hover:border-gray-200 dark:hover:border-charcoal-700'
                             }`}
                           >
                             <div className="flex items-center gap-3 p-3">
                                {/* Action: Toggle Context */}
                                <div className="relative flex items-center">
                                    <input 
                                      type="checkbox" 
                                      checked={!!isActive} 
                                      onChange={() => onToggleActive(item.id)}
                                      disabled={true}
                                      className="w-4 h-4 rounded-md border-gray-300 dark:border-charcoal-700 text-accent-600 focus:ring-accent-500 cursor-pointer disabled:opacity-30 transition-all"
                                    />
                                </div>

                                <div className={`p-1.5 rounded-lg ${
                                    item.type === 'link' 
                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-500' 
                                    : 'bg-orange-50 dark:bg-orange-900/20 text-orange-500'
                                }`}>
                                    {item.type === 'link' ? <LinkIcon size={14} /> : <FileText size={14} />}
                                </div>

                                <div className="flex-1 min-w-0" onClick={() => toggleExpand(item.id)} style={{ cursor: 'pointer' }}>
                                    <p className={`text-xs font-bold truncate transition-colors ${
                                        isActive ? 'text-slate-800 dark:text-slate-100' : 'text-charcoal-400'
                                    }`}>
                                        {item.name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <div className="flex items-center gap-1">
                                            <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'indexed' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                                            <span className="text-[9px] uppercase font-bold text-charcoal-400 tracking-tighter">{item.status}</span>
                                        </div>
                                        {item.size > 0 && (
                                            <span className="text-[9px] text-charcoal-500 font-mono">
                                                {(item.size / 1024).toFixed(1)} KB
                                            </span>
                                        )}
                                    </div>
                                </div>
                             </div>

                             {/* Snippet / Content Preview */}
                             <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden bg-gray-50/50 dark:bg-charcoal-950/40 rounded-b-xl border-t border-gray-100 dark:border-charcoal-800"
                                    >
                                        <div className="p-3">
                                            <h4 className="text-[9px] font-bold text-charcoal-400 uppercase tracking-widest mb-1.5">Context Content</h4>
                                            <div className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400 whitespace-pre-wrap italic">
                                                {item.snippet || (item.meta?.document?.pageContent && generateSnippet(item.meta.document.pageContent, 20)) || "No preview snippet available for this item."}
                                            </div>
                                            {item.meta?.document.url && (
                                                 <a href={item.meta.document.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-[10px] text-accent-500 hover:underline">
                                                    <LinkIcon size={10} /> Visit Source
                                                 </a>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                             </AnimatePresence>
                           </div>
                        )})}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                 <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xs font-bold text-charcoal-400 uppercase tracking-widest flex items-center gap-2">
                        <SlidersHorizontal size={14} />
                        Global Threshold
                      </h3>
                      <span className="text-[10px] font-bold bg-accent-500/10 text-accent-600 dark:text-accent-400 px-2 py-1 rounded-full">{similarityThreshold.toFixed(2)}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05"
                      value={similarityThreshold}
                      onChange={(e) => onUpdateThreshold(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 dark:bg-charcoal-800 rounded-lg appearance-none cursor-pointer accent-accent-500"
                    />
                    <p className="text-[10px] text-charcoal-500 dark:text-charcoal-400 mt-2 leading-relaxed">
                      Adjust how strictly the AI matches documents to your query. Higher values are more precise.
                    </p>
                 </div>

                 <div className="p-4 bg-gray-50 dark:bg-charcoal-950/20 rounded-2xl border border-gray-200 dark:border-charcoal-800 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <RefreshCw size={40} className="animate-spin-slow" />
                    </div>
                    <h4 className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-3">Vector Search Engine</h4>
                    <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-500 font-bold">
                       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                       <span>Engine Active</span>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                       <div className="flex justify-between items-center bg-white dark:bg-charcoal-900 p-2 rounded-lg border border-gray-100 dark:border-charcoal-800">
                          <span className="text-[10px] text-charcoal-500 font-bold uppercase">Index Size</span>
                          <span className="text-xs font-mono text-slate-700 dark:text-slate-200">14,205 pts</span>
                       </div>
                       <div className="flex justify-between items-center bg-white dark:bg-charcoal-900 p-2 rounded-lg border border-gray-100 dark:border-charcoal-800">
                          <span className="text-[10px] text-charcoal-500 font-bold uppercase">Dimensions</span>
                          <span className="text-xs font-mono text-slate-700 dark:text-slate-200">1536 (Ada)</span>
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

