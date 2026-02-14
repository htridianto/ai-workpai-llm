
import React, { useState } from 'react';
import { 
  X, 
  FolderOpen,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { Folder as FolderType } from '@/shared/types/types';
import { FolderTree } from './FolderTree';

interface MoveToFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (targetFolderId: string | null) => Promise<void>;
  folders: FolderType[];
  itemName: string;
  initialFolderId: string | null;
  isLoading?: boolean;
}

export const MoveToFolderModal: React.FC<MoveToFolderModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  folders,
  itemName,
  initialFolderId,
  isLoading = false
}) => {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(initialFolderId);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    await onConfirm(selectedFolderId);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-charcoal-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-charcoal-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-charcoal-800 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-charcoal-800 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <FolderOpen size={18} className="text-accent-500" />
            Move Item
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-charcoal-800 rounded-lg text-charcoal-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4">
          <p className="text-sm text-charcoal-500 mb-4">
            Select destination folder for <span className="font-semibold text-slate-700 dark:text-slate-300">"{itemName}"</span>
          </p>

          <div className="border border-gray-100 dark:border-charcoal-800 rounded-xl max-h-[300px] overflow-y-auto bg-gray-50 dark:bg-charcoal-950">
            <FolderTree 
              folders={folders.filter(f => f.isShared)} // Only real folders
              currentFolderId={selectedFolderId}
              onSelectFolder={setSelectedFolderId}
              className="p-2"
            />
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50/50 dark:bg-charcoal-800/30 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-charcoal-600 hover:text-slate-900 dark:text-charcoal-400 dark:hover:text-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2 bg-accent-600 hover:bg-accent-500 text-white rounded-xl shadow-lg shadow-accent-900/20 text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
            Move Here
          </button>
        </div>
      </div>
    </div>
  );
};
