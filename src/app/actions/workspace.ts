
'use server'

import { z } from 'zod'
import { createWorkspaceService, addUserToWorkspaceService, deleteWorkspaceService } from '@/models/workspace'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'

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
