'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDashboard } from './DashboardContext';
import { Box, Link } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { workspaces, isLoadingData } = useDashboard();

  useEffect(() => {
    if (!isLoadingData && workspaces.length > 0) {
        // Redirect to the first workspace
        router.replace('/dashboard/' + workspaces[0].slug);
    }        
  }, [workspaces, isLoadingData, router]);

  if (isLoadingData) {
      return null; // Or a loading spinner if preferred, but layout handles main loading
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-charcoal-500">
      {workspaces.length ? (
        <p>Redirecting to workspace...</p>
      ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-charcoal-400">
              <div className="w-20 h-20 bg-gray-100 dark:bg-charcoal-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <Box size={40} className="text-accent-500 opacity-50" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">No Workspace Selected</h2>
              <p className="max-w-xs text-center">Select a workspace from the sidebar</p>
          </div>
      )}        
    </div>
  );
}
