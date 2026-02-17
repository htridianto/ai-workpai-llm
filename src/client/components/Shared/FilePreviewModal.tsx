
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Database, Link as LinkIcon, Calendar, MessageCircle, Table, Image, ExternalLink } from 'lucide-react';
import { FileContext } from '@/shared/types/types';

interface FilePreviewModalProps {
  file: FileContext | null;
  onClose: () => void;
}

export const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ file, onClose }) => {
  if (!file) return null;

  const docData = file.meta?.document || {};

  const renderContent = () => {
    switch (file.type) {
        case 'database':
            return (
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400">
                        <Database size={18} />
                        <span className="font-semibold">Schema Preview</span>
                    </div>
                    <div className="overflow-x-auto border border-gray-200 dark:border-charcoal-700 rounded-lg">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 dark:bg-charcoal-800 text-charcoal-500 font-semibold border-b border-gray-200 dark:border-charcoal-700">
                                <tr>
                                    <th className="px-4 py-3">ID</th>
                                    <th className="px-4 py-3">Vector_Embedding (768)</th>
                                    <th className="px-4 py-3">Content_Chunk</th>
                                    <th className="px-4 py-3">Metadata</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-charcoal-800 bg-white dark:bg-charcoal-900">
                                {[1, 2, 3, 4, 5].map(row => (
                                    <tr key={row} className="hover:bg-gray-50 dark:hover:bg-charcoal-800/50">
                                        <td className="px-4 py-3 font-mono text-xs">{row}</td>
                                        <td className="px-4 py-3 font-mono text-xs text-charcoal-400">[0.021, -0.154, ...]</td>
                                        <td className="px-4 py-3 text-slate-700 dark:text-slate-300 max-w-xs truncate">
                                            Sample content extracted from database row...
                                        </td>
                                        <td className="px-4 py-3 font-mono text-xs text-blue-500">{`{ source: "table_${row}" }`}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );

        case 'link':
            return (
                <div className="p-6">
                    <div className="bg-white dark:bg-charcoal-800 border border-gray-200 dark:border-charcoal-700 rounded-xl p-4 mb-6 flex gap-4">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-charcoal-700 rounded-lg flex items-center justify-center shrink-0">
                            <Image size={32} className="text-charcoal-400" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-lg text-slate-800 dark:text-white mb-1">Website Title extracted from Meta</h4>
                            <a href="#" className="text-sm text-blue-500 hover:underline flex items-center gap-1 mb-2">
                                {file.name} <ExternalLink size={12} />
                            </a>
                            <p className="text-sm text-charcoal-500 line-clamp-2">
                                Description metadata scraped from the target URL. This content provides context to the LLM regarding the page content.
                            </p>
                        </div>
                    </div>
                    <h5 className="font-semibold text-sm text-charcoal-500 uppercase tracking-wider mb-3">Scraped Segments</h5>
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="p-3 bg-gray-50 dark:bg-charcoal-900/50 border border-gray-100 dark:border-charcoal-800 rounded-lg">
                                <div className="text-xs font-mono text-charcoal-400 mb-1">Segment #{i}</div>
                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scraped content usually appears in chunks like this to fit context windows.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case 'whatsapp':
            return (
                <div className="bg-gray-100 dark:bg-[#0b141a] min-h-full flex flex-col">
                    <div className="bg-[#00a884] dark:bg-[#202c33] p-4 text-white flex items-center gap-3 shadow-md">
                        <div className="w-10 h-10 bg-gray-300 rounded-full" />
                        <div>
                            <div className="font-semibold">{file.name.split(':')[1] || 'Group Chat'}</div>
                            <div className="text-xs opacity-80">Online</div>
                        </div>
                    </div>
                    <div className="p-4 space-y-4 flex-1 overflow-y-auto bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d93612ebad.png')] dark:bg-opacity-10 bg-repeat bg-opacity-5">
                        <div className="flex justify-center">
                            <span className="bg-yellow-100 dark:bg-[#1f2c34] text-charcoal-600 dark:text-[#8696a0] text-xs px-3 py-1.5 rounded-lg shadow-sm">
                                Messages and calls are end-to-end encrypted.
                            </span>
                        </div>
                        
                        <div className="flex justify-start">
                            <div className="bg-white dark:bg-[#202c33] p-2.5 rounded-lg rounded-tl-none shadow-sm max-w-[80%]">
                                <p className="text-sm text-slate-800 dark:text-[#e9edef]">System: Imported last 500 messages for context embedding.</p>
                                <span className="text-[10px] text-charcoal-400 block text-right mt-1">10:00 AM</span>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <div className="bg-[#d9fdd3] dark:bg-[#005c4b] p-2.5 rounded-lg rounded-tr-none shadow-sm max-w-[80%]">
                                <p className="text-sm text-slate-900 dark:text-[#e9edef]">This is a sample message from the group history.</p>
                                <span className="text-[10px] text-[#59936e] dark:text-[#8696a0] block text-right mt-1">10:02 AM</span>
                            </div>
                        </div>
                         <div className="flex justify-start">
                            <div className="bg-white dark:bg-[#202c33] p-2.5 rounded-lg rounded-tl-none shadow-sm max-w-[80%]">
                                <p className="text-sm text-slate-800 dark:text-[#e9edef]">Another participant response that is now part of your knowledge base.</p>
                                <span className="text-[10px] text-charcoal-400 block text-right mt-1">10:05 AM</span>
                            </div>
                        </div>
                    </div>
                </div>
            );

        default:
            // Default File view
            return (
                <div className="flex-1 p-6 overflow-y-auto bg-white dark:bg-charcoal-950 font-mono text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    <pre className="whitespace-pre-wrap font-mono">
{`
Title: ${docData?.title}

Location: ${docData?.location}

Name: ${docData?.name}

[Document Start]

${docData?.pageContent || 'No content available'}

[Document End]`}
                    </pre>
                </div>
            );
    }
  };

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
            className="relative w-full max-w-4xl h-[80vh] bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-colors duration-200"
          >
            {/* Header */}
            <div className="p-5 border-b border-gray-200 dark:border-charcoal-800 flex items-center justify-between bg-gray-50 dark:bg-charcoal-900 shrink-0">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-accent-100 dark:bg-accent-900/20 rounded-lg text-accent-600 dark:text-accent-500">
                    {file.type === 'link' ? <LinkIcon size={20} /> : 
                     file.type === 'database' ? <Database size={20} /> :
                     file.type === 'whatsapp' ? <MessageCircle size={20} /> :
                     <FileText size={20} />}
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{file.name}</h3>
                    <p className="text-xs text-charcoal-500 dark:text-charcoal-400 capitalize">{file.type} Source • Indexed Content</p>
                 </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-charcoal-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-gray-200 dark:hover:bg-charcoal-800 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Main Content Render Area */}
                <div className="flex-1 overflow-y-auto relative">
                    {renderContent()}
                </div>

                {/* Sidebar Stats */}
                <div className="w-[1/3] border-l border-gray-200 dark:border-charcoal-800 bg-gray-50 dark:bg-charcoal-900 p-6 space-y-6 overflow-y-auto hidden md:block shrink-0">
                    <div>
                        <h4 className="text-xs font-bold text-charcoal-500 uppercase tracking-wider mb-4">Metadata</h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-charcoal-500 dark:text-charcoal-400 flex items-center gap-2">
                                    <Database size={14} /> Tokens
                                </span>
                                <span className="font-mono text-slate-800 dark:text-slate-200">{docData.token_count_estimate?.toLocaleString() || 'N/A'}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-charcoal-500 dark:text-charcoal-400 flex items-center gap-2">
                                    <FileText size={14} /> Words
                                </span>
                                <span className="font-mono text-slate-800 dark:text-slate-200">{docData.wordCount?.toLocaleString() || 'N/A'}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-charcoal-500 dark:text-charcoal-400 flex items-center gap-2">
                                    <ExternalLink size={14} /> Source
                                </span>
                                <span className="font-mono text-slate-800 dark:text-slate-200 truncate max-w-[120px]" title={docData.chunkSource}>{docData.chunkSource || 'User Upload'}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-charcoal-500 dark:text-charcoal-400 flex items-center gap-2">
                                    <Calendar size={14} /> Uploaded
                                </span>
                                <span className="font-mono text-slate-800 dark:text-slate-200">{new Date(file.dateCreated).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                            </div>
                        </div>
                    </div>

                    {docData.docAuthor && docData.docAuthor !== 'Unknown' && (
                        <div>
                            <h4 className="text-xs font-bold text-charcoal-500 uppercase tracking-wider mb-2">Author</h4>
                            <div className="text-sm text-slate-800 dark:text-slate-200 font-medium">{docData.docAuthor}</div>
                        </div>
                    )}

                    {docData.description && docData.description !== 'Unknown' && (
                        <div>
                            <h4 className="text-xs font-bold text-charcoal-500 uppercase tracking-wider mb-2">Description</h4>
                            <p className="text-xs text-charcoal-500 dark:text-charcoal-400 leading-relaxed">{docData.description}</p>
                        </div>
                    )}

                    <div className="p-3 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <div className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">Status: Indexed</div>
                        <p className="text-[10px] text-green-600 dark:text-green-500/80">
                            This document is fully vectorised and ready for retrieval.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-charcoal-500 uppercase tracking-wider mb-2">Chunk Preview</h4>
                        <div className="text-[10px] text-charcoal-400 italic">
                            First {docData.token_count_estimate?.toLocaleString() || 'N/A'} tokens vector representation ID:
                        </div>
                        <div className="mt-2 text-[10px] font-mono text-charcoal-500 bg-gray-200 dark:bg-charcoal-950 p-2 rounded break-all">
                            {docData.id || 'N/A'}
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
