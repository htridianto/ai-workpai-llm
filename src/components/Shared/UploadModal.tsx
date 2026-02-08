import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, File, AlertCircle, Link as LinkIcon, Plus } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (payload: { files: File[], links: string[] }) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [activeTab, setActiveTab] = useState<'files' | 'links'>('files');
  
  // File State
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  // Link State
  const [urlInput, setUrlInput] = useState('');
  const [links, setLinks] = useState<string[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files as FileList)]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.target.files as FileList)]);
    }
  };

  const handleRemoveFile = (index: number) => {
      setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddLink = () => {
      if (urlInput && !links.includes(urlInput)) {
          setLinks(prev => [...prev, urlInput]);
          setUrlInput('');
      }
  };

  const handleRemoveLink = (index: number) => {
      setLinks(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onUpload({ files, links });
    setFiles([]);
    setLinks([]);
    setUrlInput('');
    onClose();
  };

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
            className="relative w-full max-w-lg bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 rounded-2xl shadow-2xl overflow-hidden transition-colors duration-200"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 pb-0">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Add Context</h3>
              <button 
                onClick={onClose}
                className="text-charcoal-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex px-6 mt-6 border-b border-gray-200 dark:border-charcoal-800">
                <button 
                  onClick={() => setActiveTab('files')}
                  className={`pb-3 px-1 mr-6 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'files' ? 'border-accent-500 text-accent-600 dark:text-accent-500' : 'border-transparent text-charcoal-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                    <UploadCloud size={16} />
                    Upload Files
                </button>
                <button 
                  onClick={() => setActiveTab('links')}
                  className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'links' ? 'border-accent-500 text-accent-600 dark:text-accent-500' : 'border-transparent text-charcoal-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                    <LinkIcon size={16} />
                    Website Scraping
                </button>
            </div>

            <div className="p-6">
                {activeTab === 'files' ? (
                    <>
                        <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 ${
                            isDragging 
                            ? 'border-accent-500 bg-accent-50 dark:bg-accent-900/10' 
                            : 'border-gray-300 dark:border-charcoal-700 bg-gray-50 dark:bg-charcoal-800/50 hover:border-accent-400'
                        }`}
                        >
                        <div className="w-12 h-12 bg-white dark:bg-charcoal-800 rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <UploadCloud size={24} className="text-accent-500" />
                        </div>
                        
                        <p className="text-base font-medium text-slate-700 dark:text-slate-200 mb-1">
                            Drag & Drop files here
                        </p>
                        <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mb-4">
                            or <label className="text-accent-600 dark:text-accent-400 font-semibold cursor-pointer hover:underline">
                            browse files
                            <input type="file" className="hidden" multiple onChange={handleFileChange} />
                            </label>
                        </p>

                        <div className="text-[10px] text-charcoal-400 bg-gray-100 dark:bg-charcoal-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
                            <AlertCircle size={12} />
                            <span>Max 25MB • PDF, TXT, MD</span>
                        </div>
                        </div>

                        {/* File List */}
                        {files.length > 0 && (
                        <div className="mt-4 space-y-2">
                            <p className="text-xs font-semibold text-charcoal-500 uppercase">Selected Files ({files.length})</p>
                            <div className="max-h-32 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-charcoal-300 dark:scrollbar-thumb-charcoal-700">
                            {files.map((file, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-charcoal-800 rounded border border-gray-200 dark:border-charcoal-700 group">
                                <File size={16} className="text-charcoal-500" />
                                <span className="text-xs text-slate-700 dark:text-slate-200 truncate flex-1">{file.name}</span>
                                <span className="text-[10px] text-charcoal-400 mr-2">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                <button onClick={() => handleRemoveFile(idx)} className="text-charcoal-400 hover:text-red-500">
                                    <X size={14} />
                                </button>
                                </div>
                            ))}
                            </div>
                        </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col">
                        <label className="block text-xs font-medium text-charcoal-500 dark:text-charcoal-400 mb-2">Enter Website URL</label>
                        <div className="flex gap-2 mb-3">
                            <input 
                                type="url" 
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddLink()}
                                placeholder="https://company.com/about"
                                className="flex-1 px-3 py-2 bg-gray-50 dark:bg-charcoal-950 border border-gray-300 dark:border-charcoal-700 rounded-lg text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all placeholder-charcoal-500"
                            />
                            <button 
                                onClick={handleAddLink}
                                disabled={!urlInput}
                                className="px-3 py-2 bg-charcoal-200 dark:bg-charcoal-800 hover:bg-charcoal-300 dark:hover:bg-charcoal-700 text-slate-700 dark:text-slate-200 rounded-lg disabled:opacity-50 transition-colors"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                        
                        <div className="mb-3">
                            <p className="text-xs font-semibold text-charcoal-500 uppercase mb-2">URLs to Scrape ({links.length})</p>
                            {links.length === 0 ? (
                                <div className="h-20 flex items-center justify-center border border-dashed border-gray-300 dark:border-charcoal-700 rounded-xl text-charcoal-400 text-xs">
                                    No links added yet.
                                </div>
                            ) : (
                                <div className="max-h-32 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-charcoal-300 dark:scrollbar-thumb-charcoal-700">
                                    {links.map((link, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-charcoal-800 rounded border border-gray-200 dark:border-charcoal-700">
                                            <LinkIcon size={14} className="text-blue-500" />
                                            <span className="text-xs text-slate-700 dark:text-slate-200 truncate flex-1">{link}</span>
                                            <button onClick={() => handleRemoveLink(idx)} className="text-charcoal-400 hover:text-red-500">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-lg flex gap-3">
                             <AlertCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
                             <p className="text-[10px] text-blue-700 dark:text-blue-300 leading-relaxed">
                                 The system will crawl these pages and extract text content to be embedded.
                             </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-3 p-6 pt-0 mt-2">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-charcoal-700 text-charcoal-600 dark:text-charcoal-300 hover:bg-gray-100 dark:hover:bg-charcoal-800 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={files.length === 0 && links.length === 0}
                className="flex-1 py-2.5 rounded-xl bg-accent-600 hover:bg-accent-500 text-white shadow-lg shadow-accent-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
              >
                {files.length > 0 && links.length > 0 
                    ? `Upload All (${files.length + links.length})` 
                    : files.length > 0 
                        ? `Upload Files (${files.length})` 
                        : links.length > 0 
                            ? `Scrape Links (${links.length})`
                            : 'Upload'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};