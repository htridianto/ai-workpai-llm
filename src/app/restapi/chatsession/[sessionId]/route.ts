import { NextRequest, NextResponse } from 'next/server';
import { getChatSessionById, updateChatSession, deleteChatSession } from '@/server/models';

export async function GET(
    request: NextRequest,
    props: { params: Promise<{ sessionId: string }> }
  ) {
    const params = await props.params;
    try {
        const session = await getChatSessionById(params.sessionId);

        if (!session) {
            return NextResponse.json({ message: 'Session not found' }, { status: 404 });
        }

        // Fetch history from RAG API
        const ragApiUrl = process.env.RAG_API_URL;
        const ragApiKey = process.env.RAG_API_KEY;

        if (ragApiUrl && ragApiKey && session.slug) {
            try {
                const ragResponse = await fetch(`${ragApiUrl}/api/v1/workspace/${session.workspaceId}/thread/${session.slug}/chats`, {
                    headers: {
                        'Authorization': `Bearer ${ragApiKey}`,
                        'Content-Type': 'application/json',
                    },
                });
                console.log("RAG get chat session response:", ragResponse);
                if (ragResponse.ok) {
                    const data = await ragResponse.json();
                    const history = data.history || [];
                    
                    // Transform RAG history to our Message format
                    // RAG API returns a flat array of messages with 'role' and 'content'
                    const messages = history.map((chat: any, index: number) => ({
                        id: chat.id || `${chat.role}-${index}`,
                        role: chat.role === 'user' ? 'user' : 'model',
                        text: chat.content,
                        sources: chat.sources,
                        timestamp: chat.sentAt ? chat.sentAt * 1000 : Date.now(),
                        attachments: chat.attachments
                    }));
                    
                    session.messages = messages;
                }
            } catch (historyError) {
                console.error("Error fetching history from RAG API:", historyError);
                // Continue with local session if RAG fetch fails
            }
        }

        return NextResponse.json(session);
    } catch (error) {
        console.error("GET [sessionId] Error:", error);
        return NextResponse.json({ message: 'Failed to fetch session' }, { status: 500 });
    }
}


export async function PUT(
    request: NextRequest,
    props: { params: Promise<{ sessionId: string }> }
  ) {
    const params = await props.params;
    try {
        const body = await request.json();
        // console.log("PUT [sessionId] Body:", body);
        const updated = await updateChatSession(params.sessionId, body);
        
        return NextResponse.json(updated);
    } catch (error) {
        console.error("PUT [sessionId] Error:", error);
        return NextResponse.json({ message: 'Failed to update session' }, { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    props: { params: Promise<{ sessionId: string }> }
  ) {
    const params = await props.params;
    try {
        const body = await request.json();
        const updated = await updateChatSession(params.sessionId, body);

        // do update chat session for workspace (POST /v1/workspace/{slug}/thread/{threadSlug}/update)
        const ragResponse = await fetch(`${process.env.RAG_API_URL}/api/v1/workspace/${updated.workspaceId}/thread/${updated.slug}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.RAG_API_KEY}`
            },
            body: JSON.stringify({
                name: body.title
            })
        });

        // console.log("RAG update chat session response:", body, ragResponse);
        if (!ragResponse.ok) {
            const errorText = await ragResponse.text();
            console.error("RAG update chat session error details:", errorText);
        }
        
        return NextResponse.json(updated);
    } catch (error) {
        console.error("PUT [sessionId] Error:", error);
        return NextResponse.json({ message: 'Failed to update session' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    props: { params: Promise<{ sessionId: string }> }
  ) {
    const params = await props.params;
    try {
        const deleted = await deleteChatSession(params.sessionId, true);

        // do delete chat session for workspace (DELETE /v1/workspace/{slug}/thread/{threadSlug})
        const ragResponse = await fetch(`${process.env.RAG_API_URL}/api/v1/workspace/${deleted.workspaceId}/thread/${deleted.slug}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.RAG_API_KEY}`
            }
        });        

        console.log("RAG delete chat session response:", ragResponse);
        if (!ragResponse.ok) {
            const errorText = await ragResponse.text();
            console.error("RAG delete chat session error details:", errorText);
        }
        
        return NextResponse.json({ message: 'Session deleted successfully' });
    } catch (error) {
        console.error("DELETE [sessionId] Error:", error);
        return NextResponse.json({ message: 'Failed to delete session' }, { status: 500 });
    }
}

