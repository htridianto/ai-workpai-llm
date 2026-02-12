
import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string | null;
  type?: ToastType;
  subMessage?: string;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', subMessage, onClose, duration = 4000 }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 0 }}
          className="fixed top-24 right-6 z-50 flex flex-col gap-1 p-4 rounded-xl shadow-2xl border backdrop-blur-xl transition-colors duration-200 bg-white/90 dark:bg-charcoal-900/95 border-gray-200 dark:border-charcoal-700 min-w-[320px] max-w-md"
        >
          <div className="flex items-start gap-3">
            <div className={`mt-0.5 shrink-0 ${
              type === 'success' ? 'text-green-500' : 
              type === 'error' ? 'text-red-500' : 'text-accent-500'
            }`}>
              {type === 'success' && <CheckCircle size={20} />}
              {type === 'error' && <AlertCircle size={20} />}
              {type === 'info' && <Info size={20} />}
            </div>
            <div className="flex-1 mr-2">
               <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{message}</p>
               {subMessage && (
                 <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1 leading-relaxed">{subMessage}</p>
               )}
            </div>
            <button onClick={onClose} className="p-1 -mt-1 -mr-2 hover:bg-gray-100 dark:hover:bg-charcoal-800 rounded-lg text-charcoal-400 transition-colors">
              <X size={16} />
            </button>
          </div>
          {/* Progress bar */}
          <motion.div 
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            className={`h-0.5 mt-2 rounded-full ${
               type === 'success' ? 'bg-green-500/50' : 
               type === 'error' ? 'bg-red-500/50' : 'bg-accent-500/50'
            }`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
