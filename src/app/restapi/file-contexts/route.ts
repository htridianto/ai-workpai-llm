import { NextResponse } from 'next/server';
import { auth } from '@/server/lib/auth';
import { createFileContext, getFolderById, updateFileContext } from '@/server/models';
import { processChats } from '@/server/actions/whatsapp';

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
        
        let parentFolderId = folderId || null;
        if(!folderId){
            if(type == 'whatsapp'){
                parentFolderId = `.whatsapp-${workspaceId}`;
            }else if(type == 'database'){
                parentFolderId = `.databases-${workspaceId}`;
            }else if(type == 'link'){
                parentFolderId = `.links-${workspaceId}`;
            }
        }  
        const metadata = meta || {
            progress: (status == 'indexed') ? 100 : 0,
            storage: {},
            document: {}
        } 
        const context = await createFileContext({
            workspaceId,
            folderId: parentFolderId,
            type: type || 'txt',
            name: name || 'Untitled',
            size: size || 0,
            snippet: snippet || null,
            status: status || 'indexed',
            meta: metadata
        });

        if(type == 'whatsapp'){
            const parentFolder = await getFolderById(parentFolderId);
            const sessionName = parentFolder?.meta?.session.id;
            const result = await processChats(sessionName, context);
            if(result){
                const updatedContext = await updateFileContext(context.id, {
                    size: result.size || 0,
                    meta: {
                        ...context.meta,
                        progress: (status == 'indexed') ? 100 : 50,
                        lastMessage: result.lastMessage,
                        lastMessageTimestamp: result.lastMessageTimestamp,
                        storage: result.storage
                    }
                });
                return NextResponse.json(updatedContext, { status: 201 });
            }
        }
        return NextResponse.json(context, { status: 201 });
    } catch (error) {
        console.error("POST FileContext error:", error);
        return NextResponse.json({ message: 'Failed to create file context' }, { status: 500 });
    }
}
