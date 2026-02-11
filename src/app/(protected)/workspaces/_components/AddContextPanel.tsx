
import React, { useState, useCallback, useEffect } from 'react';
import { 
  File, 
  Globe, 
  Database, 
  UploadCloud, 
  X, 
  CheckCircle, 
  Server,
  MessageCircle,
  Loader2,
  QrCode,
  Phone,
  Smartphone,
  ArrowRight,
  FolderOpen,
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { ContextItem, Folder as FolderType } from '../../../../types/types';

interface AddContextPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContext: (items: ContextItem[]) => Promise<void>;
  currentFolderId: string | null;
  folders: FolderType[];
}

export const AddContextPanel: React.FC<AddContextPanelProps> = ({ 
  isOpen, 
  onClose, 
  onAddContext, 
  currentFolderId,
  folders
}) => {
  const [activeTab, setActiveTab] = useState<'files' | 'link' | 'whatsapp' | 'database'>('files');
  
  // -- Files State --
  const [contextFiles, setContextFiles] = useState<globalThis.File[]>([]);
  const [targetFolderId, setTargetFolderId] = useState<string>('');
  
  // Initialize target folder when opening or navigating
  useEffect(() => {
    // If currentFolderId is a virtual folder (starts with dot), default to root ('')
    if (currentFolderId && currentFolderId.startsWith('.')) {
        setTargetFolderId('');
    } else {
        setTargetFolderId(currentFolderId || '');
    }
  }, [currentFolderId, isOpen]);

  // -- Link State --
  const [contextLink, setContextLink] = useState('');

  // -- Database State --
  const [dbConfig, setDbConfig] = useState({ name: '', type: 'postgres', connectionString: '' });

  // -- WhatsApp State --
  const [waStep, setWaStep] = useState<'input' | 'qr' | 'groups'>('input');
  const [waPhoneNumber, setWaPhoneNumber] = useState('');
  const [isWaLoading, setIsWaLoading] = useState(false);
  const [waGroups, setWaGroups] = useState<{id: string, name: string, count: number}[]>([]);
  const [selectedWaGroups, setSelectedWaGroups] = useState<string[]>([]);

  // WhatsApp Simulation Handlers
  const handleGenerateQR = () => {
    if (!waPhoneNumber) return;
    setIsWaLoading(true);
    setTimeout(() => {
        setIsWaLoading(false);
        setWaStep('qr');
    }, 800);
  };

  const handleScanQR = () => {
    setIsWaLoading(true);
    setTimeout(() => {
        setIsWaLoading(false);
        setWaStep('groups');
        // Simulate fetch groups
        setWaGroups([
            { id: 'wa-1', name: 'Product Launch 🚀', count: 12 },
            { id: 'wa-2', name: 'Dev Team Updates', count: 5 },
            { id: 'wa-3', name: 'Marketing Alerts', count: 8 },
            { id: 'wa-4', name: 'Family Group', count: 4 },
            { id: 'wa-5', name: 'Client: Acme Corp', count: 3 },
        ]);
    }, 2000);
  };

  const handleChangeNumber = () => {
      setWaStep('input');
      setWaGroups([]);
      setSelectedWaGroups([]);
      // Keep phone number for editing
  };

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setContextFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  }, []);

  const handleConfirm = async () => {
    const newItems: ContextItem[] = [];

    if (activeTab === 'files') {
      contextFiles.forEach(file => {
        newItems.push({
          id: uuidv4(),
          name: file.name,
          type: file.name.endsWith('.pdf') ? 'pdf' : 'txt',
          status: 'indexing', // Start as indexing
          dateAdded: Date.now(),

          folderId: targetFolderId || undefined,
          progress: 0 // Init progress
        });
      });
    } else if (activeTab === 'link') {
       if(contextLink) {
         newItems.push({
           id: uuidv4(),
           name: contextLink,
           type: 'link',
           status: 'indexing',
           dateAdded: Date.now(),

           folderId: undefined,
           progress: 0
         });
       }
    } else if (activeTab === 'database') {
       if(dbConfig.name && dbConfig.connectionString) {
         newItems.push({
            id: uuidv4(),
            name: `${dbConfig.name} (${dbConfig.type})`,
            type: 'database',
            status: 'indexing',
            dateAdded: Date.now(),

            folderId: undefined,
            progress: 0
         });
       }
    } else if (activeTab === 'whatsapp') {
        selectedWaGroups.forEach(groupId => {
            const group = waGroups.find(g => g.id === groupId);
            if(group) {
                newItems.push({
                    id: uuidv4(),
                    name: `WA ${waPhoneNumber}: ${group.name}`,
                    type: 'whatsapp',
                    status: 'indexing',
                    dateAdded: Date.now(),

                    folderId: undefined,
                    progress: 0
                });
            }
        });
    }

    if (newItems.length === 0) return;

    // Async handoff: We just add them to the workspace logic, which handles the simulation
    onAddContext(newItems);
    
    // Cleanup
    setContextFiles([]);
    setContextLink('');
    setDbConfig({ name: '', type: 'postgres', connectionString: '' });
    setSelectedWaGroups([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="mx-6 mb-4 mt-2 p-6 bg-white dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-800 rounded-2xl shadow-sm animate-in slide-in-from-top-2 duration-300 min-h-[400px] flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4 shrink-0">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Add to Workspace</h3>
            <button onClick={onClose} className="p-1 text-charcoal-400 hover:text-red-500 rounded"><X size={20}/></button>
        </div>

        {/* Normal Tab Content */}
        <>
            <div className="flex gap-6 border-b border-gray-200 dark:border-charcoal-800 mb-6 overflow-x-auto shrink-0">
                <button 
                    onClick={() => setActiveTab('files')}
                    className={`pb-3 flex items-center gap-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'files' ? 'border-accent-500 text-accent-600 dark:text-accent-500' : 'border-transparent text-charcoal-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                    <File size={16} /> Upload Files
                </button>
                <button 
                    onClick={() => setActiveTab('link')}
                    className={`pb-3 flex items-center gap-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'link' ? 'border-accent-500 text-accent-600 dark:text-accent-500' : 'border-transparent text-charcoal-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                    <Globe size={16} /> Website Link
                </button>
                <button 
                    onClick={() => setActiveTab('whatsapp')}
                    className={`pb-3 flex items-center gap-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'whatsapp' ? 'border-green-500 text-green-600 dark:text-green-500' : 'border-transparent text-charcoal-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                    <MessageCircle size={16} /> WhatsApp Group
                </button>
                <button 
                    onClick={() => setActiveTab('database')}
                    className={`pb-3 flex items-center gap-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'database' ? 'border-accent-500 text-accent-600 dark:text-accent-500' : 'border-transparent text-charcoal-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                    <Database size={16} /> Database
                </button>
            </div>

            <div className="flex-1 mb-6">
            {activeTab === 'files' && (
                <div className="flex flex-col h-full">
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
                            <option value="">Workspace Root</option>
                            {folders.filter(f => !f.isReadOnly).map(f => (
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
                        <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mt-2 mb-6">or <label className="text-accent-600 cursor-pointer hover:underline font-semibold">browse files <input type="file" multiple className="hidden" onChange={(e) => { if (e.target.files) setContextFiles(prev => [...prev, ...Array.from(e.target.files as FileList)]); }} /></label></p>
                        
                        {contextFiles.length > 0 && (
                            <div className="flex flex-wrap gap-2 justify-center mt-4 w-full">
                            {contextFiles.map((f, i) => (
                                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-charcoal-800 border border-gray-200 dark:border-charcoal-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 shadow-sm">
                                    <File size={14} className="text-charcoal-400" /> {f.name} <button onClick={() => setContextFiles(prev => prev.filter((_, idx) => idx !== i))}><X size={14} className="hover:text-red-500 ml-1" /></button>
                                </span>
                            ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'link' && (
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
            )}

            {activeTab === 'database' && (
                <div className="max-w-2xl mx-auto mt-4 grid gap-6">
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
            )}

            {activeTab === 'whatsapp' && (
                <div className="max-w-xl mx-auto h-full flex flex-col justify-center">
                    {waStep === 'input' && (
                        <div className="text-center space-y-6 animate-in fade-in duration-300">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                <Phone size={32} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Connect WhatsApp</h4>
                                <p className="text-sm text-charcoal-500 dark:text-charcoal-400">Enter your phone number to start the linking process.</p>
                            </div>
                            <div className="relative max-w-sm mx-auto">
                                <Smartphone size={18} className="absolute left-4 top-3.5 text-charcoal-400" />
                                <input 
                                    type="tel" 
                                    value={waPhoneNumber}
                                    onChange={(e) => setWaPhoneNumber(e.target.value)}
                                    placeholder="+1 555 000 0000"
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-base"
                                />
                            </div>
                            <button 
                                onClick={handleGenerateQR}
                                disabled={!waPhoneNumber || isWaLoading}
                                className="w-full max-w-sm mx-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl shadow-lg shadow-green-900/20 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isWaLoading ? <Loader2 size={18} className="animate-spin" /> : <QrCode size={18} />}
                                <span>Generate QR Code</span>
                            </button>
                        </div>
                    )}

                    {waStep === 'qr' && (
                        <div className="text-center space-y-6 animate-in fade-in duration-300">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 inline-block">
                                {/* Simulated QR */}
                                <div className="w-48 h-48 bg-charcoal-900 pattern-dots pattern-gray-100 pattern-size-4 pattern-opacity-100 flex items-center justify-center">
                                    <QrCode size={120} className="text-white" />
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-100">Scan with WhatsApp</h4>
                                <p className="text-sm text-charcoal-500 mt-1">Open WhatsApp on your phone {waPhoneNumber} <br/> Go to Settings {'>'} Linked Devices</p>
                            </div>
                            <div className="flex gap-3 justify-center max-w-sm mx-auto w-full">
                                <button onClick={handleChangeNumber} className="px-4 py-2 text-sm text-charcoal-500 hover:text-slate-700 dark:hover:text-slate-300">Change Number</button>
                                <button 
                                    onClick={handleScanQR}
                                    disabled={isWaLoading}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl shadow-md transition-all font-medium"
                                >
                                    {isWaLoading ? <Loader2 size={18} className="animate-spin" /> : <span>Simulate Scan</span>}
                                </button>
                            </div>
                        </div>
                    )}

                    {waStep === 'groups' && (
                        <div className="space-y-4 animate-in fade-in duration-300 h-full flex flex-col">
                            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                                        <MessageCircle size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{waPhoneNumber}</p>
                                        <p className="text-xs text-green-600 dark:text-green-400 font-medium">Connected</p>
                                    </div>
                                </div>
                                <button onClick={handleChangeNumber} className="text-xs text-charcoal-500 hover:text-red-500 underline decoration-dotted">Change Number</button>
                            </div>
                            
                            <div className="flex items-center justify-between mt-2 shrink-0">
                                <label className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">Available Groups</label>
                                <span className="text-xs text-charcoal-400">{selectedWaGroups.length} selected</span>
                            </div>

                            <div className="border border-gray-200 dark:border-charcoal-700 rounded-xl overflow-hidden flex-1 overflow-y-auto bg-gray-50 dark:bg-charcoal-950">
                                {waGroups.map(group => (
                                    <div 
                                        key={group.id} 
                                        className={`flex items-center gap-3 p-3 border-b border-gray-100 dark:border-charcoal-800 last:border-0 cursor-pointer transition-colors ${selectedWaGroups.includes(group.id) ? 'bg-green-50/50 dark:bg-green-900/10' : 'hover:bg-gray-100 dark:hover:bg-charcoal-800'}`} 
                                        onClick={() => {
                                            if (selectedWaGroups.includes(group.id)) setSelectedWaGroups(prev => prev.filter(id => id !== group.id));
                                            else setSelectedWaGroups(prev => [...prev, group.id]);
                                        }}
                                    >
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedWaGroups.includes(group.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-charcoal-600'}`}>
                                            {selectedWaGroups.includes(group.id) && <CheckCircle size={12} fill="currentColor" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{group.name}</p>
                                            <p className="text-xs text-charcoal-400">{group.count} participants</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
            </div>

            <div className="flex justify-end gap-3 shrink-0 pt-4 border-t border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 z-10">
                <button onClick={onClose} className="px-6 py-2.5 text-sm text-charcoal-600 hover:text-slate-900 dark:text-charcoal-400 dark:hover:text-slate-200 font-medium">Cancel</button>
                <button 
                    onClick={handleConfirm}
                    disabled={(activeTab === 'files' && contextFiles.length === 0) || (activeTab === 'link' && !contextLink) || (activeTab === 'whatsapp' && selectedWaGroups.length === 0) || (activeTab === 'database' && !dbConfig.name)}
                    className="flex items-center gap-2 px-8 py-2.5 bg-accent-600 hover:bg-accent-500 text-white rounded-xl shadow-lg shadow-accent-900/20 text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                    Import Context <ArrowRight size={16} />
                </button>
            </div>
        </>
    </div>
  );
};
