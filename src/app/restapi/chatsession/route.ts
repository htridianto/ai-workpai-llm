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

        const slug = `${session.user.userName?.toLowerCase()}:${nanoid(10)}`;
        const created = await createChatSession({
            ...body, 
            userId: session.user.id,
            slug
        });
        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        console.error("POST ChatSession Error:", error);
        return NextResponse.json({ message: 'Failed to create session' }, { status: 500 });
    }
}

