
import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, FileText, Presentation, FileSpreadsheet, Image as ImageIcon, Music, Video, File, Star, Users } from 'lucide-react';
import { GeneratedFile, ExportFormat } from '@/shared/types/types';

interface FileCardProps {
  file: GeneratedFile;
  ownerName?: string;
  onView: (file: GeneratedFile) => void;
  onDownload: (file: GeneratedFile) => void;
  onDelete: (file: GeneratedFile) => void;
  onShare: (file: GeneratedFile) => void;
  onToggleStar: (file: GeneratedFile) => void;
}

export const FileCard: React.FC<FileCardProps> = ({ file, ownerName, onView, onDownload, onDelete, onShare, onToggleStar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const getFileIcon = (type: ExportFormat) => {
    switch(type) {
      case 'pdf': return <FileText size={48} className="text-red-500" />;
      case 'docx': return <FileText size={48} className="text-blue-600" />;
      case 'slides': return <Presentation size={48} className="text-orange-500" />;
      case 'sheets': return <FileSpreadsheet size={48} className="text-green-600" />;
      case 'image': return <ImageIcon size={48} className="text-purple-500" />;
      case 'audio': return <Music size={48} className="text-pink-500" />;
      case 'video': return <Video size={48} className="text-sky-500" />;
      default: return <File size={48} className="text-gray-400" />;
    }
  };

  return (
    <div className="group relative bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 rounded-xl hover:shadow-lg hover:border-accent-500/50 transition-all cursor-pointer flex flex-col aspect-[4/5] overflow-hidden">
        {/* Star Button */}
        <button 
            onClick={(e) => { e.stopPropagation(); onToggleStar(file); }}
            className={`absolute top-2 left-2 z-10 p-1.5 rounded-full transition-colors ${file.isStarred ? 'text-yellow-400 opacity-100' : 'text-charcoal-400 opacity-0 group-hover:opacity-100 hover:text-yellow-400 hover:bg-white dark:hover:bg-charcoal-700'}`}
        >
            <Star size={16} fill={file.isStarred ? "currentColor" : "none"} />
        </button>

        {/* Actions Menu Trigger */}
        <div className={`absolute top-2 right-2 z-10 flex gap-1 transition-opacity ${isMenuOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            <div className="relative" ref={menuRef}>
                <button 
                    onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
                    className={`p-1.5 rounded-full shadow-md transition-colors ${
                        isMenuOpen 
                        ? 'bg-accent-100 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400' 
                        : 'bg-white dark:bg-charcoal-700 text-charcoal-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                   <MoreVertical size={16} />
                </button>
                {/* Dropdown Menu */}
                {isMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-charcoal-800 rounded-lg shadow-xl border border-gray-200 dark:border-charcoal-700 py-1 z-20 animate-in fade-in zoom-in-95 duration-100">
                        <button onClick={(e) => { e.stopPropagation(); onView(file); setIsMenuOpen(false); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-charcoal-700 text-slate-700 dark:text-slate-200">Preview</button>
                        <button onClick={(e) => { e.stopPropagation(); onDownload(file); setIsMenuOpen(false); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-charcoal-700 text-slate-700 dark:text-slate-200">Download</button>
                        <button onClick={(e) => { e.stopPropagation(); onShare(file); setIsMenuOpen(false); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-charcoal-700 text-slate-700 dark:text-slate-200">Share</button>
                        <div className="my-1 border-t border-gray-100 dark:border-charcoal-700"></div>
                        <button onClick={(e) => { e.stopPropagation(); onDelete(file); setIsMenuOpen(false); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400">Delete</button>
                    </div>
                )}
            </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-charcoal-950/50 p-6 relative" onClick={() => onView(file)}>
            {getFileIcon(file.type)}
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-charcoal-800 bg-white dark:bg-charcoal-900">
            <div className="font-medium text-sm text-slate-700 dark:text-slate-200 truncate" title={file.name}>{file.name}</div>
            
            {ownerName && (
                <div className="flex items-center gap-1.5 text-[10px] text-blue-500 mt-1 mb-0.5">
                    <Users size={10} />
                    <span>Shared by {ownerName}</span>
                </div>
            )}

            <div className="text-[10px] text-charcoal-400 mt-1 flex justify-between items-center">
                <span>{(file.size / 1024).toFixed(0)} KB</span>
                <span>{new Date(file.dateCreated).toLocaleDateString()}</span>
            </div>
        </div>
    </div>
  );
};
