
import React, { useState, useRef, useEffect } from 'react';
import { Folder, MoreVertical, Trash2, FolderOpen } from 'lucide-react';
import { Folder as FolderType } from '../../../../types';

interface FolderCardProps {
  folder: FolderType;
  onOpen: (folder: FolderType) => void;
  onDelete: (folder: FolderType) => void;
}

export const FolderCard: React.FC<FolderCardProps> = ({ folder, onOpen, onDelete }) => {
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

  return (
    <div 
        className="group relative bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 rounded-xl hover:shadow-lg hover:border-accent-500/50 transition-all cursor-pointer flex flex-col justify-between p-4 h-32"
        onClick={() => onOpen(folder)}
    >
        <div className="flex justify-between items-start">
            <div className="p-2.5 bg-accent-50 dark:bg-accent-900/20 text-accent-500 rounded-lg">
                <Folder size={24} fill="currentColor" className="opacity-80" />
            </div>
            
            <div className="relative" ref={menuRef} onClick={(e) => e.stopPropagation()}>
                <button 
                    onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
                    className={`p-1 rounded-lg transition-all ${
                        isMenuOpen 
                        ? 'text-accent-500 bg-accent-50 dark:bg-accent-900/20 opacity-100' 
                        : 'text-charcoal-400 hover:text-charcoal-600 dark:hover:text-charcoal-200 hover:bg-gray-100 dark:hover:bg-charcoal-800 opacity-0 group-hover:opacity-100'
                    }`}
                >
                    <MoreVertical size={16} />
                </button>
                 {isMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-charcoal-800 rounded-lg shadow-xl border border-gray-200 dark:border-charcoal-700 py-1 z-20 animate-in fade-in zoom-in-95 duration-100">
                        <button onClick={(e) => { e.stopPropagation(); onOpen(folder); setIsMenuOpen(false); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-charcoal-700 text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            <FolderOpen size={14} /> Open
                        </button>
                        <div className="my-1 border-t border-gray-100 dark:border-charcoal-700"></div>
                        <button onClick={(e) => { e.stopPropagation(); onDelete(folder); setIsMenuOpen(false); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-2">
                            <Trash2 size={14} /> Delete
                        </button>
                    </div>
                 )}
            </div>
        </div>
        
        <div>
            <div className="font-medium text-sm text-slate-700 dark:text-slate-200 truncate" title={folder.name}>
                {folder.name}
            </div>
            <div className="text-[10px] text-charcoal-400 mt-1">
                {new Date(folder.dateCreated).toLocaleDateString()}
            </div>
        </div>
    </div>
  );
};
