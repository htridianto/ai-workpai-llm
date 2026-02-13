
import React, { useState } from 'react';
import { 
  CheckCircle, 
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { FileContext } from '@/shared/types/types';
import { useDashboard } from '@/app/(protected)/dashboard/DashboardContext';

interface LinkTabProps {
  workspaceId: string;
  onClose: () => void;
  onSuccess: () => void;
  addFileContexts: (wsId: string, items: FileContext[]) => Promise<void>;
}

export const LinkTab: React.FC<LinkTabProps> = ({ 
  workspaceId, 
  onClose, 
  onSuccess,
  addFileContexts
}) => {
  const [contextLink, setContextLink] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const handleConfirm = async () => {
    if (!contextLink) return;

    const newItems: FileContext[] = [{
      id: uuidv4(),
      name: contextLink,
      type: 'link',
      status: 'indexing',
      size: 0,
      dateCreated: Date.now(),
      folderId: undefined,
      progress: 0,
      workspaceId: workspaceId
    }];

    setIsImporting(true);
    try {
        await addFileContexts(workspaceId, newItems);
        onSuccess();
    } finally {
        setIsImporting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 mb-6">
        <div className="max-w-xl mx-auto mt-8">
          <label className="block text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-2">Website URL</label>
          <input 
            type="url" 
            value={contextLink}
            onChange={(e) => setContextLink(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all text-base"
            placeholder="https://example.com"
          />
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 p-4 rounded-xl mt-4 flex gap-3">
            <CheckCircle size={20} className="text-blue-500 shrink-0" />
            <p className="text-sm text-blue-700 dark:text-blue-300">We will crawl the target URL and index visible text content. This process runs in the background.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 shrink-0 pt-4 border-t border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 z-10">
        <button onClick={onClose} className="px-6 py-2.5 text-sm text-charcoal-600 hover:text-slate-900 dark:text-charcoal-400 dark:hover:text-slate-200 font-medium">Cancel</button>
        <button 
          onClick={handleConfirm}
          disabled={!contextLink || isImporting}
          className="flex items-center gap-2 px-8 py-2.5 bg-accent-600 hover:bg-accent-500 text-white rounded-xl shadow-lg shadow-accent-900/20 text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isImporting ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={16} />}
          {isImporting ? 'Submitting...' : 'Submit Context'}
        </button>
      </div>
    </div>
  );
};
