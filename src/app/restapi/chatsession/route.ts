import { NextResponse } from 'next/server';
import { Store } from '@/server/lib/store';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
    try {
        const sessions = Store.getSessions();
        return NextResponse.json(sessions);
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch sessions' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Basic validation
        if (!body.workspaceId) {
            return NextResponse.json({ message: 'Workspace ID is required' }, { status: 400 });
        }

        const newSession = {
            ...body,
            id: body.id || uuidv4(),
            createdAt: Date.now(),
            messages: body.messages || [],
            contextItemIds: body.contextItemIds || []
        };

        const created = Store.addSession(newSession);
        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to create session' }, { status: 500 });
    }
}
