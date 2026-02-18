
import React, { useState, useEffect, useRef } from 'react';
import { Bell, Check, Clock, FileText, Info, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppNotification, GeneratedFile } from '@/shared/types/types';
import { MockApi } from '@/client/services/mockApiService';
import { GeneratedService } from '@/client/services/generatedService';
import { useRouter } from 'next/navigation';

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const fetchNotifications = async () => {
    try {
      // 1. Fetch mock notifications
      const mockNotes = await MockApi.fetchNotifications();
      
      // 2. Fetch real generated files
      const recentFiles = await GeneratedService.fetchGeneratedFiles();
      
      // Get read status for generated files from localStorage
      const readGeneratedIds = JSON.parse(localStorage.getItem('read_generated_files') || '[]');

      // 3. Convert recent files to notifications (last 7 days)
      const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      const fileNotes: AppNotification[] = recentFiles
        .filter(file => file.dateCreated > sevenDaysAgo)
        .map(file => ({
          id: `file-${file.id}`,
          title: 'File Generated Successfully',
          message: `${file.name} is ready for download.`,
          type: 'success',
          timestamp: file.dateCreated,
          read: readGeneratedIds.includes(file.id)
        }));

      // 4. Combine and sort
      const combined = [...mockNotes, ...fileNotes].sort((a, b) => b.timestamp - a.timestamp);
      setNotifications(combined);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  // Poll for notifications every 5 minutes to simulate real-time updates
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 1000*60*5);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = async (id: string, e?: React.MouseEvent) => {
      e?.stopPropagation();
      
      if (id.startsWith('file-')) {
          const fileId = id.replace('file-', '');
          const readGeneratedIds = JSON.parse(localStorage.getItem('read_generated_files') || '[]');
          if (!readGeneratedIds.includes(fileId)) {
              const updated = [...readGeneratedIds, fileId];
              localStorage.setItem('read_generated_files', JSON.stringify(updated));
          }
      } else {
          await MockApi.markNotificationRead(id);
      }
      
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = async () => {
      // Mark all mock notifications as read
      await MockApi.markAllNotificationsRead();
      
      // Mark all file notifications as read in localStorage
      const fileIds = notifications
        .filter(n => n.id.startsWith('file-'))
        .map(n => n.id.replace('file-', ''));
      
      const readGeneratedIds = JSON.parse(localStorage.getItem('read_generated_files') || '[]');
      const updatedReadIds = [...new Set([...readGeneratedIds, ...fileIds])];
      localStorage.setItem('read_generated_files', JSON.stringify(updatedReadIds));

      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = async (note: AppNotification) => {
      if (!note.read) {
          handleMarkAsRead(note.id);
      }
      if (note.title.includes('File Generated')) {
          router.push('/generated');
          setIsOpen(false);
      }
  };

  const formatTime = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const getIcon = (note: AppNotification) => {
      if (note.title.includes('File Generated') || note.message.includes('ready for download')) {
          return <FileText size={14} className="text-white" />;
      }
      switch (note.type) {
          case 'success': return <Check size={14} className="text-white" />;
          case 'error': return <AlertTriangle size={14} className="text-white" />;
          case 'warning': return <AlertTriangle size={14} className="text-white" />;
          default: return <Info size={14} className="text-white" />;
      }
  };

  const getColor = (type: AppNotification['type']) => {
      switch (type) {
          case 'success': return 'bg-green-500';
          case 'error': return 'bg-red-500';
          case 'warning': return 'bg-amber-500';
          default: return 'bg-blue-500';
      }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-charcoal-500 dark:text-charcoal-400 hover:bg-gray-100 dark:hover:bg-charcoal-800 rounded-lg transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-charcoal-950 rounded-full"></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 md:w-96 bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 rounded-2xl shadow-2xl overflow-hidden z-50 origin-top-right"
            >
                <div className="p-4 border-b border-gray-200 dark:border-charcoal-800 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">Notifications</h3>
                    {unreadCount > 0 && (
                        <button 
                            onClick={handleMarkAllRead}
                            className="text-xs font-medium text-accent-600 dark:text-accent-400 hover:text-accent-500"
                        >
                            Mark all read
                        </button>
                    )}
                </div>

                <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-charcoal-300 dark:scrollbar-thumb-charcoal-700">
                    {notifications.length === 0 ? (
                        <div className="p-8 text-center text-charcoal-400">
                            <Bell size={32} className="mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No notifications yet</p>
                        </div>
                    ) : (
                        <div>
                            {notifications.map(note => (
                                <div 
                                    key={note.id}
                                    onClick={() => handleNotificationClick(note)}
                                    className={`relative p-4 border-b border-gray-100 dark:border-charcoal-800 hover:bg-gray-50 dark:hover:bg-charcoal-800/50 cursor-pointer transition-colors ${!note.read ? 'bg-accent-50/50 dark:bg-accent-900/10' : ''}`}
                                >
                                    <div className="flex gap-3">
                                        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getColor(note.type)} shadow-sm mt-0.5`}>
                                            {getIcon(note)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-0.5">
                                                <h4 className={`text-sm font-semibold truncate pr-2 ${!note.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                                                    {note.title}
                                                </h4>
                                                {!note.read && <span className="w-2 h-2 rounded-full bg-accent-500 shrink-0 mt-1.5"></span>}
                                            </div>
                                            <p className="text-xs text-charcoal-500 dark:text-charcoal-400 leading-relaxed mb-1.5 line-clamp-2">
                                                {note.message}
                                            </p>
                                            <div className="flex items-center gap-2 text-[10px] text-charcoal-400">
                                                <Clock size={10} />
                                                <span>{formatTime(note.timestamp)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="p-2 bg-gray-50 dark:bg-charcoal-950/50 border-t border-gray-200 dark:border-charcoal-800 text-center">
                    <button 
                        onClick={() => router.push('/generated')} 
                        className="text-xs text-charcoal-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium transition-colors"
                    >
                        View Generated Content
                    </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
