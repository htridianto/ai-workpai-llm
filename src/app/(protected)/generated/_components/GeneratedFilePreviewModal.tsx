import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Calendar, HardDrive, Download, ImageIcon, FileIcon } from 'lucide-react';
import { GeneratedFile } from '@/shared/types/types';

interface GeneratedFilePreviewModalProps {
  file: GeneratedFile | null;
  onClose: () => void;
  onDownload: (file: GeneratedFile) => void;
}

export const GeneratedFilePreviewModal: React.FC<GeneratedFilePreviewModalProps> = ({ file, onClose, onDownload }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (file) {
      fetchPreviewUrl();
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const fetchPreviewUrl = async () => {
    if (!file) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/restapi/generated/files/url?id=${file.id}`);
      const data = await res.json();
      if (data.url) {
        setPreviewUrl(data.url);
      }
    } catch (error) {
      console.error("Failed to fetch preview URL", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!file) return null;

  const renderContent = () => {
    if (!file) return null;
    const extension = file.name.split('.').pop()?.toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension || '');
    const isPdf = extension === 'pdf';
    
    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-charcoal-950">
                <div className="w-8 h-8 border-4 border-charcoal-200 dark:border-charcoal-800 border-t-accent-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (isImage && previewUrl) {
       return (
         <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-gray-100 dark:bg-charcoal-950 overflow-hidden">
            <img 
                src={previewUrl} 
                alt={file.name} 
                className="max-w-full max-h-full object-contain shadow-2xl rounded-lg border border-gray-200 dark:border-charcoal-800"
            />
         </div>
       );
    }

    if (isPdf && previewUrl) {
        return (
            <div className="flex-1 bg-gray-200 dark:bg-charcoal-950 p-0 md:p-4">
                <iframe 
                    src={`${previewUrl}#view=FitH`} 
                    className="w-full h-full md:rounded-lg border-none md:border border-gray-300 dark:border-charcoal-800 shadow-sm"
                    title={file.name}
                />
            </div>
        );
    }

    // Default: Text content if snippet exists, otherwise placeholder
    return (
        <div className="flex-1 p-6 md:p-12 overflow-y-auto bg-white dark:bg-charcoal-950">
            <div className="max-w-3xl mx-auto">
                <div className="font-mono text-[10px] text-charcoal-400 mb-6 pb-2 border-b border-gray-100 dark:border-charcoal-800 flex items-center justify-between">
                    <span>Document Preview</span>
                    <span>{file.type ? file.type.toUpperCase() : 'UNKNOWN'} File</span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2 truncate" title={file.name}>
                    {file.name.split('.')[0].replace(/_/g, ' ')}
                </h1>
                <p className="text-sm text-charcoal-500 mb-10">{file.name}</p>
                
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    {file.snippet ? (
                        <div className="bg-accent-50/50 dark:bg-accent-900/10 p-6 md:p-8 rounded-2xl border border-accent-100 dark:border-accent-900/20 mb-8">
                            <h4 className="text-accent-600 dark:text-accent-400 font-bold mb-4 flex items-center gap-2">
                                <FileText size={18} /> Content Snippet
                            </h4>
                            <p className="text-slate-700 dark:text-slate-200 italic leading-relaxed text-lg">
                                "{file.snippet}"
                            </p>
                        </div>
                    ) : null}
                    
                    <div className="mt-12 p-8 border border-dashed border-gray-200 dark:border-charcoal-800 rounded-2xl flex flex-col items-center justify-center text-center">
                         <div className="p-4 bg-gray-50 dark:bg-charcoal-900 rounded-2xl mb-4">
                            {isImage ? <ImageIcon size={32} className="text-charcoal-300" /> : <FileIcon size={32} className="text-charcoal-300" />}
                         </div>
                         <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">View Full Content</h4>
                         <p className="text-charcoal-500 text-sm max-w-xs mb-6">
                            This is a generated file. To see the complete contents and high-resolution details, please download the file.
                         </p>
                         <button 
                            onClick={() => onDownload(file)}
                            className="px-6 py-2.5 bg-accent-600 hover:bg-accent-500 text-white rounded-xl shadow-lg transition-all text-sm font-bold flex items-center gap-2"
                         >
                            <Download size={16} />
                            Download Now
                         </button>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  const extension = file.name.split('.').pop()?.toLowerCase();
  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension || '');

  return (
    <AnimatePresence>
      {file && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal-950/90 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="relative w-full max-w-5xl h-full md:h-[85vh] bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 rounded-none md:rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-colors duration-200"
          >
            {/* Header */}
            <div className="p-4 md:p-5 border-b border-gray-200 dark:border-charcoal-800 flex items-center justify-between bg-white dark:bg-charcoal-900 shrink-0 z-10">
              <div className="flex items-center gap-3">
                 <div className={`p-2 rounded-lg ${isImage ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' : 'bg-accent-100 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400'}`}>
                    {isImage ? <ImageIcon size={20} /> : <FileText size={20} />}
                 </div>
                 <div>
                    <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-100 max-w-[200px] md:max-w-md truncate" title={file.name}>{file.name}</h3>
                    <p className="text-[10px] text-charcoal-500 uppercase tracking-widest">{file.type} Document</p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <button 
                   onClick={() => onDownload(file)}
                   className="hidden sm:flex p-2 text-accent-600 dark:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/20 rounded-lg transition-colors items-center gap-2 text-sm font-bold"
                 >
                    <Download size={18} />
                    <span>Download</span>
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
                {/* Content Render Area */}
                {renderContent()}

                {/* Sidebar Info - Hidden on mobile */}
                <div className="w-72 border-l border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 p-8 space-y-8 overflow-y-auto hidden lg:block shrink-0">
                    <div>
                        <h4 className="text-[10px] font-bold text-charcoal-400 uppercase tracking-[0.2em] mb-6">Information</h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-white dark:bg-charcoal-800 rounded-lg border border-gray-100 dark:border-charcoal-700 text-charcoal-400 shadow-sm">
                                    <Calendar size={16} />
                                </div>
                                <div>
                                    <span className="block text-[10px] text-charcoal-500 uppercase font-bold tracking-wider mb-0.5">Created</span>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{new Date(file.dateCreated).toLocaleDateString()}</span>
                                    <span className="text-xs text-charcoal-400 block mt-0.5">{new Date(file.dateCreated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-white dark:bg-charcoal-800 rounded-lg border border-gray-100 dark:border-charcoal-700 text-charcoal-400 shadow-sm">
                                    <HardDrive size={16} />
                                </div>
                                <div>
                                    <span className="block text-[10px] text-charcoal-500 uppercase font-bold tracking-wider mb-0.5">File Size</span>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{(file.size / 1024).toFixed(1)} KB</span>
                                    <span className="text-xs text-charcoal-400 block mt-0.5">{file.size.toLocaleString()} bytes</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-200 dark:border-charcoal-800">
                        <h4 className="text-[10px] font-bold text-charcoal-400 uppercase tracking-[0.2em] mb-4">Sharing</h4>
                        <div className="p-4 bg-white dark:bg-charcoal-800 rounded-2xl border border-gray-100 dark:border-charcoal-700 shadow-sm">
                            <div className="flex items-center justify-between mb-3 text-xs">
                                <span className="text-charcoal-500">Status</span>
                                <span className={file.isShared ? "text-emerald-500 font-bold" : "text-charcoal-400 font-bold"}>
                                    {file.isShared ? "Public" : "Private"}
                                </span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-charcoal-700 h-1 rounded-full overflow-hidden">
                                <div className={`h-full ${file.isShared ? "bg-emerald-500" : "bg-charcoal-500"}`} style={{ width: file.isShared ? '100%' : '20%' }}></div>
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