'use server'
import type { Workspace } from '@/shared/types/types'

export async function createWorkspace(workspace: Workspace) {
  try {
    const ragApiUrl = process.env.RAG_API_URL;
    const token = process.env.RAG_API_KEY;
    if (!ragApiUrl || !token) {
      console.error("Failed to create workspace: RAG_API_URL or RAG_API_KEY is not configured");
      return { success: false, message: 'Failed to create workspace: RAG_API_URL or RAG_API_KEY is not configured' };
    }
    /*
    const payload = {
        name: workspace.title, 
        similarityThreshold: workspace.similarityThreshold || 0.3,
        openAiTemp: workspace.openAiTemp || 0.7,
        openAiHistory: workspace.openAiHistory || 20,
        openAiPrompt: workspace.systemInstruction || DEFAULT_SYSTEM_INSTRUCTION,
        queryRefusalResponse: workspace.queryRefusalResponse || "I'm sorry, but I cannot answer this question.\nThere is no relevant information in this workspace to answer your query.",
        chatMode: "chat",
        topN: 4
    };
    */

    const response = await fetch(`${ragApiUrl}/api/workspaces`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(workspace)
    });
    if (!response.ok) {
        const message = await response.json();
        console.error("External API error:", response.status, message?.error);
        return { success: false, message: message?.error || 'Failed to create workspace' };
    }
    const data = await response.json();

    // do update workspace name (POST /v1/workspace/{slug}/update)
    /*
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
    */
        
    // do assign users to workspace (POST /v1/admin/workspaces/{slug}/manage-users)
    /*
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
    */
      
    // do create folder for workspace (POST /v1/document/create-folder)
    /*
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

    return { success: true, data };
  } catch (error) {
    console.error('Failed to create workspace:', error)
    return { success: false, message: 'Failed to create workspace' }
  }
}

/*
import { createWorkspaceService, addUserToWorkspaceService, deleteWorkspaceService } from '@/server/models/workspace'
import { revalidatePath } from 'next/cache'
import { auth } from '@/server/lib/auth'
async function getSession() {
  return await auth()
}
const workspaceSchema = z.object({
  name: z.string().min(1, 'Workspace name is required'),
  description: z.string().optional(),
  styleColor: z.string().optional(),
})

const addUserSchema = z.object({
  workspaceId: z.string(),
  userId: z.string() // Usually this would come from hidden input or session
})

export async function createWorkspaceAction(prevState: any, formData: FormData) {
  const session = await getSession()
  if (!session) return { success: false, message: 'Unauthorized' }
  
  try {
    const rawData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      styleColor: formData.get('styleColor') as string,
    }

    const validatedData = workspaceSchema.parse(rawData)

    await createWorkspaceService(validatedData)
    
    revalidatePath('/workspaces') // Or wherever the list is shown
    return { success: true, message: 'Workspace created successfully' }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors }
    }
    console.error('Failed to create workspace:', error)
    return { success: false, message: 'Failed to create workspace' }
  }
}

export async function addUserToWorkspaceAction(workspaceId: string, userId: string) {
    const session = await getSession()
    if (!session) return { success: false, message: 'Unauthorized' }

    try {
        await addUserToWorkspaceService(workspaceId, userId)
        revalidatePath(`/workspaces/${workspaceId}`)
        return { success: true }
    } catch (error) {
        console.error('Failed to add user:', error)
        return { success: false, message: 'Failed to add user' }
    }
}

export async function deleteWorkspaceAction(workspaceId: string) {
    const session = await getSession()
    if (!session) return { success: false, message: 'Unauthorized' }

    try {
        await deleteWorkspaceService(workspaceId)
        revalidatePath('/workspaces')
        return { success: true }
    } catch (error) {
        console.error('Failed to delete workspace:', error)
        return { success: false, message: 'Failed to delete workspace' }
    }
}
*/
