import React, { useState } from 'react';
import { 
  HardDrive, 
  Users, 
  Clock, 
  Star, 
  Trash2, 
  Cloud,
  ChevronDown,
  ChevronRight,
  Folder as FolderIcon
} from 'lucide-react';
import { Folder } from '@/shared/types/types';

export type GeneratedCategory = 'home' | 'shared' | 'recent' | 'starred' | 'trash';

interface GeneratedSidebarProps {
  activeCategory: GeneratedCategory;
  onSelectCategory: (category: GeneratedCategory) => void;
  storageUsed: number; // in bytes
  storageLimit: number; // in bytes
  folders?: Folder[];
  currentFolderId?: string | null;
  onSelectFolder?: (folderId: string | null) => void;
}

interface FolderTreeItemProps {
  folder: Folder;
  allFolders: Folder[];
  currentFolderId: string | null;
  onSelectFolder: (folderId: string | null) => void;
  depth: number;
}

const FolderTreeItem: React.FC<FolderTreeItemProps> = ({ folder, allFolders, currentFolderId, onSelectFolder, depth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const subFolders = allFolders.filter(f => f.parentId === folder.id && !f.isTrashed);
  const hasSubFolders = subFolders.length > 0;
  const isSelected = currentFolderId === folder.id;

  return (
    <div className="w-full">
      <div 
        className={`flex items-center gap-2 py-1.5 px-3 rounded-lg text-sm transition-colors cursor-pointer group ${
          isSelected 
          ? 'bg-accent-50 dark:bg-accent-900/10 text-accent-600 dark:text-accent-400' 
          : 'text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-charcoal-800'
        }`}
        style={{ paddingLeft: `${(depth * 12) + 12} px` }}
        onClick={() => onSelectFolder(folder.id)}
      >
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className={`p-0.5 rounded hover:bg-gray-200 dark:hover:bg-charcoal-700 transition-colors ${!hasSubFolders && 'invisible'}`}
        >
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <FolderIcon size={16} className={isSelected ? 'text-accent-500' : 'text-charcoal-400'} />
        <span className="truncate flex-1">{folder.name}</span>
      </div>
      
      {isOpen && hasSubFolders && (
        <div className="mt-0.5">
          {subFolders.map(subFolder => (
            <FolderTreeItem 
              key={subFolder.id} 
              folder={subFolder} 
              allFolders={allFolders} 
              currentFolderId={currentFolderId} 
              onSelectFolder={onSelectFolder}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const GeneratedSidebar: React.FC<GeneratedSidebarProps> = ({ 
  activeCategory, 
  onSelectCategory,
  storageUsed,
  storageLimit,
  folders = [],
  currentFolderId = null,
  onSelectFolder = () => {}
}) => {
  
  const navItems: { id: GeneratedCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'My Content', icon: <HardDrive size={18} /> },
    { id: 'shared', label: 'Shared with me', icon: <Users size={18} /> },
    { id: 'recent', label: 'Recent', icon: <Clock size={18} /> },
    { id: 'starred', label: 'Starred', icon: <Star size={18} /> },
    { id: 'trash', label: 'Trash', icon: <Trash2 size={18} /> },
  ];

  const formatSize = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(1)} GB`;
  };

  const usagePercent = Math.min((storageUsed / storageLimit) * 100, 100);

  const rootFolders = folders.filter(f => !f.parentId && !f.isTrashed);

  return (
    <div className="w-64 bg-white dark:bg-charcoal-900 border-r border-gray-200 dark:border-charcoal-800 flex flex-col h-full flex-shrink-0">
      <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
        <div className="space-y-1 mb-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectCategory(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-r-full text-sm font-medium transition-colors ${
                activeCategory === item.id
                  ? 'bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400 border-l-4 border-accent-500'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-charcoal-800 hover:text-slate-900 dark:hover:text-slate-200 border-l-4 border-transparent'
              }`}
            >
              <span className={activeCategory === item.id ? 'text-accent-500' : ''}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {activeCategory === 'home' && rootFolders.length > 0 && (
          <div className="px-4 py-2">
            <h3 className="text-[10px] font-bold text-charcoal-500 uppercase tracking-widest mb-3 opacity-60">Folders</h3>
            <div className="space-y-0.5">
              {rootFolders.map(folder => (
                <FolderTreeItem 
                  key={folder.id} 
                  folder={folder} 
                  allFolders={folders} 
                  currentFolderId={currentFolderId} 
                  onSelectFolder={onSelectFolder}
                  depth={0}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-100 dark:border-charcoal-800">
        <div className="flex items-center gap-2 mb-2 text-charcoal-500 dark:text-charcoal-400">
           <Cloud size={16} />
           <span className="text-xs font-semibold uppercase">Storage</span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 dark:bg-charcoal-700 rounded-full overflow-hidden mb-2">
           <div 
             className="h-full bg-accent-500 rounded-full" 
             style={{ width: `${usagePercent}%` }}
           ></div>
        </div>
        <div className="text-xs text-charcoal-500 dark:text-charcoal-400">
           <span className="text-slate-700 dark:text-slate-300 font-medium">{formatSize(storageUsed)}</span> of {formatSize(storageLimit)} used
        </div>
        {/* <button className="mt-3 text-xs text-accent-600 dark:text-accent-400 hover:underline font-medium">
            Get more storage
        </button> */}
      </div>
    </div>
  );
};