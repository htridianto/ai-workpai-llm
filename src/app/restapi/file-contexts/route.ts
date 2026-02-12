import { NextResponse } from 'next/server';
import { auth } from '@/server/lib/auth';
import { createFileContext } from '@/server/models';

export async function POST(req: Request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { workspaceId, folderId, type, meta, name, size, snippet, status } = body;

        if (!workspaceId) {
            return NextResponse.json({ message: 'Workspace ID is required' }, { status: 400 });
        }

        const context = await createFileContext({
            workspaceId,
            folderId: folderId || null,
            type: type || 'txt',
            meta: meta || null,
            name: name || 'Untitled',
            size: size || 0,
            snippet: snippet || null,
            status: status || 'indexed'
        });

        return NextResponse.json(context, { status: 201 });
    } catch (error) {
        console.error("POST FileContext error:", error);
        return NextResponse.json({ message: 'Failed to create file context' }, { status: 500 });
    }
}
