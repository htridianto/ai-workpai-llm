import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Box, Loader2 } from 'lucide-react';

interface WorkspaceModalProps {
  isOpen: boolean;
  title: string;
  initialTitle: string;
  initialDescription: string;
  confirmLabel?: string;
  onConfirm: (title: string, description: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const WorkspaceModal: React.FC<WorkspaceModalProps> = ({
  isOpen,
  title,
  initialTitle,
  initialDescription,
  confirmLabel = "Save",
  onConfirm,
  onCancel,
  isLoading = false
}) => {
  const [workspaceTitle, setWorkspaceTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    if (isOpen) {
        setWorkspaceTitle(initialTitle);
        setDescription(initialDescription);
    }
  }, [isOpen, initialTitle, initialDescription]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="relative w-full max-w-md bg-charcoal-900 border border-charcoal-800 rounded-2xl shadow-2xl p-6"
          >
            <button 
              onClick={onCancel}
              className="absolute top-4 right-4 text-charcoal-500 hover:text-slate-300 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-charcoal-800 text-accent-500 shadow-inner">
                <Box size={24} />
              </div>
              
              <h3 className="text-lg font-bold text-slate-100 mb-6">{title}</h3>

              <div className="w-full space-y-4 mb-6">
                <div className="text-left">
                    <label className="block text-xs font-medium text-charcoal-400 mb-1.5 ml-1">Campaign Name</label>
                    <input
                      type="text"
                      value={workspaceTitle}
                      onChange={(e) => setWorkspaceTitle(e.target.value)}
                      maxLength={100}
                      className="w-full px-3 py-2 bg-charcoal-950 border border-charcoal-700 rounded-lg text-slate-200 text-sm focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all placeholder-charcoal-600"
                      placeholder="e.g. Marketing Q1"
                      autoFocus
                    />
                </div>
                <div className="text-left">
                    <label className="block text-xs font-medium text-charcoal-400 mb-1.5 ml-1">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      maxLength={225}
                      className="w-full px-3 py-2 bg-charcoal-950 border border-charcoal-700 rounded-lg text-slate-200 text-sm focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all placeholder-charcoal-600 resize-none"
                      placeholder="Briefly describe the purpose of this campaign..."
                    />
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={onCancel}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-charcoal-700 text-charcoal-300 hover:bg-charcoal-800 hover:text-white transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onConfirm(workspaceTitle, description)}
                  disabled={!workspaceTitle.trim() || isLoading}
                  className="flex-1 py-2.5 px-4 rounded-xl text-white shadow-lg bg-accent-600 hover:bg-accent-500 shadow-accent-900/20 disabled:bg-charcoal-700 disabled:text-charcoal-500 disabled:shadow-none transition-all text-sm font-medium flex items-center justify-center gap-2"
                >
                  {isLoading && <Loader2 size={16} className="animate-spin" />}
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};