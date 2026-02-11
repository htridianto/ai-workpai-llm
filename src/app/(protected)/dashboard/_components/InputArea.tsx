import React, { useState, useRef, ChangeEvent } from 'react';
import { Send, Paperclip, X, Image as ImageIcon, CornerDownLeft } from 'lucide-react';
import { Attachment } from '../../../../types/types';

interface InputAreaProps {
  onSend: (text: string, attachments: Attachment[]) => void;
  disabled: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSend, disabled }) => {
  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    handleResize();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Ctrl+Enter or Cmd+Enter
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
    // Default 'Enter' behavior allows new line (no preventDefault)
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          const base64String = (event.target.result as string).split(',')[1];
          const newAttachment: Attachment = {
            mimeType: file.type,
            data: base64String,
            name: file.name
          };
          setAttachments([...attachments, newAttachment]);
        }
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if ((!text.trim() && attachments.length === 0) || disabled) return;
    onSend(text, attachments);
    setText('');
    setAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  return (
    <div className="p-6 bg-white/80 dark:bg-charcoal-950/50 backdrop-blur-sm relative z-10 transition-colors duration-200">
      <div className="max-w-4xl mx-auto flex flex-col gap-3">
        
        {/* Attachment Previews */}
        {attachments.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-charcoal-800">
            {attachments.map((att, idx) => (
              <div key={idx} className="relative group bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 rounded-lg p-2.5 flex items-center gap-3 pr-8 shrink-0 shadow-sm">
                {att.mimeType.startsWith('image/') ? (
                   <div className="h-10 w-10 rounded bg-gray-100 dark:bg-charcoal-950 overflow-hidden border border-gray-200 dark:border-charcoal-800">
                      <img src={`data:${att.mimeType};base64,${att.data}`} className="h-full w-full object-cover" alt="preview" />
                   </div>
                ) : (
                   <Paperclip size={18} className="text-charcoal-400" />
                )}
                <span className="text-xs text-slate-600 dark:text-slate-300 max-w-[120px] truncate">{att.name}</span>
                <button 
                  onClick={() => removeAttachment(idx)}
                  className="absolute top-1 right-1 p-1 text-charcoal-500 hover:text-red-400 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="relative group">
          {/* Removed focus-within border/ring classes */}
          <div className="flex items-end gap-2 bg-gray-100 dark:bg-charcoal-900 p-2.5 rounded-xl border border-gray-200 dark:border-charcoal-800 shadow-inner transition-all">
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 text-charcoal-500 dark:text-charcoal-400 hover:text-accent-500 dark:hover:text-accent-400 hover:bg-white dark:hover:bg-charcoal-800 rounded-lg transition-colors"
              title="Attach file"
            >
              <Paperclip size={20} />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileSelect}
              accept="image/*,text/*,application/pdf"
            />

            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Send a message..."
              className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none resize-none max-h-[200px] py-2.5 text-slate-800 dark:text-slate-200 placeholder-charcoal-400 dark:placeholder-charcoal-500 leading-relaxed min-h-[44px]"
              rows={1}
              disabled={disabled}
            />
            
            <button 
              onClick={handleSubmit}
              disabled={(!text.trim() && attachments.length === 0) || disabled}
              className={`p-2.5 rounded-lg transition-all duration-200 flex items-center justify-center ${
                (!text.trim() && attachments.length === 0) || disabled
                  ? 'bg-gray-200 dark:bg-charcoal-800 text-charcoal-400 dark:text-charcoal-600 cursor-not-allowed'
                  : 'bg-accent-600 text-white shadow-lg shadow-accent-900/20 hover:bg-accent-500 hover:scale-105 active:scale-95'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-[10px] text-charcoal-500 px-1">
          <span>Gemini Pro Preview</span>
          <span className="flex items-center gap-1"><CornerDownLeft size={10} /> Ctrl + Enter to send</span>
        </div>
      </div>
    </div>
  );
};
