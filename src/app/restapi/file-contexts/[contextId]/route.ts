import { NextResponse } from 'next/server';
import { auth } from '@/server/lib/auth';
import { updateFileContext, deleteFileContext, getFileContextById, mapFileContext } from '@/server/models';

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ contextId: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { contextId } = await params;

    try {
        const body = await req.json();
        const updatedContext = await updateFileContext(contextId, body);
        return NextResponse.json(updatedContext);
    } catch (error) {
        console.error("PATCH FileContext error:", error);
        return NextResponse.json({ message: 'Failed to update file context' }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ contextId: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { contextId } = await params;
    try {
        const context = await getFileContextById(contextId);
        if (!context) {
            return NextResponse.json({ message: 'File context not found' }, { status: 404 });
        }

        await deleteFileContext(contextId, true);
        
        // console.log("context", context);
        if(context.meta?.document){
            // do delete document for workspace (DELETE/v1/system/remove-documents)
            const ragResponse = await fetch(`${process.env.RAG_API_URL}/api/v1/system/remove-documents`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.RAG_API_KEY}`
                },
                body: JSON.stringify({
                    names: [context.meta.document.location]
                })
            });
        }                
        return NextResponse.json({ message: 'File context deleted successfully' });
    } catch (error) {
        console.error("DELETE FileContext error:", error);
        return NextResponse.json({ message: 'Failed to delete file context' }, { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ contextId: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { contextId } = await params;

    try {
        const context = await getFileContextById(contextId);
        if (!context) {
            return NextResponse.json({ message: 'File context not found' }, { status: 404 });
        }
        return NextResponse.json(context);
    } catch (error) {
        console.error("GET FileContext error:", error);
        return NextResponse.json({ message: 'Failed to fetch file context' }, { status: 500 });
    }
}
