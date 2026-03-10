import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { auth } from '@/server/lib/auth';
import { getToken } from 'next-auth/jwt';
import { createWorkspaceService, getUserWorkspaces } from '@/server/models';


export async function GET(request: Request) {
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
    // console.log('restapi:workspaces:GET:token', token)
    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    try {
        /*
        const ragApiUrl = process.env.RAG_API_URL;
        if (!ragApiUrl) {
            console.warn("RAG_API_URL is not configured");
            return NextResponse.json({ message: 'Failed to get workspace: RAG_API_URL is not configured' }, { status: 500 });
        }
        const response = await fetch(`${ragApiUrl}/api/workspaces`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.sessionToken}`
            }
        });
        
        if (!response.ok) {
            const message = await response.json();
            console.error("External API error:", response.status, message?.error);
            return NextResponse.json({ message: message?.error ||'Failed to fetch external workspaces' }, { status: response.status });
        }
        const data = await response.json();
        console.log('restapi:workspaces:GET:data', data)
        const workspaces = await Promise.all((data.workspaces || []).map(async (ws: any) => {
            let dbWorkspace: any = await getWorkspaceById(ws.slug);
            if(!dbWorkspace){
                return false;
            }
            return {
                id: String(ws.id),
                slug: dbWorkspace.id || ws.slug,
                title: dbWorkspace.name || ws.name,            
                description: dbWorkspace.description || ws.name,
                color: dbWorkspace.styleColor,
                symbol: dbWorkspace.symbol || dbWorkspace.name.substring(0, 1).toUpperCase(), // Default if missing
                createdAt: new Date(dbWorkspace.createdAt).getTime(), // Convert ISO string to timestamp            
                organizationId: dbWorkspace.organizationId,
                fileContexts: dbWorkspace.fileContexts || [],
                folders: dbWorkspace.folders || [],
                threads: (dbWorkspace.chatSessions || []).filter((s: any) => s.userId === token.id),
                //it should be in external model
                chatMode: ws.chatMode,
                chatProvider: ws.chatProvider,
                openModel: ws.openAiModel,            
                openAiHistory: ws.openAiHistory,
                similarityThreshold: ws.similarityThreshold,
                // openAiPrompt: ws.openAiPrompt,
                systemInstruction: ws.openAiPrompt,
                openAiTemp: ws.openAiTemp,
                queryRefusalResponse: ws.queryRefusalResponse,
                vectorSearchMode: ws.vectorSearchMode,
                topN: ws.topN,
                lastUpdatedAt: ws.lastUpdatedAt
            };
        }));
        return NextResponse.json(workspaces.filter((ws: any) => ws !== false));         
        */
        const workspaces = await getUserWorkspaces(token.id);
        return NextResponse.json(workspaces);
    } catch (error) {
        console.error("GET Workspaces error:", error);
        return NextResponse.json({ message: 'Failed to fetch workspaces' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    try {
        const body = await req.json();
        // Basic validation
        if (!body.title) {
            return NextResponse.json({ message: 'Title is required' }, { status: 400 });
        }
        /*
        const ragApiUrl = process.env.RAG_API_URL;
        const token = process.env.RAG_API_KEY;
        if (!ragApiUrl || !token) {
            console.error("Failed to create workspace: RAG_API_URL or RAG_API_KEY is not configured");
            return NextResponse.json({ message: 'Failed to create workspace: RAG_API_URL or RAG_API_KEY is not configured' }, { status: 500 });
        }

        const slug = `ws-${nanoid(12)}`;
        const payload = {
            name: slug, 
            similarityThreshold: body.similarityThreshold || 0.3,
            openAiTemp: body.openAiTemp || 0.7,
            openAiHistory: body.openAiHistory || 20,
            openAiPrompt: body.openAiPrompt || DEFAULT_SYSTEM_INSTRUCTION,
            queryRefusalResponse: body.queryRefusalResponse || "I'm sorry, but I cannot answer this question.\nThere is no relevant information in this workspace to answer your query.",
            chatMode: body.chatMode || "chat",
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
            description: ws.description || body.description || 'Secure AI workspace for document retrieval and RAG.',
            symbol: ws.symbol || ws.name.substring(0, 1).toUpperCase(),
            color: ws.color || DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)],
            systemInstruction: ws.openAiPrompt || null,
            openAiTemp: ws.openAiTemp,
            lastUpdatedAt: ws.lastUpdatedAt,
        };
        
        // do update workspace name (POST /v1/workspace/{slug}/update)
        const responseUpdate = await fetch(`${ragApiUrl}/api/v1/workspace/${ws.slug}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: `${session.user.userName}:${body.title}`,
                openAiPrompt: payload.openAiPrompt
            })
        });
        if (!responseUpdate.ok) {
            const message = await responseUpdate.json();
            console.error("External API error (POST):", responseUpdate.status, message?.error);
            return NextResponse.json({ message: message?.error || 'Failed to update workspace' }, { status: responseUpdate.status });
        }        
        const dataUpdate = await responseUpdate.json(); 
        newWorkspace.title = body.title || dataUpdate.workspace.name;
        
        // do assign users to workspace (POST /v1/admin/workspaces/{slug}/manage-users)
        await fetch(`${ragApiUrl}/api/v1/admin/workspaces/${ws.slug}/manage-users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                userIds: [session.user.ssoAuthId],
                reset: true
            })
        });        
        
        // do create folder for workspace (POST /v1/document/create-folder)
        await fetch(`${ragApiUrl}/api/v1/document/create-folder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: newWorkspace.slug
            })
        });
        */


        const slug = `ws-${nanoid(12)}`;
        // const newWorkspace: WorkspaceType = {
        //     id: slug,
        //     title: body.title,
        //     slug: slug,            
        //     description: body.description || 'Secure AI workspace for document retrieval and RAG.',
        //     symbol: body.symbol || body.title.substring(0, 1).toUpperCase(),
        //     color: DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)]            
        // };        

        // do create workspace in database
        const newWorkspace = await createWorkspaceService({
            id: slug,
            name: body.title,
            description: body.description || 'Secure AI workspace for document retrieval and RAG.',
            organizationId: session.user.id, // assume user id is default organization id
            userId: [session.user.id]
        });
        
        return NextResponse.json(newWorkspace, { status: 201 });
    } catch (error) {
        console.error("POST Workspace error:", error);
        return NextResponse.json({ message: 'Failed to create workspace' }, { status: 500 });
    }
}
