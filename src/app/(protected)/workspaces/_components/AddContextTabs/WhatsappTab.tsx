
import React, { useState } from 'react';
import { 
  MessageCircle, 
  Loader2,
  Phone,
  Smartphone,
  QrCode,
  CheckCircle,
  ArrowRight,
  X
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { FileContext, Workspace } from '@/shared/types/types';
import { useDashboard } from '@/app/(protected)/dashboard/DashboardContext';

interface WhatsappTabProps {
  workspace: Workspace;
  onClose: () => void;
  onSuccess: () => void;
  addFileContexts: (wsId: string, items: FileContext[]) => Promise<void>;
}

export const WhatsappTab: React.FC<WhatsappTabProps> = ({ 
  workspace, 
  onClose, 
  onSuccess,
  addFileContexts
}) => {
  const [waStep, setWaStep] = useState<'input' | 'qr' | 'groups'>('input');
  const [waPhoneNumber, setWaPhoneNumber] = useState('');
  const [isWaLoading, setIsWaLoading] = useState(false);
  const [waGroups, setWaGroups] = useState<{id: string, name: string, count: number}[]>([]);
  const [selectedWaGroups, setSelectedWaGroups] = useState<string[]>([]);
  const [isImporting, setIsImporting] = useState(false);

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
  };

  const handleConfirm = async () => {
    const newItems: FileContext[] = [];
    selectedWaGroups.forEach(groupId => {
      const group = waGroups.find(g => g.id === groupId);
      if(group) {
        newItems.push({
          id: 'auto',
          name: `${group.name}`,
          type: 'whatsapp',
          status: 'indexed',
          size: 0,
          dateCreated: Date.now(),
          progress: 0,
          workspaceId: workspace.slug,
          meta: {
            waNumber: waPhoneNumber,
            progress: 100
          }
        });
      }
    });

    if (newItems.length === 0) return;

    setIsImporting(true);
    try {
        await addFileContexts(workspace.id, newItems);
        onSuccess();
    } finally {
        setIsImporting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 mb-6">
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
      </div>

      <div className="flex justify-end gap-3 shrink-0 pt-4 border-t border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 z-10">
        <button onClick={onClose} className="px-6 py-2.5 text-sm text-charcoal-600 hover:text-slate-900 dark:text-charcoal-400 dark:hover:text-slate-200 font-medium">Cancel</button>
        <button 
          onClick={handleConfirm}
          disabled={waStep !== 'groups' || selectedWaGroups.length === 0 || isImporting}
          className="flex items-center gap-2 px-8 py-2.5 bg-accent-600 hover:bg-accent-500 text-white rounded-xl shadow-lg shadow-accent-900/20 text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isImporting ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={16} />}
          {isImporting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};
