'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Box, CheckCircle2 } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-charcoal-950 flex overflow-hidden font-sans transition-colors duration-200 relative">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {/* Left Panel - Branding / Hero */}
      <div className="hidden lg:flex lg:w-1/2 bg-white dark:bg-gradient-to-br dark:from-charcoal-900 dark:to-charcoal-950 relative overflow-hidden items-center justify-center p-12 border-r border-gray-200 dark:border-charcoal-800">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] invert dark:invert-0"></div>
        {/* Gradients */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent-200/50 dark:bg-accent-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-red-200/50 dark:bg-red-600/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-lg">
          <div className="w-16 h-16 bg-gray-100 dark:bg-charcoal-800 rounded-2xl flex items-center justify-center mb-8 shadow-2xl border border-gray-200 dark:border-charcoal-700">
             <Box size={32} className="text-accent-500" /> 
          </div>          

          <h1 className="text-4xl mb-0 leading-tight text-slate-900 dark:text-white">            
            <span className="ms-2 font-bold text-6xl text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-red-600 dark:from-accent-400 dark:to-red-500">WorkpAI</span>
            <span className="text-xs text-slate-300 dark:text-slate-600 text-normal leading-tight ms-2">based on anythingLLM</span>
            <br /> <span className="ms-2 font-bold"></span>Your Private RAG
          </h1>                    

          <p className="text-md text-slate-600 dark:text-charcoal-400 my-8 leading-relaxed">
            Manage vector databases, orchestrate local models, and interact with your documents in a high-fidelity environment.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white/80 dark:bg-charcoal-900/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-charcoal-800 shadow-sm">
              <div className="p-2 bg-green-100 dark:bg-charcoal-800 rounded-lg text-green-600 dark:text-green-400"><CheckCircle2 size={20} /></div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Secure & Local</h3>
                <p className="text-sm text-slate-500 dark:text-charcoal-400">Enterprise-grade document privacy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 dark:bg-charcoal-950">
        <div className="w-full max-w-md bg-white dark:bg-charcoal-900 p-8 md:p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-charcoal-800 transition-colors duration-200">
          {children}
        </div>
      </div>
    </div>    

  );
}
