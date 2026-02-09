import { NextRequest, NextResponse } from 'next/server';
import { Store } from '../../store';

export async function PATCH(
    request: NextRequest,
    props: { params: Promise<{ workspaceId: string }> }
  ) {
    const params = await props.params;
    try {
        const body = await request.json();
        // Basic validation
        if (!body.title) {
            return NextResponse.json({ message: 'Title is required' }, { status: 400 });
        }

        const ragApiUrl = process.env.RAG_API_URL;
        if (!ragApiUrl) {
            return NextResponse.json({ message: 'Failed to update workspace: Internal Server Error' }, { status: 500 });
        }

        // Get token from cookie manually since we are in an API route
        // const tokenCookie = req.headers.get('cookie')?.split(';').find(c => c.trim().startsWith((process.env.NEXT_PUBLIC_COOKIE_TOKEN_NAME || 'auth_token') + '='));
        // const token = tokenCookie ? tokenCookie.split('=')[1] : null;
        const token = process.env.RAG_API_KEY || "56PZKDF-F2ZMR8P-HQJZBRQ-A403QRE";

        const payload = {
            name: body.title            
        };

        // (POST /v1/workspace/{slug}/update)
        // (POST /v1/workspace/{slug}/update)
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
            description: ws.description || 'Secure AI workspace for document retrieval and RAG.',
            symbol: ws.symbol || ws.name.substring(0, 1).toUpperCase(),            
            lastUpdatedAt: ws.lastUpdatedAt
        };        

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
        const workspace = Store.getWorkspace(params.workspaceId);
        if (!workspace) {
            return NextResponse.json({ message: 'Workspace not found' }, { status: 404 });
        }
        return NextResponse.json(workspace);
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch workspace' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    props: { params: Promise<{ workspaceId: string }> }
  ) {
    const params = await props.params;
    try {
        const ragApiUrl = process.env.RAG_API_URL;
        if (!ragApiUrl) {
            return NextResponse.json({ message: 'Failed to update workspace: Internal Server Error' }, { status: 500 });
        }

        // Get token from cookie manually since we are in an API route
        // const tokenCookie = req.headers.get('cookie')?.split(';').find(c => c.trim().startsWith((process.env.NEXT_PUBLIC_COOKIE_TOKEN_NAME || 'auth_token') + '='));
        // const token = tokenCookie ? tokenCookie.split('=')[1] : null;
        const token = process.env.RAG_API_KEY || "56PZKDF-F2ZMR8P-HQJZBRQ-A403QRE";

        // (POST /v1/workspace/{slug}/update)
        // (POST /v1/workspace/{slug}/update)
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
            return NextResponse.json({ message: message?.error || 'Failed to delete workspace' }, { status: response.status });
        }
        
        return NextResponse.json({ message: 'Workspace deleted successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete workspace' }, { status: 500 });
    }
}
