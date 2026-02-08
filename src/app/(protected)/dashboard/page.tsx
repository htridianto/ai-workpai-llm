'use client';

import React from 'react';
import { ChatInterface } from './_components/ChatInterface';
import { InputArea } from './_components/InputArea';
import { useDashboard } from './DashboardContext';

export default function DashboardPage() {
  const {
    currentSession,
    isStreaming,
    streamingContent,
    handleGenerateDocument,
    handleSendMessage,
    currentWorkspaceId
  } = useDashboard();

  return (
    <>
      <ChatInterface 
        messages={currentSession?.messages || []} 
        isStreaming={isStreaming}
        streamingContent={streamingContent}
        onGenerateDocument={handleGenerateDocument}
      />
      <InputArea 
        onSend={handleSendMessage} 
        disabled={isStreaming || !currentWorkspaceId}
      />
    </>
  );
}
