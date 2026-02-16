import { NextResponse } from 'next/server';
import { auth } from '@/server/lib/auth';

export async function GET(
  request: Request,
  context: { params: Promise<{ workspaceId: string; threadSlug: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { workspaceId, threadSlug } = await context.params;
  const ragApiUrl = process.env.RAG_API_URL;
  const ragApiKey = process.env.RAG_API_KEY;

  if (!ragApiUrl || !ragApiKey) {
    return NextResponse.json(
      { message: 'RAG API configuration missing' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${ragApiUrl}/api/v1/workspace/${workspaceId}/thread/${threadSlug}/chats`, {
      headers: {
        'Authorization': `Bearer ${ragApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.error || 'Failed to fetch chats from RAG API' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching chats:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
