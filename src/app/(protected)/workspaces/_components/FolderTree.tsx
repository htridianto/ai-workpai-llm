
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, Home } from 'lucide-react';
import { Folder as FolderType } from '../../../../types';

interface FolderTreeProps {
  folders: FolderType[];
  currentFolderId: string | null;
  onSelectFolder: (id: string | null) => void;
  className?: string;
}

interface TreeNode extends FolderType {
  children: TreeNode[];
}

export const FolderTree: React.FC<FolderTreeProps> = ({ 
  folders, 
  currentFolderId, 
  onSelectFolder,
  className = ''
}) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  // Auto-expand path to current folder
  useEffect(() => {
    if (currentFolderId) {
       const path = new Set(expanded);
       let curr = folders.find(f => f.id === currentFolderId);
       while (curr && curr.parentId) {
           path.add(curr.parentId);
           curr = folders.find(f => f.id === curr?.parentId);
       }
       setExpanded(path);
    }
  }, [currentFolderId, folders]);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  const buildTree = (items: FolderType[]): TreeNode[] => {
    const map = new Map<string, TreeNode>();
    const roots: TreeNode[] = [];

    // Initialize map
    items.forEach(item => {
      map.set(item.id, { ...item, children: [] });
    });

    // Build hierarchy
    items.forEach(item => {
      const node = map.get(item.id)!;
      if (item.parentId && map.has(item.parentId)) {
        map.get(item.parentId)!.children.push(node);
      } else {
        roots.push(node); // Parent missing or undefined -> root
      }
    });

    return roots;
  };

  const tree = buildTree(folders);

  const renderNode = (node: TreeNode, depth: number) => {
    const isExpanded = expanded.has(node.id);
    const isSelected = currentFolderId === node.id;
    const hasChildren = node.children.length > 0;

    return (
      <div key={node.id}>
        <div 
          className={`flex items-center gap-1.5 py-1.5 px-2 rounded-lg cursor-pointer transition-colors text-sm mb-0.5 ${
            isSelected 
              ? 'bg-accent-100 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400 font-medium' 
              : 'text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-charcoal-800'
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => onSelectFolder(node.id)}
        >
          <button 
            onClick={(e) => toggleExpand(node.id, e)}
            className={`p-0.5 rounded hover:bg-black/5 dark:hover:bg-white/10 ${hasChildren ? 'opacity-100' : 'opacity-0 disabled:cursor-default'}`}
            disabled={!hasChildren}
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
          
          {isSelected ? (
             <FolderOpen size={16} className="text-accent-500 shrink-0" />
          ) : (
             <Folder size={16} className="text-charcoal-400 shrink-0" />
          )}
          
          <span className="truncate">{node.name}</span>
        </div>
        
        {isExpanded && hasChildren && (
          <div>
            {node.children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`py-2 ${className}`}>
      <div 
        className={`flex items-center gap-2 py-1.5 px-2 mb-1 rounded-lg cursor-pointer transition-colors text-sm ${
            currentFolderId === null
              ? 'bg-accent-100 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400 font-medium' 
              : 'text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-charcoal-800'
        }`}
        onClick={() => onSelectFolder(null)}
      >
         <div className="w-5 flex justify-center">
            <Home size={16} className={currentFolderId === null ? "text-accent-500" : "text-charcoal-400"} />
         </div>
         <span>Root</span>
      </div>
      
      <div className="space-y-0.5">
         {tree.length > 0 ? (
            tree.map(node => renderNode(node, 0))
         ) : (
            <div className="text-[10px] text-charcoal-400 pl-9 py-2 italic">
               No folders yet
            </div>
         )}
      </div>
    </div>
  );
};
