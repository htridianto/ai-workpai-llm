import React from 'react';
import { Folder, MoreVertical, Trash2, FolderOpen } from 'lucide-react';
import { Folder as FolderType } from '../../../../types';

interface FolderRowProps {
  folder: FolderType;
  onOpen: (folder: FolderType) => void;
  onDelete: (folder: FolderType) => void;
}

export const FolderRow: React.FC<FolderRowProps> = ({ folder, onOpen, onDelete }) => {
  return (
    <div 
        className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 dark:border-charcoal-800 items-center hover:bg-gray-50 dark:hover:bg-charcoal-800/50 transition-colors last:border-0 group cursor-pointer"
        onClick={() => onOpen(folder)}
    >
        <div className="col-span-5 flex items-center gap-4 overflow-hidden">
            <div className="shrink-0 p-2 bg-accent-50 dark:bg-accent-900/20 rounded-lg text-accent-500">
                <Folder size={18} fill="currentColor" className="opacity-80" />
            </div>
            <span className="font-medium text-sm text-slate-700 dark:text-slate-200 truncate group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                {folder.name}
            </span>
        </div>
        <div className="col-span-2 text-xs text-charcoal-500">{new Date(folder.dateCreated).toLocaleDateString()}</div>
        <div className="col-span-2 text-xs text-charcoal-500">-</div>
        <div className="col-span-3 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
            <button 
                onClick={() => onOpen(folder)} 
                className="p-1.5 text-charcoal-400 hover:text-accent-500 rounded hover:bg-gray-100 dark:hover:bg-charcoal-700" 
                title="Open"
            >
                <FolderOpen size={16} />
            </button>
            <button 
                onClick={() => onDelete(folder)} 
                className="p-1.5 text-charcoal-400 hover:text-red-500 rounded hover:bg-gray-100 dark:hover:bg-charcoal-700" 
                title="Delete"
            >
                <Trash2 size={16} />
            </button>
        </div>
    </div>
  );
};