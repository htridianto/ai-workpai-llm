
import React, { useState, useCallback, useEffect } from 'react';
import { 
  File, 
  UploadCloud, 
  X, 
  Loader2,
  ArrowRight,
  FolderOpen,
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { FileContext, Folder as FolderType, Workspace } from '@/shared/types/types';
import { useDashboard } from '@/app/(protected)/dashboard/DashboardContext';

interface FilesTabProps {
  workspace: Workspace;
  onClose: () => void;
  onSuccess: () => void;
  folders: FolderType[];
  currentFolderId: string | null;
  addFileContexts: (wsId: string, items: FileContext[]) => Promise<void>;
  uploadFileContext: (folderId: string | null, file: globalThis.File) => Promise<void>;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export const FilesTab: React.FC<FilesTabProps> = ({ 
  workspace, 
  onClose, 
  onSuccess, 
  folders,
  currentFolderId,
  addFileContexts,
  uploadFileContext
}) => {
  const { setToast } = useDashboard();
  const [contextFiles, setContextFiles] = useState<globalThis.File[]>([]);
  const [targetFolderId, setTargetFolderId] = useState<string>('');
  const [isImporting, setIsImporting] = useState(false);

  const folderOptions = folders.filter(f => f.isShared);
  useEffect(() => {
    if (currentFolderId && currentFolderId.startsWith('.')) {
        setTargetFolderId(folderOptions[0]?.id || '');
    } else {
        setTargetFolderId(currentFolderId || folderOptions[0]?.id || '');
    }
  }, [currentFolderId]);

  const validateAndAddFiles = (files: FileList | globalThis.File[]) => {
    const fileArray = Array.from(files);
    const validFiles: globalThis.File[] = [];
    const invalidFiles: string[] = [];

    fileArray.forEach(file => {
      if (file.size <= MAX_FILE_SIZE) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      setToast({
        message: "File too large",
        type: "error",
        subMessage: `${invalidFiles.length} file(s) exceeded the 20MB limit: ${invalidFiles.join(", ")}`
      });
    }

    if (validFiles.length > 0) {
      setContextFiles(prev => [...prev, ...validFiles]);
    }
  };

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(e.dataTransfer.files);
    }
  }, []);

  const handleConfirm = async () => {
    if (contextFiles.length === 0) return;

    setIsImporting(true);
    try {
        await Promise.all(contextFiles.map(file => 
            uploadFileContext(targetFolderId, file)
        ));
        onSuccess();
        onClose();
    } catch (error) {
        // Error is handled in the service/parent
    } finally {
        setIsImporting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 mb-6">
        {/* Destination Folder Selector */}
        <div className="mb-4 flex items-center gap-4 p-3 bg-gray-50 dark:bg-charcoal-800/50 rounded-xl border border-gray-200 dark:border-charcoal-700 shrink-0">
          <div className="flex items-center gap-2 text-sm text-charcoal-500 dark:text-charcoal-400">
            <FolderOpen size={18} />
            <span className="font-medium">Destination:</span>
          </div>
          <select
            value={targetFolderId}
            onChange={(e) => setTargetFolderId(e.target.value)}
            className="flex-1 bg-transparent border-none text-sm font-medium text-slate-800 dark:text-slate-200 focus:ring-0 cursor-pointer"
          >
            {/* <option value="">Root</option> */}
            {folderOptions.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>

        <div 
          className="flex-1 border-2 border-dashed border-gray-300 dark:border-charcoal-700 bg-gray-50 dark:bg-charcoal-800/50 rounded-xl p-8 text-center hover:border-accent-400 transition-colors flex flex-col items-center justify-center min-h-[200px]"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
        >
          <div className="w-16 h-16 bg-white dark:bg-charcoal-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <UploadCloud size={32} className="text-accent-500" />
          </div>
          <p className="text-lg font-medium text-slate-700 dark:text-slate-200">Drag & Drop files here</p>
          <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mt-2 mb-6">
            or <label className="text-accent-600 cursor-pointer hover:underline font-semibold">
              browse files 
              <input 
                type="file" 
                multiple 
                className="hidden" 
                onChange={(e) => { 
                  if (e.target.files) validateAndAddFiles(e.target.files); 
                }} 
              />
            </label>
          </p>
          <p className="text-[10px] uppercase tracking-wider font-bold text-charcoal-400 bg-gray-100 dark:bg-charcoal-800 px-2 py-1 rounded-md mb-4">
              Maksimal ukuran file: 20MB
          </p>
          
          {contextFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mt-4 w-full">
              {contextFiles.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-charcoal-800 border border-gray-200 dark:border-charcoal-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 shadow-sm">
                  <File size={14} className="text-charcoal-400" /> {f.name} 
                  <button onClick={() => setContextFiles(prev => prev.filter((_, idx) => idx !== i))}>
                    <X size={14} className="hover:text-red-500 ml-1" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 shrink-0 pt-4 border-t border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 z-10">
        <button onClick={onClose} className="px-6 py-2.5 text-sm text-charcoal-600 hover:text-slate-900 dark:text-charcoal-400 dark:hover:text-slate-200 font-medium">Cancel</button>
        <button 
          onClick={handleConfirm}
          disabled={contextFiles.length === 0 || isImporting}
          className="flex items-center gap-2 px-8 py-2.5 bg-accent-600 hover:bg-accent-500 text-white rounded-xl shadow-lg shadow-accent-900/20 text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isImporting ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={16} />}
          {isImporting ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );
};
