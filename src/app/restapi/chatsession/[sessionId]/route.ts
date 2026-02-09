import { NextRequest, NextResponse } from 'next/server';
import { Store } from '../../store';

export async function GET(
    request: NextRequest,
    props: { params: Promise<{ sessionId: string }> }
  ) {
    const params = await props.params;
    try {
        const session = Store.getSession(params.sessionId);
        if (!session) {
            return NextResponse.json({ message: 'Session not found' }, { status: 404 });
        }
        return NextResponse.json(session);
    } catch (error) {
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
        const updated = Store.updateSession(params.sessionId, body);
        
        if (!updated) {
            return NextResponse.json({ message: 'Session not found' }, { status: 404 });
        }
        
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update session' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    props: { params: Promise<{ sessionId: string }> }
  ) {
    const params = await props.params;
    try {
        const success = Store.deleteSession(params.sessionId);
        
        if (!success) {
            return NextResponse.json({ message: 'Session not found' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Session deleted successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete session' }, { status: 500 });
    }
}
