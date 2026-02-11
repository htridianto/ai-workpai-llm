import React from 'react';
import { Server, Key, Box, Shield, Save, Zap, Cpu } from 'lucide-react';
import { LLMConfiguration, LLMProvider } from '../../../../types/types';

interface LLMSettingsProps {
  config: LLMConfiguration;
  setConfig: (config: LLMConfiguration) => void;
  onSave: () => void;
}

export const LLMSettings: React.FC<LLMSettingsProps> = ({ config, setConfig, onSave }) => {
  return (
    <div className="space-y-6">
       <div>
        <h2 className="text-xl font-bold mb-1">LLM Model Setup</h2>
        <p className="text-sm text-charcoal-500 dark:text-charcoal-400">Configure your inference provider for text generation.</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-2">Inference Provider</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
             {(['openai', 'gemini', 'ollama', 'anthropic'] as LLMProvider[]).map((p) => (
               <button
                 key={p}
                 onClick={() => setConfig({...config, provider: p})}
                 className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all capitalize ${
                   config.provider === p 
                   ? 'border-accent-500 bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400 ring-1 ring-accent-500' 
                   : 'border-gray-200 dark:border-charcoal-700 hover:bg-gray-50 dark:hover:bg-charcoal-800'
                 }`}
               >
                  {p === 'ollama' ? <Server size={20} className="mb-2" /> : <Zap size={20} className="mb-2" />}
                  <span className="text-xs font-semibold">{p}</span>
               </button>
             ))}
          </div>
        </div>

        {config.provider === 'ollama' ? (
           <div>
             <label className="block text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-2">Base URL</label>
             <div className="relative">
                <input 
                  type="text" 
                  value={config.baseUrl}
                  onChange={(e) => setConfig({...config, baseUrl: e.target.value})}
                  placeholder="http://localhost:11434"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all"
                />
                <div className="absolute left-3 top-2.5 text-charcoal-400">
                   <Server size={18} />
                </div>
             </div>
             <p className="text-xs text-charcoal-400 mt-1">Default Ollama port is 11434.</p>
           </div>
        ) : (
          <div>
             <label className="block text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-2">API Key</label>
             <div className="relative">
                <input 
                  type="password" 
                  value={config.apiKey}
                  onChange={(e) => setConfig({...config, apiKey: e.target.value})}
                  placeholder={`Enter your ${config.provider} API Key`}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all"
                />
                <div className="absolute left-3 top-2.5 text-charcoal-400">
                   <Key size={18} />
                </div>
             </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-charcoal-500 dark:text-charcoal-400 mb-2">Model Name</label>
           <div className="relative">
              <input 
                type="text" 
                value={config.modelName}
                onChange={(e) => setConfig({...config, modelName: e.target.value})}
                placeholder="e.g. gpt-4, gemini-pro, llama2"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-charcoal-950 border border-gray-200 dark:border-charcoal-700 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all"
              />
              <div className="absolute left-3 top-2.5 text-charcoal-400">
                 <Box size={18} />
              </div>
           </div>
        </div>

        <div className="pt-4 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-lg flex gap-3">
             <Shield size={18} className="text-blue-500 shrink-0 mt-0.5" />
             <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                 API Keys are stored securely in your local environment. They are never sent to our servers, only directly to the model provider.
             </p>
        </div>

        <div>
          <button 
            onClick={onSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-accent-600 hover:bg-accent-500 text-white rounded-xl shadow-lg shadow-accent-900/20 transition-all font-medium"
          >
            <Save size={18} />
            Update Configuration
          </button>
        </div>
      </div>
    </div>
  );
};