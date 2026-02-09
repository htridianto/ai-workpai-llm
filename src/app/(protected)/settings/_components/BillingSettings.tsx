
import React from 'react';
import { Check } from 'lucide-react';

interface BillingSettingsProps {
  currentPlan: 'free' | 'pro';
  onUpgrade: (plan: 'free' | 'pro') => void;
}

export const BillingSettings: React.FC<BillingSettingsProps> = ({ currentPlan, onUpgrade }) => {
  return (
    <div className="space-y-8">
       <div>
        <h2 className="text-xl font-bold mb-1">Plans & Billing</h2>
        <p className="text-sm text-charcoal-500 dark:text-charcoal-400">Upgrade your workspace to unlock premium features.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Free Plan */}
        <div className={`p-6 rounded-2xl border-2 transition-all ${currentPlan === 'free' ? 'border-accent-500 bg-accent-50 dark:bg-accent-900/10' : 'border-gray-200 dark:border-charcoal-800'}`}>
           <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold">Free Tier</h3>
                <p className="text-2xl font-bold mt-2">$0 <span className="text-sm font-normal text-charcoal-500">/ month</span></p>
              </div>
              {currentPlan === 'free' && <div className="px-2 py-1 bg-accent-500 text-white text-xs font-bold rounded">CURRENT</div>}
           </div>
           <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm text-charcoal-600 dark:text-charcoal-300"><Check size={16} className="text-green-500" /> 4 Workspaces</li>
              <li className="flex items-center gap-2 text-sm text-charcoal-600 dark:text-charcoal-300"><Check size={16} className="text-green-500" /> Local LLM Support (Ollama)</li>
              <li className="flex items-center gap-2 text-sm text-charcoal-600 dark:text-charcoal-300"><Check size={16} className="text-green-500" /> 50MB Document Storage</li>
           </ul>
           <button 
              disabled={currentPlan === 'free'}
              className="w-full py-2 rounded-lg font-medium border border-charcoal-300 dark:border-charcoal-600 text-charcoal-600 dark:text-charcoal-300 disabled:opacity-50"
           >
             {currentPlan === 'free' ? 'Active Plan' : 'Downgrade'}
           </button>
        </div>

        {/* Pro Plan */}
        <div className={`relative p-6 rounded-2xl border-2 transition-all ${currentPlan === 'pro' ? 'border-accent-500 bg-accent-50 dark:bg-accent-900/10' : 'border-gray-200 dark:border-charcoal-800 hover:border-accent-300 dark:hover:border-accent-700'}`}>
           <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-accent-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg">RECOMMENDED</div>
           <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold">Pro Tier</h3>
                <p className="text-2xl font-bold mt-2">$29 <span className="text-sm font-normal text-charcoal-500">/ month</span></p>
              </div>
              {currentPlan === 'pro' && <div className="px-2 py-1 bg-accent-500 text-white text-xs font-bold rounded">CURRENT</div>}
           </div>
           <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm text-charcoal-600 dark:text-charcoal-300"><Check size={16} className="text-green-500" /> Unlimited Workspaces</li>
              <li className="flex items-center gap-2 text-sm text-charcoal-600 dark:text-charcoal-300"><Check size={16} className="text-green-500" /> Cloud LLM Support (OpenAI, Gemini)</li>
              <li className="flex items-center gap-2 text-sm text-charcoal-600 dark:text-charcoal-300"><Check size={16} className="text-green-500" /> 10GB Document Storage</li>
              <li className="flex items-center gap-2 text-sm text-charcoal-600 dark:text-charcoal-300"><Check size={16} className="text-green-500" /> Priority Support</li>
           </ul>
           <button 
              onClick={() => onUpgrade('pro')}
              disabled={currentPlan === 'pro'}
              className={`w-full py-2 rounded-lg font-medium transition-colors ${currentPlan === 'pro' ? 'bg-accent-600 text-white' : 'bg-charcoal-900 text-white hover:bg-accent-600'}`}
           >
             {currentPlan === 'pro' ? 'Active Plan' : 'Upgrade to Pro'}
           </button>
        </div>
      </div>
    </div>
  );
};
