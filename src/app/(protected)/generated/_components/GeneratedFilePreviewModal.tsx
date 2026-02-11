import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Calendar, HardDrive, Download } from 'lucide-react';
import { GeneratedFile } from '../../../../types/types';

interface GeneratedFilePreviewModalProps {
  file: GeneratedFile | null;
  onClose: () => void;
  onDownload: (file: GeneratedFile) => void;
}

export const GeneratedFilePreviewModal: React.FC<GeneratedFilePreviewModalProps> = ({ file, onClose, onDownload }) => {
  if (!file) return null;

  return (
    <AnimatePresence>
      {file && (
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
            className="relative w-full max-w-3xl h-[80vh] bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-colors duration-200"
          >
            {/* Header */}
            <div className="p-5 border-b border-gray-200 dark:border-charcoal-800 flex items-center justify-between bg-gray-50 dark:bg-charcoal-900">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-accent-100 dark:bg-accent-900/20 rounded-lg text-accent-600 dark:text-accent-500">
                    <FileText size={20} />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 max-w-md truncate" title={file.name}>{file.name}</h3>
                    <p className="text-xs text-charcoal-500 dark:text-charcoal-400 uppercase">{file.type} Document</p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <button 
                   onClick={() => onDownload(file)}
                   className="p-2 text-accent-600 dark:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/20 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                 >
                    <Download size={18} />
                    <span className="hidden sm:inline">Download</span>
                 </button>
                 <button 
                   onClick={onClose}
                   className="p-2 text-charcoal-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-gray-200 dark:hover:bg-charcoal-800 rounded-lg transition-colors"
                 >
                   <X size={20} />
                 </button>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Main Content */}
                <div className="flex-1 p-8 overflow-y-auto bg-white dark:bg-charcoal-950">
                    <div className="max-w-2xl mx-auto">
                        <div className="font-mono text-xs text-charcoal-400 mb-4 pb-2 border-b border-gray-100 dark:border-charcoal-800">Preview Mode</div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">{file.name.split('.')[0].replace(/_/g, ' ')}</h1>
                        
                        <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                            {file.snippet ? (
                                <>
                                    <p className="font-medium text-slate-800 dark:text-slate-200">Summary Snippet:</p>
                                    <p className="bg-gray-50 dark:bg-charcoal-900 p-4 rounded-lg border-l-4 border-accent-500 mb-6 italic">
                                        "{file.snippet}"
                                    </p>
                                </>
                            ) : null}
                            
                            <p>
                                This is a simulated preview of the generated document content. 
                                In a real application, this area would render the actual PDF, Word document, 
                                or Slide deck using a specialized viewer.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <h3>Key Findings</h3>
                            <ul>
                                <li>Analysis point one regarding the data.</li>
                                <li>Secondary observation from the model.</li>
                                <li>Conclusion based on the context provided.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="w-64 border-l border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 p-6 space-y-6 overflow-y-auto hidden md:block">
                    <div>
                        <h4 className="text-xs font-bold text-charcoal-500 uppercase tracking-wider mb-4">File Details</h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Calendar size={16} className="text-charcoal-400 mt-0.5" />
                                <div>
                                    <span className="block text-xs text-charcoal-500 dark:text-charcoal-400">Created</span>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{new Date(file.dateCreated).toLocaleDateString()}</span>
                                    <span className="text-xs text-charcoal-400 block">{new Date(file.dateCreated).toLocaleTimeString()}</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <HardDrive size={16} className="text-charcoal-400 mt-0.5" />
                                <div>
                                    <span className="block text-xs text-charcoal-500 dark:text-charcoal-400">Size</span>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{(file.size / 1024).toFixed(1)} KB</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};