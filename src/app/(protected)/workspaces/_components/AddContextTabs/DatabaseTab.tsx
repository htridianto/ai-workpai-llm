
import React, { useState } from 'react';
import { 
  Server,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { FileContext } from '@/shared/types/types';
import { useDashboard } from '@/app/(protected)/dashboard/DashboardContext';

interface DatabaseTabProps {
  workspaceId: string;
  onClose: () => void;
  onSuccess: () => void;
  addFileContexts: (wsId: string, items: FileContext[]) => Promise<void>;
}

export const DatabaseTab: React.FC<DatabaseTabProps> = ({ 
  workspaceId, 
  onClose, 
  onSuccess,
  addFileContexts
}) => {
  const [dbConfig, setDbConfig] = useState({ name: '', type: 'postgres', connectionString: '' });
  const [isImporting, setIsImporting] = useState(false);

  const handleConfirm = async () => {
    if (!dbConfig.name || !dbConfig.connectionString) return;

    const newItems: FileContext[] = [{
      id: 'auto',
      name: `${dbConfig.name} (${dbConfig.type})`,
      type: 'database',
      status: 'indexed',
      size: 0,
      dateCreated: Date.now(),
      progress: 100,
      workspaceId: workspaceId,
      meta: {...dbConfig}
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
        <div className="max-w-2xl mx-auto mt-4 grid gap-6">
<div className="max-w-sm mx-auto flex items-center p-4 mb-4 text-sm rounded-lg text-accent-500" role="alert">
  <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <div>
    <span className="font-medium">Stay tuned!</span> This feature under development.
  </div>
</div>              
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-2">Connection Name</label>
              <input 
                type="text" 
                value={dbConfig.name}
                onChange={(e) => setDbConfig({...dbConfig, name: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all text-sm"
                placeholder="My Production DB"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-2">Database Type</label>
              <select 
                value={dbConfig.type}
                onChange={(e) => setDbConfig({...dbConfig, type: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all text-sm"
              >
                <option value="postgres">PostgreSQL</option>
                <option value="mysql">MySQL</option>
                <option value="mongodb">MongoDB</option>
                <option value="snowflake">Snowflake</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-2">Connection String / URI</label>
            <div className="relative">
              <Server size={18} className="absolute left-4 top-3.5 text-charcoal-400" />
              <input 
                type="text" 
                value={dbConfig.connectionString}
                onChange={(e) => setDbConfig({...dbConfig, connectionString: e.target.value})}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all text-sm font-mono"
                placeholder="postgresql://user:password@localhost:5432/mydb"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 shrink-0 pt-4 border-t border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 z-10">
        <button onClick={onClose} className="px-6 py-2.5 text-sm text-charcoal-600 hover:text-slate-900 dark:text-charcoal-400 dark:hover:text-slate-200 font-medium">Cancel</button>
        <button 
          onClick={handleConfirm}
          disabled={!dbConfig.name || !dbConfig.connectionString || isImporting}
          className="flex items-center gap-2 px-8 py-2.5 bg-accent-600 hover:bg-accent-500 text-white rounded-xl shadow-lg shadow-accent-900/20 text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isImporting ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={16} />}
          {isImporting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};
