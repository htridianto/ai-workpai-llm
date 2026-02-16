'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  User, 
  Users, 
  CreditCard, 
  Cpu
} from 'lucide-react';
import { LLMConfiguration } from '@/shared/types/types';
import { ProfileSettings } from './_components/ProfileSettings';
import { TeamSettings } from './_components/TeamSettings';
import { OrganizationSettings } from './_components/OrganizationSettings';
import { BillingSettings } from './_components/BillingSettings';
import { LLMSettings } from './_components/LLMSettings';

type SettingsTab = 'organizations' | 'profile' | 'team' | 'billing' | 'llm';

export default function SettingsPage() {  
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SettingsTab>('organizations');

  // --- LLM State ---
  const [llmConfig, setLlmConfig] = useState<LLMConfiguration>({
    provider: 'openai',
    apiKey: '',
    modelName: 'gpt-4o-mini',
    baseUrl: 'http://localhost:11434'
  });

  // --- Billing State ---
  const [currentPlan, setCurrentPlan] = useState<'free' | 'pro'>('free');

  const handleSaveLLM = () => alert(`LLM Configuration for ${llmConfig.provider} saved!`);

  const renderSidebarItem = (tab: SettingsTab, icon: React.ReactNode, label: string) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
        activeTab === tab
          ? 'bg-accent-500 text-white shadow-md shadow-accent-500/20'
          : 'text-charcoal-500 dark:text-charcoal-400 hover:bg-gray-100 dark:hover:bg-charcoal-800 hover:text-slate-900 dark:hover:text-slate-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-charcoal-950 text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200">
      
      {/* Header */}
      <header className="bg-white dark:bg-charcoal-900 border-b border-gray-200 dark:border-charcoal-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-charcoal-800 text-charcoal-500 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold">Settings</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 flex-shrink-0 space-y-1">
            <div className="mb-4 px-4 text-xs font-semibold text-charcoal-500 uppercase tracking-wider">Account</div>
            {renderSidebarItem('organizations', <Users size={18} />, 'Organizations')}
            {renderSidebarItem('profile', <User size={18} />, 'My Profile')}            
            {renderSidebarItem('team', <Users size={18} />, 'Manage Users')}
            <div className="mt-6 mb-4 px-4 text-xs font-semibold text-charcoal-500 uppercase tracking-wider">General</div>
            {renderSidebarItem('billing', <CreditCard size={18} />, 'Plans & Billing')}
            {renderSidebarItem('llm', <Cpu size={18} />, 'LLM Configuration')}
          </aside>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            <div className="bg-white dark:bg-charcoal-900 rounded-2xl shadow-sm border border-gray-200 dark:border-charcoal-800 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              
              {activeTab === 'organizations' && <OrganizationSettings />}

              {activeTab === 'profile' && <ProfileSettings />}              

              {activeTab === 'team' && <TeamSettings />}

              {activeTab === 'billing' && (
                <BillingSettings 
                  currentPlan={currentPlan} 
                  onUpgrade={setCurrentPlan} 
                />
              )}

              {activeTab === 'llm' && (
                <LLMSettings 
                  config={llmConfig} 
                  setConfig={setLlmConfig} 
                  onSave={handleSaveLLM} 
                />
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
