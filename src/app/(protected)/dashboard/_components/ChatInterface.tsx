import React, { useRef, useEffect, useState } from 'react';
import { Message, Role, ExportFormat } from '@/shared/types/types';
import { MarkdownRenderer } from './MarkdownRenderer';
import { 
  User, 
  Bot, 
  AlertCircle, 
  FileText, 
  Sparkles, 
  Wand2, 
  FileSpreadsheet, 
  Presentation, 
  Image as ImageIcon, 
  Music, 
  Video, 
  File,
  Check,
  Loader2,
  X,
  StickyNote
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatInterfaceProps {
  messages: Message[];
  isStreaming: boolean;
  streamingContent: string;
  onGenerateDocument: (id: string, format: ExportFormat) => Promise<void>;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  messages, 
  isStreaming, 
  streamingContent,
  onGenerateDocument
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [activeExportId, setActiveExportId] = useState<string | null>(null);
  const [convertingId, setConvertingId] = useState<string | null>(null);
  const [conversionSuccessId, setConversionSuccessId] = useState<string | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent, isStreaming]);

  const handleGenerate = async (id: string, format: ExportFormat) => {
    setActiveExportId(null);
    setConvertingId(id);

    // Call parent handler
    await onGenerateDocument(id, format);

    setConvertingId(null);
    setConversionSuccessId(id);
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setConversionSuccessId(null);
    }, 3000);
  };

  const exportOptions: { id: ExportFormat; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'pdf', label: 'PDF', icon: <FileText size={14} />, color: 'text-red-500' },
    { id: 'docx', label: 'Docx', icon: <File size={14} />, color: 'text-blue-600' },
    { id: 'slides', label: 'Slides', icon: <Presentation size={14} />, color: 'text-orange-500' },
    { id: 'sheets', label: 'Sheets', icon: <FileSpreadsheet size={14} />, color: 'text-green-600' },
    { id: 'image', label: 'Image', icon: <ImageIcon size={14} />, color: 'text-purple-500' },
    { id: 'audio', label: 'Audio', icon: <Music size={14} />, color: 'text-pink-500' },
    { id: 'video', label: 'Video', icon: <Video size={14} />, color: 'text-sky-500' },
    { id: 'notes', label: 'Notes', icon: <StickyNote size={14} />, color: 'text-amber-500' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 bg-gray-50 dark:bg-charcoal-950 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-charcoal-800 transition-colors duration-200">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-charcoal-500 dark:text-charcoal-500">
          <div className="w-16 h-16 rounded-2xl bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 flex items-center justify-center mb-6 shadow-xl">
             <Sparkles size={32} className="text-accent-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">WorkPai Workspace</h2>
          <p className="text-charcoal-500 dark:text-charcoal-400 max-w-md text-center">
            Ready to assist. Upload documents to the context panel or start typing to interact with your local LLM.
          </p>
        </div>
      )}

      {messages.map((msg, index) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          key={msg.id}
          className={`flex w-full ${msg.role === Role.USER ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`flex max-w-[95%] md:max-w-[85%] lg:max-w-[75%] gap-4 ${msg.role === Role.USER ? 'flex-row-reverse' : 'flex-row'}`}>
            
            {/* Avatar */}
            <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border shadow-sm ${
              msg.role === Role.USER 
                ? 'bg-white dark:bg-charcoal-800 border-gray-200 dark:border-charcoal-700 text-slate-600 dark:text-slate-300' 
                : 'bg-accent-50 dark:bg-accent-600/10 border-accent-200 dark:border-accent-500/20 text-accent-600 dark:text-accent-400'
            }`}>
              {msg.role === Role.USER ? <User size={18} /> : <Bot size={18} />}
            </div>

            {/* Content Bubble Wrapper */}
            <div className={`flex flex-col gap-2 ${msg.role === Role.USER ? 'items-end' : 'items-start'} min-w-0`}>
              
              {/* Attachments */}
              {msg.attachments && msg.attachments.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {msg.attachments.map((att, idx) => (
                    <div key={idx} className="relative group overflow-hidden rounded-lg border border-gray-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-900">
                      {att.mimeType.startsWith('image/') ? (
                        <img 
                          src={`data:${att.mimeType};base64,${att.data}`} 
                          alt="attachment" 
                          className="h-32 w-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
                        />
                      ) : (
                        <div className="flex items-center gap-3 p-3">
                          <FileText size={20} className="text-accent-500 dark:text-accent-400" />
                          <span className="text-xs text-slate-700 dark:text-slate-300 truncate max-w-[140px]">{att.name || 'File'}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Text Message Bubble */}
              <div className={`relative px-6 py-4 shadow-sm text-sm md:text-base leading-relaxed group/bubble ${
                msg.role === Role.USER
                  ? 'bg-white dark:bg-transparent border border-gray-200 dark:border-charcoal-700 text-slate-800 dark:text-slate-200 rounded-2xl rounded-tr-sm'
                  : 'bg-white dark:bg-charcoal-900/80 border border-gray-200 dark:border-charcoal-800/50 text-slate-800 dark:text-slate-200 rounded-2xl rounded-tl-sm backdrop-blur-sm'
              }`}>
                {msg.isError ? (
                  <div className="flex items-center gap-2 text-red-500 dark:text-red-400">
                    <AlertCircle size={16} />
                    <span>Error: {msg.text}</span>
                  </div>
                ) : (
                  msg.role === Role.USER ? (
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  ) : (
                    <MarkdownRenderer content={msg.text} />
                  )
                )}

                {/* Generation Toolbar for AI Messages */}
                {msg.role === Role.MODEL && !msg.isError && (
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-charcoal-800 flex flex-wrap gap-2 items-center">
                    
                    {/* Trigger Button */}
                    <button 
                      onClick={() => setActiveExportId(activeExportId === msg.id ? null : msg.id)}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-all ${
                         activeExportId === msg.id 
                         ? 'bg-accent-50 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400' 
                         : 'text-charcoal-400 hover:text-accent-500 hover:bg-gray-50 dark:hover:bg-charcoal-800'
                      }`}
                    >
                      <Wand2 size={14} />
                      <span>Generate Document</span>
                    </button>

                    {/* Status: Converting */}
                    {convertingId === msg.id && (
                      <span className="flex items-center gap-1.5 text-xs text-accent-500 animate-pulse px-2">
                        <Loader2 size={12} className="animate-spin" />
                        Generating...
                      </span>
                    )}

                    {/* Status: Success */}
                    {conversionSuccessId === msg.id && (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 px-2 font-medium"
                      >
                        <Check size={12} />
                        Saved to Generated Contents
                      </motion.span>
                    )}

                    {/* Export Options Menu */}
                    <AnimatePresence>
                      {activeExportId === msg.id && (
                        <motion.div
                          initial={{ opacity: 0, y: -5, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: -5, height: 0 }}
                          className="w-full overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-2 p-2 mt-1 bg-gray-50 dark:bg-charcoal-950/50 rounded-lg border border-gray-200 dark:border-charcoal-800">
                             {exportOptions.map((opt) => (
                               <button
                                 key={opt.id}
                                 onClick={() => handleGenerate(msg.id, opt.id)}
                                 className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-charcoal-800 border border-gray-200 dark:border-charcoal-700 rounded-md hover:border-accent-400 dark:hover:border-accent-500 hover:shadow-sm transition-all text-xs text-charcoal-600 dark:text-charcoal-300"
                               >
                                  <span className={opt.color}>{opt.icon}</span>
                                  <span>{opt.label}</span>
                               </button>
                             ))}
                             <button 
                               onClick={() => setActiveExportId(null)}
                               className="ml-auto p-1.5 text-charcoal-400 hover:text-slate-600 dark:hover:text-slate-300"
                             >
                               <X size={14} />
                             </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
              
              {/* Timestamp */}
              <span className="text-[10px] text-charcoal-400 dark:text-charcoal-500 px-1 font-mono">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Streaming Pending Message */}
      {isStreaming && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex w-full justify-start"
        >
           <div className="flex max-w-[95%] md:max-w-[85%] lg:max-w-[75%] gap-4 flex-row">
            <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-accent-50 dark:bg-accent-600/10 border border-accent-200 dark:border-accent-500/20 text-accent-600 dark:text-accent-400 shadow-sm animate-pulse">
              <Bot size={18} />
            </div>
            <div className="flex flex-col gap-2 items-start w-full">
              <div className="relative px-6 py-4 rounded-2xl rounded-tl-sm bg-white dark:bg-charcoal-900/80 border border-gray-200 dark:border-charcoal-800/50 text-slate-800 dark:text-slate-200 shadow-sm w-full min-h-[60px]">
                {streamingContent ? (
                  <MarkdownRenderer content={streamingContent} />
                ) : (
                   <div className="flex space-x-1.5 h-6 items-center">
                    <div className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                   </div>
                )}
              </div>
            </div>
           </div>
        </motion.div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};
