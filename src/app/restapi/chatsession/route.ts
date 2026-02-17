import { NextResponse } from 'next/server';
import { getChatSessionsByWorkspaceId, createChatSession } from '@/server/models';
import { auth } from '@/server/lib/auth';
import { nanoid } from 'nanoid';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const workspaceId = searchParams.get('workspaceId');
        
        if (!workspaceId) {
            return NextResponse.json({ message: 'Workspace ID is required' }, { status: 400 });
        }

        const sessions = await getChatSessionsByWorkspaceId(workspaceId);
        return NextResponse.json(sessions);
        
    } catch (error) {
        console.error("GET ChatSession Error:", error);
        return NextResponse.json({ message: 'Failed to fetch sessions' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }    
    try {
        const body = await req.json();
        
        if (!body.workspaceId) {
            return NextResponse.json({ message: 'Workspace ID is required' }, { status: 400 });
        }

        const slug = `${session.user.userName?.toLowerCase()}-${nanoid(12)}`;
        const created = await createChatSession({            
            ...body, 
            id: slug,
            userId: session.user.id,
            slug
        });

        // do create chat session for workspace (POST /v1/workspace/{slug}/thread/new)
        const payload = {
            userId: session.user.ssoAuthId,
            name: body.title,
            slug
        }
        const ragResponse = await fetch(`${process.env.RAG_API_URL}/api/v1/workspace/${body.workspaceId}/thread/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.RAG_API_KEY}`
            },
            body: JSON.stringify(payload)
        });        

        if (!ragResponse.ok) {
            const errorText = await ragResponse.text();
            console.error("RAG create chat session error details:", errorText);
        }
        
        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        console.error("POST ChatSession Error:", error);
        return NextResponse.json({ message: 'Failed to create session' }, { status: 500 });
    }
}

