'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ChatInterface } from '../_components/ChatInterface';
import { InputArea } from '../_components/InputArea';
import { useDashboard } from '@/app/(protected)/dashboard/DashboardContext';

export default function WorkspaceDashboardPage() {
  const params = useParams();
  const { 
    currentSession, 
    isStreaming, 
    streamingContent, 
    handleGenerateDocument, 
    handleSendMessage, 
    handleRegenerate,
    currentWorkspaceId,
    setCurrentWorkspaceId 
  } = useDashboard();

  // Sync valid workspaceId from URL to Context
  useEffect(() => {
    if (params.workspaceId && typeof params.workspaceId === 'string') {
        if (currentWorkspaceId !== params.workspaceId) {
            setCurrentWorkspaceId(params.workspaceId);
        }
    }
    // console.log('page-workspaces:', params.workspaceId);
  }, [params.workspaceId, setCurrentWorkspaceId]);

  return (
    <>
      <ChatInterface 
        messages={currentSession?.messages || []} 
        isStreaming={isStreaming}
        streamingContent={streamingContent}
        onGenerateDocument={handleGenerateDocument}
        onRegenerate={handleRegenerate}
      />
      <InputArea 
        onSend={handleSendMessage} 
        disabled={isStreaming || !currentWorkspaceId}
      />
    </>
  );
}
