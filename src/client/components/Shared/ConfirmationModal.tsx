import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Loader2 } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
  validationString?: string; // If provided, user must type this to enable confirm
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDanger = false,
  validationString,
  onConfirm,
  onCancel,
  isLoading = false
}) => {
  const [inputValue, setInputValue] = useState('');

  // Reset input when modal opens
  useEffect(() => {
    if (isOpen) {
      setInputValue('');
    }
  }, [isOpen]);

  const isConfirmDisabled = validationString ? inputValue !== validationString : false;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="relative w-full max-w-sm bg-charcoal-900 border border-charcoal-800 rounded-2xl shadow-2xl p-6"
          >
            <button 
              onClick={onCancel}
              className="absolute top-4 right-4 text-charcoal-500 hover:text-slate-300 transition-colors"
            >
              <X size={20} />
            </button>

            {isLoading && (
              <div className="absolute inset-0 z-10 bg-charcoal-900/50 backdrop-blur-[1px] flex items-center justify-center rounded-2xl">
                  <Loader2 className="w-8 h-8 text-accent-500 animate-spin" />
              </div>
            )}


            <div className="flex flex-col items-center text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                isDanger ? 'bg-danger-500/10 text-danger-500' : 'bg-accent-500/10 text-accent-500'
              }`}>
                <AlertTriangle size={24} />
              </div>
              
              <h3 className="text-lg font-bold text-slate-100 mb-2">{title}</h3>
              <p className="text-sm text-charcoal-400 mb-6">{message}</p>

              {validationString && (
                <div className="w-full mb-6 text-left">
                  <label className="block text-xs font-medium text-charcoal-400 mb-1.5 ml-1">
                    Type <span className="text-slate-200 font-bold">"{validationString}"</span> to confirm:
                  </label>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full px-3 py-2 bg-charcoal-950 border border-charcoal-700 rounded-lg text-slate-200 text-sm focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all placeholder-charcoal-600"
                    placeholder={validationString}
                    autoFocus
                  />
                </div>
              )}

              <div className="flex gap-3 w-full">
                <button
                  onClick={onCancel}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-charcoal-700 text-charcoal-300 hover:bg-charcoal-800 hover:text-white transition-colors text-sm font-medium"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isConfirmDisabled || isLoading}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-white shadow-lg transition-all text-sm font-medium flex items-center justify-center gap-2 ${
                    isDanger 
                      ? 'bg-danger-600 hover:bg-danger-500 shadow-danger-900/20 disabled:bg-charcoal-700 disabled:text-charcoal-500 disabled:shadow-none' 
                      : 'bg-accent-600 hover:bg-accent-500 shadow-accent-900/20 disabled:bg-charcoal-700 disabled:text-charcoal-500 disabled:shadow-none'
                  }`}
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