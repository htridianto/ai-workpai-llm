import { NextResponse } from 'next/server';
import { Store } from '../store';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_COLORS = ['accent-500', 'green-500', 'red-500', 'purple-500', 'indigo-500', 'blue-500'];

export async function GET(request: Request) {
    try {
        const ragApiUrl = process.env.RAG_API_URL;
        if (!ragApiUrl) {
            console.warn("RAG_API_URL not set, falling back to mock store");
            const workspaces = Store.getWorkspaces();
             return NextResponse.json(workspaces);
        }

        // Get token from cookie manually since we are in an API route
        const tokenCookie = request.headers.get('cookie')?.split(';').find(c => c.trim().startsWith((process.env.NEXT_PUBLIC_COOKIE_TOKEN_NAME || 'auth_token') + '='));
        const token = tokenCookie ? tokenCookie.split('=')[1] : null;

        const response = await fetch(`${ragApiUrl}/api/workspaces`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('workspaces', JSON.stringify(response, null, 2));

        if (!response.ok) {
            // If external fails (e.g. 401), maybe fallback or error?
            // If 401, probably should return 401. 
            // For dev/demo, if fallback is desired, we could. But "real login" implies we want real data.
            const message = await response.json();
            console.error("External API error:", response.status, message?.error);
            // Fallback for now if external fails, to keep app working? 
            // Or better to propagate error so we know.
            // Let's propagate error behavior but return empty list or mock? 
            // User requested "get from env... output to client", implies replacement.
             return NextResponse.json({ message: message?.error ||'Failed to fetch external workspaces' }, { status: response.status });
        }

        const data = await response.json();
        // Transform data.workspaces
        
        const workspaces = (data.workspaces || []).map((ws: any) => ({
            id: String(ws.id), // Ensure string ID
            title: ws.name,
            slug: ws.slug,
            createdAt: new Date(ws.createdAt).getTime(), // Convert ISO string to timestamp
            similarityThreshold: ws.similarityThreshold || 0.25,
            description: ws.description || 'Secure AI workspace for document retrieval and RAG.', // Not in sample but in interface
            symbol: ws.symbol || ws.name.substring(0, 1).toUpperCase(), // Default if missing
            color: ws.color || DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)], // Default if missing
            contextItems: [], // External API doesn't seem to return items here? Or maybe we fetch detail later.
            folders: [],
            systemInstruction: ws.openAiPrompt || null, // Map prompt to system instruction?
            // Custom fields map to our internal unused ones or new ones?
            // We map what we can.
            openAiTemp: ws.openAiTemp,
            lastUpdatedAt: ws.lastUpdatedAt
        }));

        return NextResponse.json(workspaces);

    } catch (error) {
        console.error("GET Workspaces error:", error);
        return NextResponse.json({ message: 'Failed to fetch workspaces' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Basic validation
        if (!body.title) {
            return NextResponse.json({ message: 'Title is required' }, { status: 400 });
        }

        const ragApiUrl = process.env.RAG_API_URL;
        if (!ragApiUrl) {
            return NextResponse.json({ message: 'Failed to create workspace: Internal Server Error' }, { status: 500 });
        }

        // Get token from cookie manually since we are in an API route
        // const tokenCookie = req.headers.get('cookie')?.split(';').find(c => c.trim().startsWith((process.env.NEXT_PUBLIC_COOKIE_TOKEN_NAME || 'auth_token') + '='));
        // const token = tokenCookie ? tokenCookie.split('=')[1] : null;
        const token = process.env.RAG_API_KEY || "56PZKDF-F2ZMR8P-HQJZBRQ-A403QRE";

        // Simple nanoid-like generator within function to avoid ESM issues
        const nanoid = (size: number = 10) => {
            const alphabets = 'abcdefghijklmnopqrstuvwxyz';
            let str = alphabets[Math.floor(Math.random() * alphabets.length)];            

            const chars = '0123456789'+alphabets;
            for (let i = 0; i < size-1; i++) {
                str += chars[Math.floor(Math.random() * chars.length)];
            }
            return str;
        };
        const slug = `ws-${nanoid(12)}`;
        const payload = {
            name: slug, 
            similarityThreshold: body.similarityThreshold || 0.7,
            openAiTemp: body.openAiTemp || 0.7,
            openAiHistory: body.openAiHistory || 20,
            openAiPrompt: body.openAiPrompt || "You are an AI assistant answering based ONLY on the provided documents.\nIf the answer is not in the documents, respond with:\n\"Tidak ditemukan dalam dokumen.\"\n\nCite page number if available in metadata.\nDo not invent facts.\nUse language based on user query.",
            queryRefusalResponse: body.queryRefusalResponse || "I'm sorry, but I cannot answer this question.\nThere is no relevant information in this workspace to answer your query.",
            chatMode: body.chatMode || "query",
            topN: body.topN || 4
        };

        // (POST /v1/workspace/new)
        const response = await fetch(`${ragApiUrl}/api/v1/workspace/new`, {
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
            return NextResponse.json({ message: message?.error || 'Failed to create workspace' }, { status: response.status });
        }

        const data = await response.json();
        const ws = data.workspace; // Assuming response is { workspace: { ... } }
        const newWorkspace = {
            id: String(ws.id),
            title: ws.name,
            slug: ws.slug,
            createdAt: new Date(ws.createdAt).getTime(),
            similarityThreshold: ws.similarityThreshold || 0.25,
            description: ws.description || 'Secure AI workspace for document retrieval and RAG.',
            symbol: ws.symbol || ws.name.substring(0, 1).toUpperCase(),
            color: ws.color || DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)],
            contextItems: [],
            folders: [],
            systemInstruction: ws.openAiPrompt || null,
            openAiTemp: ws.openAiTemp,
            lastUpdatedAt: ws.lastUpdatedAt
        };

        // do update workspace name (POST /v1/workspace/{slug}/update)
        const responseUpdate = await fetch(`${ragApiUrl}/api/v1/workspace/${ws.slug}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({name: body.title})
        });
        if (responseUpdate.ok) {
           const data = await responseUpdate.json(); 
           newWorkspace.title = data.workspace.name;
        }

        if(body.user_id){
            // do assign users to workspace (POST /v1/admin/workspaces/{slug}/manage-users)
            await fetch(`${ragApiUrl}/api/v1/admin/workspaces/${ws.slug}/manage-users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    userIds: [body.user_id],
                    reset: true
                })
            });
        }
        

        return NextResponse.json(newWorkspace, { status: 201 });

    } catch (error) {
        console.error("POST Workspace error:", error);
        return NextResponse.json({ message: 'Failed to create workspace' }, { status: 500 });
    }
}
