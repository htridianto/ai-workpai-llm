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
        const updated = await updateChatSession(params.sessionId, body);
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
        await deleteChatSession(params.sessionId, true);
        return NextResponse.json({ message: 'Session deleted successfully' });
    } catch (error) {
        console.error("DELETE [sessionId] Error:", error);
        return NextResponse.json({ message: 'Failed to delete session' }, { status: 500 });
    }
}

