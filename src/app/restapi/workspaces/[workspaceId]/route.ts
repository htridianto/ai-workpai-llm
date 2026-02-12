import { NextRequest, NextResponse } from 'next/server';
import { Store } from '@/server/lib/store';
import { auth } from '@/server/lib/auth';
import { deleteWorkspaceService, updateWorkspaceService, getWorkspaceById } from '@/server/models';

export async function PATCH(
    request: NextRequest,
    props: { params: Promise<{ workspaceId: string }> }
  ) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }    
    const params = await props.params;
    try {
        const body = await request.json();
        // Basic validation
        if (!body.title) {
            return NextResponse.json({ message: 'Title is required' }, { status: 400 });
        }
        const ragApiUrl = process.env.RAG_API_URL;
        const token = process.env.RAG_API_KEY;
        if (!ragApiUrl || !token) {
            console.warn("RAG_API_URL or RAG_API_KEY not set");
            return NextResponse.json({ message: 'Failed to update workspace: Internal Server Error' }, { status: 500 });
        }
        const payload = {
            name: `${session.user.userName}:${body.title}`            
        };
        const response = await fetch(`${ragApiUrl}/api/v1/workspace/${params.workspaceId}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const message = await response.json();
            console.error("External API error (POST):", response.status, message?.error);
            return NextResponse.json({ message: message?.error || 'Failed to update workspace' }, { status: response.status });
        }

        const data = await response.json();
        const ws = data.workspace;
        const newWorkspace = {
            id: String(ws.id),
            title: ws.name,
            slug: ws.slug,
            createdAt: new Date(ws.createdAt).getTime(),            
            lastUpdatedAt: ws.lastUpdatedAt
        } as any;        

        // do update workspace in database
        const updatedWorkspace = await updateWorkspaceService(params.workspaceId, {
            name: body.title,
            description: body.description
        });
        newWorkspace.title = updatedWorkspace.name;
        newWorkspace.description = updatedWorkspace.description;
        newWorkspace.symbol = updatedWorkspace.name.substring(0, 1).toUpperCase();
        
        return NextResponse.json(newWorkspace);
    } catch (error) {
        console.error("PATCH Workspace error:", error);
        return NextResponse.json({ message: 'Failed to update workspace' }, { status: 500 });
    } 
}

export async function GET(
    request: NextRequest,
    props: { params: Promise<{ workspaceId: string }> }
  ) {
    const params = await props.params;
    try {
        const workspace = await getWorkspaceById(params.workspaceId);
        if (!workspace) {
            return NextResponse.json({ message: 'Workspace not found' }, { status: 404 });
        }
        return NextResponse.json(workspace);
    } catch (error) {
        console.error("GET Workspace error:", error);
        return NextResponse.json({ message: 'Failed to fetch workspace' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    props: { params: Promise<{ workspaceId: string }> }
  ) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }    
    const params = await props.params;
    try {
        const ragApiUrl = process.env.RAG_API_URL;
        if (!ragApiUrl) {
            return NextResponse.json({ message: 'Failed to delete workspace RAG_API_URL not set' }, { status: 500 });
        }
        const token = process.env.RAG_API_KEY;
        const response = await fetch(`${ragApiUrl}/api/v1/workspace/${params.workspaceId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const message = await response.json();
            console.error("External API error (DELETE):", response.status, message?.error);
            return NextResponse.json({ message: message?.error || 'Failed to delete workspace rag' }, { status: response.status });
        }

        // Delete workspace from database
        await deleteWorkspaceService(params.workspaceId, true);
        
        return NextResponse.json({ message: 'Workspace deleted successfully' });
    } catch (error) {
        console.error("DELETE Workspace error:", error);
        return NextResponse.json({ message: 'Failed to delete workspace' }, { status: 500 });
    }
}
