'use client';

import React from 'react';
import { Sidebar } from './_components/Sidebar';
import { ContextSidebar } from './_components/ContextSidebar';
import { Header } from './_components/Header';
import { useDashboard } from '@/app/(protected)/dashboard/DashboardContext';

function DashboardShell({ children }: { children: React.ReactNode }) {
  const {
    settings, isLoadingData
  } = useDashboard();

  if (isLoadingData) {
    return (
       <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-charcoal-950 text-accent-500">
         <div className="flex flex-col items-center gap-4">
           <div className="w-10 h-10 border-4 border-charcoal-200 dark:border-charcoal-800 border-t-accent-500 rounded-full animate-spin"></div>
           <p className="text-charcoal-500 dark:text-charcoal-400 text-sm animate-pulse">Loading Campaign...</p>
         </div>
       </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-charcoal-950 transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-charcoal-900 transition-colors duration-300 relative">
        <Header />

        <main className="flex-1 overflow-hidden flex flex-col relative">
          {children}
        </main>
      </div>

      <ContextSidebar />
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell>
      {children}
    </DashboardShell>
  );
}
