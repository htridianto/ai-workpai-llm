
import React from 'react';
import { Eye, Download, Trash2, Share2, FileText, Presentation, FileSpreadsheet, Image as ImageIcon, Music, Video, File, Star, Users } from 'lucide-react';
import { GeneratedFile, ExportFormat } from '../../../../types';

interface FileRowProps {
  file: GeneratedFile;
  ownerName?: string;
  onView: (file: GeneratedFile) => void;
  onDownload: (file: GeneratedFile) => void;
  onDelete: (file: GeneratedFile) => void;
  onShare: (file: GeneratedFile) => void;
  onToggleStar: (file: GeneratedFile) => void;
}

export const FileRow: React.FC<FileRowProps> = ({ file, ownerName, onView, onDownload, onDelete, onShare, onToggleStar }) => {

  const getMiniIcon = (type: ExportFormat) => {
    switch(type) {
      case 'pdf': return <FileText size={18} className="text-red-500" />;
      case 'docx': return <FileText size={18} className="text-blue-600" />;
      case 'slides': return <Presentation size={18} className="text-orange-500" />;
      case 'sheets': return <FileSpreadsheet size={18} className="text-green-600" />;
      case 'image': return <ImageIcon size={18} className="text-purple-500" />;
      case 'audio': return <Music size={18} className="text-pink-500" />;
      case 'video': return <Video size={18} className="text-sky-500" />;
      default: return <File size={18} className="text-gray-400" />;
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 dark:border-charcoal-800 items-center hover:bg-gray-50 dark:hover:bg-charcoal-800/50 transition-colors last:border-0 group">
        <div className="col-span-5 flex items-center gap-4 overflow-hidden cursor-pointer" onClick={() => onView(file)}>
            <button 
                onClick={(e) => { e.stopPropagation(); onToggleStar(file); }}
                className={`p-1 rounded-full transition-colors ${file.isStarred ? 'text-yellow-400' : 'text-charcoal-300 hover:text-yellow-400'}`}
            >
                <Star size={16} fill={file.isStarred ? "currentColor" : "none"} />
            </button>
            <div className="shrink-0 p-2 bg-gray-100 dark:bg-charcoal-800 rounded-lg">
                {getMiniIcon(file.type)}
            </div>
            <div className="flex flex-col min-w-0">
                <span className="font-medium text-sm text-slate-700 dark:text-slate-200 truncate hover:text-accent-500">{file.name}</span>
                {ownerName && (
                    <span className="flex items-center gap-1 text-[10px] text-blue-500 mt-0.5">
                        <Users size={8} /> Shared by {ownerName}
                    </span>
                )}
            </div>
        </div>
        <div className="col-span-2 text-xs text-charcoal-500">{new Date(file.dateCreated).toLocaleDateString()}</div>
        <div className="col-span-2 text-xs text-charcoal-500">{(file.size / 1024).toFixed(1)} KB</div>
        <div className="col-span-3 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={(e) => { e.stopPropagation(); onShare(file); }} className="p-1.5 text-charcoal-400 hover:text-accent-500 rounded hover:bg-gray-100 dark:hover:bg-charcoal-700" title="Share">
                <Share2 size={16} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onView(file); }} className="p-1.5 text-charcoal-400 hover:text-accent-500 rounded hover:bg-gray-100 dark:hover:bg-charcoal-700" title="Preview">
                <Eye size={16} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onDownload(file); }} className="p-1.5 text-charcoal-400 hover:text-accent-500 rounded hover:bg-gray-100 dark:hover:bg-charcoal-700" title="Download">
                <Download size={16} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(file); }} className="p-1.5 text-charcoal-400 hover:text-red-500 rounded hover:bg-gray-100 dark:hover:bg-charcoal-700" title="Delete">
                <Trash2 size={16} />
            </button>
        </div>
    </div>
  );
};
