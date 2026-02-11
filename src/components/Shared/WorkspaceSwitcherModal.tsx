
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Box, Check } from 'lucide-react';
import { Workspace } from '../../types/types';

interface WorkspaceSwitcherModalProps {
  isOpen: boolean;
  workspaces: Workspace[];
  currentWorkspaceId: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export const WorkspaceSwitcherModal: React.FC<WorkspaceSwitcherModalProps> = ({
  isOpen,
  workspaces,
  currentWorkspaceId,
  onSelect,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="relative w-full max-w-lg bg-charcoal-900 border border-charcoal-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="p-5 border-b border-charcoal-800 flex items-center justify-between bg-charcoal-900 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded bg-accent-500/10 text-accent-500 flex items-center justify-center">
                    <Box size={18} />
                 </div>
                 <h3 className="text-lg font-bold text-slate-100">Switch Workspace</h3>
              </div>
              <button 
                onClick={onClose}
                className="text-charcoal-500 hover:text-slate-300 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-charcoal-700">
               {workspaces.length === 0 ? (
                 <div className="text-center py-8 text-charcoal-500">No workspaces found.</div>
               ) : (
                 workspaces.map(workspace => (
                   <button
                     key={workspace.id}
                     onClick={() => {
                        onSelect(workspace.id);
                        onClose();
                     }}
                     className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                       workspace.id === currentWorkspaceId 
                         ? 'bg-accent-600/10 border-accent-500/50 shadow-inner' 
                         : 'bg-charcoal-800/50 border-charcoal-800 hover:bg-charcoal-800 hover:border-charcoal-700'
                     }`}
                   >
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        workspace.id === currentWorkspaceId ? 'bg-accent-500 text-white' : 'bg-charcoal-700 text-charcoal-400'
                     }`}>
                        {workspace.symbol ? <span className="font-bold">{workspace.symbol}</span> : <Box size={18} />}
                     </div>
                     <div className="flex-1 text-left">
                        <h4 className={`font-medium ${workspace.id === currentWorkspaceId ? 'text-accent-400' : 'text-slate-200'}`}>
                           {workspace.title}
                        </h4>
                        <p className="text-xs text-charcoal-400">
                           {workspace.contextItems?.length || 0} documents • {new Date(workspace.createdAt).toLocaleDateString()}
                        </p>
                     </div>
                     {workspace.id === currentWorkspaceId && (
                        <Check size={20} className="text-accent-500" />
                     )}
                   </button>
                 ))
               )}
            </div>
            
            <div className="p-4 border-t border-charcoal-800 bg-charcoal-900">
               <p className="text-center text-xs text-charcoal-500">
                 Select a workspace to activate it on your dashboard.
               </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
