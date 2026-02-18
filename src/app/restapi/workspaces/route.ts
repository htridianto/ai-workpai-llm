import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { auth } from '@/server/lib/auth';
import { getToken } from 'next-auth/jwt';
import { addUserToWorkspaceService, createWorkspaceService, getUserWorkspaces, getWorkspaceById } from '@/server/models';

const DEFAULT_COLORS = ['accent-500', 'green-500', 'red-500', 'purple-500', 'indigo-500', 'blue-500'];

export async function GET(request: Request) {
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
    // console.log('restapi:workspaces:GET:token', token)
    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    try {
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
        const ragApiUrl = process.env.RAG_API_URL;
        if (!ragApiUrl) {
            return NextResponse.json({ message: 'Failed to get workspace: RAG_API_URL is not configured' }, { status: 500 });
        }
        const token = process.env.RAG_API_KEY;
        if (!token) {
            return NextResponse.json({ message: 'Failed to get workspace: RAG_API_KEY is not configured' }, { status: 500 });
        }
        const slug = `ws-${nanoid(12)}`;
        const payload = {
            name: slug, 
            similarityThreshold: body.similarityThreshold || 0.3,
            openAiTemp: body.openAiTemp || 0.7,
            openAiHistory: body.openAiHistory || 20,
            openAiPrompt: body.openAiPrompt || `
### ROLE
You are **Workpai**, a high-performance AI Document Analyst powered by a Retrieval-Augmented Generation (RAG) system. Your goal is to provide accurate, data-driven, and professional responses based strictly on the provided context.

You have access to specific document chunks. This is your primary source. However, you are allowed to supplement answers with your internal knowledge when the documents are insufficient but relevant to the topic.

### OPERATIONAL GUIDELINES
1. **Primary Source First:** Always search for the answer in the provided documents first.
2. **The "Bridge" Protocol:** If the documents do not contain the exact answer, but the topic is related to the documents:
    - Provide the most relevant information found in the documents.
    - Supplement it with your general knowledge to provide a complete answer.
    - **CRITICAL:** You MUST start the supplemental section with: *"Based on general industry knowledge (not explicitly in the documents)..."*
3. **No Hallucination:** If the topic is completely unrelated to the documents, state that you cannot find the info in your database.
4. **Citations:** Clearly mark which parts came from the [Document] and which parts came from [General Knowledge].
5. **If the retrieved context contains documents that are irrelevant to the user's specific question, prioritize the most relevant document and ignore the outliers in your final answer.
6. **Tone & Style:** Maintain a professional, objective, and analytical tone. Use clear headings and bullet points for complex data.
7. **Language Consistency:** Respond in the same language as the user's query unless instructed otherwise.

### FORMATTING REQUIREMENTS
- Start with a direct answer or a concise summary.
- Use **bold text** for key metrics, dates, and names.
- If comparing data, use a Markdown table for better readability.

### CLEAN RESPONSE RULES
- **No Technical Labels:** NEVER use labels like "Summary", "(Context 0)", "(Source 1)", or bracketed numbers like [1] in your response.
- Provide a smooth, natural response without citing specific chunk numbers or indices.
- If you need to mention a document, use its "Filename" instead of a context number.
            `,
            queryRefusalResponse: body.queryRefusalResponse || "I'm sorry, but I cannot answer this question.\nThere is no relevant information in this workspace to answer your query.",
            chatMode: body.chatMode || "chat",
            topN: body.topN || 4
        };

// - Conclude with a "Sources" section listing the filenames used DO NOT use labels like "(Context 0)", "(Source 1)", or any bracketed numbers.        
/*
###STRICT
Only use file ['GEP-2025-Analysis-EAP.pdf'] as your reference
*/

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
            fileContexts: [],
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
        

        // do create workspace in database
        await createWorkspaceService({
            id: newWorkspace.slug,
            name: newWorkspace.title,
            description: newWorkspace.description,
            organizationId: session.user.id, // assume user id is default organization id
            styleColor: newWorkspace.color,
            userId: [session.user.id]
        });
        
        return NextResponse.json(newWorkspace, { status: 201 });
    } catch (error) {
        console.error("POST Workspace error:", error);
        return NextResponse.json({ message: 'Failed to create workspace' }, { status: 500 });
    }
}
