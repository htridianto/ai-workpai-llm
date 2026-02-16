import { NextResponse } from 'next/server';
import { auth } from '@/server/lib/auth';
import { createFileContext } from '@/server/models';
import { progress } from 'framer-motion';

export async function POST(req: Request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const workspaceId = formData.get('workspaceId') as string;
        const folderId = formData.get('folderId') as string;

        if (!file || !workspaceId) {
            return NextResponse.json({ message: 'File and Workspace ID are required' }, { status: 400 });
        }

        // 1. Upload to RAG server
        const ragApiUrl = process.env.RAG_API_URL;
        const ragApiKey = process.env.RAG_API_KEY;
        
        if (!ragApiUrl) {
           throw new Error("RAG_API_URL is not configured.");
        }

        const uploadUrl = `${ragApiUrl}/api/v1/document/upload/${workspaceId}`;        
        const ragFormData = new FormData();        
        ragFormData.append('addToWorkspaces', workspaceId);        
        const metadata = {
            docAuthor: (session.user as any).userName || session.user.name || 'Unknown',
            description: `file uploaded on workspace ${workspaceId}`
        };
        ragFormData.append('metadata', JSON.stringify(metadata));
        ragFormData.append('docAuthor', metadata.docAuthor);   
        ragFormData.append('description', metadata.description);   

        ragFormData.append('file', file);

        console.log(`Uploading file ${file.name} to RAG server: ${uploadUrl}`);

        const ragResponse = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${ragApiKey}`
            },
            body: ragFormData
        });

        if (!ragResponse.ok) {
            const errorText = await ragResponse.text();
            console.error("RAG upload error details:", errorText);
            throw new Error(`RAG server upload failed with status ${ragResponse.status}: ${errorText || ragResponse.statusText}`);
        }

        const ragResult = await ragResponse.json();
        console.log("RAG upload result:", ragResult);

        if (!ragResult.success) {
            throw new Error(`RAG server error: ${ragResult.error || 'Unknown error'}`);
        }

        // 2. Create FileContext in local DB
        // Save 'documents' as part of meta filecontext as requested
        const context = await createFileContext({
            workspaceId,
            folderId: folderId || null,
            type: 'file',
            name: file.name,
            size: file.size,
            status: 'indexed',
            meta: {
                progress: 100,
                document: ragResult.documents[0] || {}
            }
        });

        return NextResponse.json(context, { status: 201 });
    } catch (error: any) {
        console.error("POST FileContext Upload error:", error);
        return NextResponse.json({ message: error.message || 'Failed to upload and create file context' }, { status: 500 });
    }
}
