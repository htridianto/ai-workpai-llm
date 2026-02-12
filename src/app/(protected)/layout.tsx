'use client';

import React from 'react';
import { DashboardProvider, useDashboard } from '@/app/(protected)/dashboard/DashboardContext';
import { Toast } from '@/client/components/Shared/Toast';

function ProtectedShell({ children }: { children: React.ReactNode }) {
  const { toast, setToast } = useDashboard();

  return (
    <>
      <Toast 
        message={toast?.message || null}
        type={toast?.type}
        subMessage={toast?.subMessage}
        onClose={() => setToast(null)}
      />
      {children}
    </>
  );
}

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <ProtectedShell>
        {children}
      </ProtectedShell>
    </DashboardProvider>
  );
}
