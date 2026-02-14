
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Search, Check, Link as LinkIcon, Copy } from 'lucide-react';
import { UserProfile } from '@/shared/types/types';

interface ShareModalProps {
  isOpen: boolean;
  fileId: string;
  fileName: string;
  users: UserProfile[];
  onConfirm: (userIds: string[]) => void;
  onCancel: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  fileId,
  fileName,
  users,
  onConfirm,
  onCancel
}) => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen && fileId) {
      fetchFileUrl();
    }
  }, [isOpen, fileId]);

  const fetchFileUrl = async () => {
    try {
        const res = await fetch(`/restapi/generated/files/url?id=${fileId}`);
        const data = await res.json();
        if (data.url) {
            setFileUrl(data.url);
        }
    } catch (error) {
        console.error("Failed to fetch file URL for sharing", error);
    }
  };

  const toggleUser = (id: string) => {
    setSelectedUserIds(prev => 
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopyLink = () => {
    if (typeof window !== 'undefined' && fileUrl) {
      navigator.clipboard.writeText(fileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
        // Fallback or internal share link
        const shareUrl = `${window.location.origin}/share/${fileId}`;
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="relative w-full max-w-md bg-charcoal-900 border border-charcoal-800 rounded-2xl shadow-2xl p-6"
          >
            <button 
              onClick={onCancel}
              className="absolute top-4 right-4 text-charcoal-500 hover:text-slate-300 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent-500/10 text-accent-500 flex items-center justify-center">
                    <UserPlus size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-100">Share File</h3>
                    <p className="text-xs text-charcoal-400 truncate max-w-[200px]">{fileName}</p>
                </div>
            </div>

            {/* Copy Link Section */}
            <div className="mb-8 p-4 bg-charcoal-950/50 border border-charcoal-800 rounded-xl">
                <label className="block text-[10px] font-bold text-charcoal-500 uppercase tracking-widest mb-2">Share Link</label>
                <div className="flex gap-2">
                    <div className="flex-1 bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-xs text-charcoal-400 truncate flex items-center gap-2">
                        <LinkIcon size={12} className="shrink-0" />
                        <span className="truncate">{fileUrl || `.../share/${fileId}`}</span>
                    </div>
                    <button 
                        onClick={handleCopyLink}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 ${
                            copied 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-accent-600 hover:bg-accent-500 text-white'
                        }`}
                    >
                        {copied ? (
                            <>
                                <Check size={14} />
                                <span>Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy size={14} />
                                <span>Copy Link</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-[10px] font-bold text-charcoal-500 uppercase tracking-widest mb-2 pl-1">Direct Share</label>
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-2.5 text-charcoal-500" />
                    <input 
                        type="text" 
                        placeholder="Search users..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-charcoal-950 border border-charcoal-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 placeholder-charcoal-600"
                    />
                </div>
            </div>

            <div className="max-h-[180px] overflow-y-auto space-y-2 mb-6 scrollbar-thin scrollbar-thumb-charcoal-700">
                {filteredUsers.length === 0 ? (
                    <div className="text-center py-4 text-charcoal-500 text-sm">No users found.</div>
                ) : (
                    filteredUsers.map(user => (
                        <div 
                            key={user.id}
                            onClick={() => toggleUser(user.id)}
                            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                                selectedUserIds.includes(user.id)
                                ? 'bg-accent-500/10 border-accent-500/50'
                                : 'bg-charcoal-800 border-transparent hover:border-charcoal-600'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-charcoal-700 flex items-center justify-center text-xs font-bold text-charcoal-300">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <div className={`text-sm font-medium ${selectedUserIds.includes(user.id) ? 'text-accent-400' : 'text-slate-200'}`}>{user.name}</div>
                                    <div className="text-xs text-charcoal-500">{user.email}</div>
                                </div>
                            </div>
                            {selectedUserIds.includes(user.id) && (
                                <div className="w-5 h-5 rounded-full bg-accent-500 text-white flex items-center justify-center">
                                    <Check size={12} />
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <div className="flex gap-3 w-full">
              <button
                onClick={onCancel}
                className="flex-1 py-2.5 px-4 rounded-xl border border-charcoal-700 text-charcoal-300 hover:bg-charcoal-800 hover:text-white transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                    onConfirm(selectedUserIds);
                    setSelectedUserIds([]);
                }}
                disabled={selectedUserIds.length === 0}
                className="flex-1 py-2.5 px-4 rounded-xl text-white bg-accent-600 hover:bg-accent-500 shadow-lg shadow-accent-900/20 disabled:bg-charcoal-700 disabled:text-charcoal-500 disabled:shadow-none transition-all text-sm font-medium"
              >
                Share ({selectedUserIds.length})
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
