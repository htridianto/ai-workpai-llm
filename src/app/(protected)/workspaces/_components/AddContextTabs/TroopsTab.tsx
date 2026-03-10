
import React, { useEffect, useState } from 'react';
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
import { WorkspaceService } from '@/client/services/workspaceService';
import { Folder } from '@/shared/types/types';

interface TroopsTabProps {
  workspace: Workspace;
  parentFolder: Folder;
  onClose: () => void;
  onSuccess: () => void;
  addFileContexts: (wsId: string, items: FileContext[]) => Promise<void>;
}

export const TroopsTab: React.FC<TroopsTabProps> = ({ 
  workspace, 
  parentFolder,
  onClose, 
  onSuccess,
  addFileContexts
}) => {
  const [waStep, setWaStep] = useState<'input' | 'qr' | 'groups'>('input');
  const [sessionWa, setSessionWa] = useState<any>(null);
  const [waPhoneNumber, setWaPhoneNumber] = useState('');
  const [imageQrCode, setImageQrCode] = useState<string>('');
  const [qrCodeExpiresIn, setQrCodeExpiresIn] = useState<number>(0);
  const [isWaLoading, setIsWaLoading] = useState(false);
  const { setToast } = useDashboard();

  const formatToIndoInternational = (phone: string) => {
    // 1. Hapus semua karakter non-angka (kecuali tanda + di awal)
    let cleaned = phone.replace(/(?!^\+)\D/g, "");

    // 2. Jika diawali '08', ganti '0' dengan '+62'
    if (cleaned.startsWith('08')) {
        cleaned = '+62' + cleaned.substring(1);
    }
    
    // 3. Jika diawali '8' (langsung angka operator), tambahkan '+62'
    else if (cleaned.startsWith('8')) {
        cleaned = '+62' + cleaned;
    }
    
    // 4. Jika diawali '62' tanpa '+', tambahkan '+'
    else if (cleaned.startsWith('62')) {
        cleaned = '+' + cleaned;
    }

    // 5. Validasi akhir: Apakah sesuai standar global E.164?
    const e164Regex = /^\+[1-9]\d{6,14}$/;
    const isValid = e164Regex.test(cleaned);

    return {
        original: phone,
        formatted: isValid ? cleaned : "Invalid Number",
        isValid: isValid
    };
}  

  // WhatsApp Simulation Handlers
  const handleGenerateQR = async () => {
    if (!waPhoneNumber || isWaLoading) return;
    const validFormat = formatToIndoInternational(waPhoneNumber);
    if (!validFormat.isValid) {
      setToast({ 
        message: "Invalid Phone Number", 
        subMessage: "Please enter a valid phone number.",
        type: 'error' 
      });
      return;
    }    
    setWaPhoneNumber(validFormat.formatted);
    setIsWaLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || '/restapi'}/wa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: `WA:${validFormat.formatted}`,
            workspaceId: workspace.slug,
            parentFolderId: `.troops-${workspace.slug}`,
            meta: {
              waNumber: validFormat.formatted
            }
        })
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setToast({ 
            message: "Failed to create troop", 
            subMessage: errorData.message || 'Failed to create troop',
            type: 'error' 
        });
        setIsWaLoading(false);
        return;
    }
    const session = await response.json();
    
    console.log("Session Data:", JSON.stringify(session, null, 2));
    if(session.state === 'logged_in') {
      setIsWaLoading(false);
      try {
        await WorkspaceService.createFolder({
          name: session.display_name || `WA:${validFormat.formatted}`,
          workspaceId: workspace.slug,
          parentFolderId: `.troops-${workspace.slug}`,
          meta: {
            waNumber: validFormat.formatted,
            session: session        
          }
        });
        setToast({ 
          message: "Troop created successfully", 
          subMessage: 'Troop already connected',
          type: 'success' 
        });
        onSuccess();
        onClose();
      } catch (error: any) {
        setToast({ 
          message: "Failed to create troop", 
          subMessage: "Troop already exists. Use another phone number.",
          type: 'error' 
        });
      }              
      return;
    }

    setSessionWa(session);
    if(session.qr){
      setImageQrCode(session.qr.qr_link);
    }     
    setIsWaLoading(false);
    setWaStep('qr');  
    setQrCodeExpiresIn(0);
  };

  const handleChangeNumber = () => {
      setWaStep('input');
      setImageQrCode('');
  };


  useEffect(() => {
    let timerQr: NodeJS.Timeout;
    // Only start timer if we are in 'qr' step and have a duration
    if (waStep === 'qr' && sessionWa?.qr?.qr_duration) {     
      timerQr = setInterval(() => {
        setQrCodeExpiresIn((prev) => {
          const nextValue = prev + 1;   
          // Check if we hit the limit
          if (nextValue >= sessionWa.qr.qr_duration) {
            // Trigger the async call outside the state transition
            handleGenerateQR();
            return 0; // Reset counter
          }
          return nextValue;
        });
      }, 1000);
    } else {
      setQrCodeExpiresIn(0);
    }
    // Cleanup: This is crucial to stop the timer when waStep changes
    return () => {
      if (timerQr) clearInterval(timerQr);
    };
  }, [waStep, sessionWa?.qr?.qr_duration, handleGenerateQR]);

  const checkSessionWa = async () => {
    if (!sessionWa?.id) return;
    setIsWaLoading(true);
    const validFormat = formatToIndoInternational(waPhoneNumber);
    try {      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || '/restapi'}/wa?sessionName=${sessionWa.id}`);
      const data = await res.json();
      console.log("Session Status:", data);
      if(data.state === 'logged_in') { 
        try {
          await WorkspaceService.createFolder({
            name: data.display_name || `WA:${validFormat.formatted}`,
            workspaceId: workspace.slug,
            parentFolderId: `.troops-${workspace.slug}`,
            meta: {
              waNumber: validFormat.formatted,
              session: data
            }
          });
          setToast({ 
            message: "Troop created successfully",
            type: 'success' 
          });
          onSuccess();
          onClose();
        } catch (error: any) {
          setToast({ 
            message: "Failed to create troop",
            type: 'error' 
          });
        }                      
      }
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
    setIsWaLoading(false);    
  };

  useEffect(() => {
    if (qrCodeExpiresIn % 10 === 0 && !isWaLoading) {
      console.log(`⏱️ QR Progress: ${qrCodeExpiresIn}/${sessionWa?.qr?.qr_duration}`);
      checkSessionWa();
    }
  }, [qrCodeExpiresIn, isWaLoading]); 

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
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100">Scan with WhatsApp</h4>               
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 inline-block">
                <div className="w-64 h-64 bg-charcoal-900 pattern-dots pattern-gray-100 pattern-size-4 pattern-opacity-100 flex items-center justify-center">
                  {imageQrCode && <img src={imageQrCode} alt="QR Code" />}
                  {!imageQrCode && <QrCode size={120} className="text-white" />}
                </div>
              </div>
              <div>                
                <p>QR Code expires in {(sessionWa?.qr?.qr_duration || 0) - qrCodeExpiresIn} seconds (auto-refreshing)</p>
                <p className="text-sm text-charcoal-500 mt-1">Open WhatsApp on your phone {waPhoneNumber} <br/> Go to Settings {'>'} Linked Devices</p>
              </div>
              <div className="flex gap-3 justify-center max-w-sm mx-auto w-full">
                <button onClick={handleChangeNumber} className="px-4 py-2 text-sm text-charcoal-500 hover:text-slate-700 dark:hover:text-slate-300">Change Number</button>
              </div>
            </div>
          )}      
        </div>
      </div>

      <div className="flex justify-end gap-3 shrink-0 pt-4 border-t border-gray-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 z-10">
        <button onClick={onClose} className="px-6 py-2.5 text-sm text-charcoal-600 hover:text-slate-900 dark:text-charcoal-400 dark:hover:text-slate-200 font-medium">Cancel</button>
        {/* <button 
          onClick={handleConfirm}
          disabled={waStep !== 'groups' || selectedWaGroups.length === 0 || isImporting}
          className="flex items-center gap-2 px-8 py-2.5 bg-accent-600 hover:bg-accent-500 text-white rounded-xl shadow-lg shadow-accent-900/20 text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isImporting ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={16} />}
          {isImporting ? 'Submitting...' : 'Submit'}
        </button> */}
      </div>
    </div>
  );
};
