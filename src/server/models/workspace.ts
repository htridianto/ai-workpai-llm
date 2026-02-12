
import { prisma } from '@/server/lib/db'
import { Prisma } from '@prisma/client'

export const getAllWorkspaces = async () => {
  return await prisma.workspace.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' }
  })
}

export const getWorkspaceById = async (id: string) => {
  return await prisma.workspace.findFirst({
    where: { id, deletedAt: null },
  })
}

export const getUserWorkspaces = async (userId: string, search?: string) => {
  const where: Prisma.WorkspaceWhereInput = {
    deletedAt: null,
    users: {
      some: {
        userId
      }
    }
  }

  if (search) {
    where.OR = [
      { id: { contains: search } },
      { name: { contains: search } },
      { description: { contains: search } }
    ]
  }

  return await prisma.workspace.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  })
}

export const createWorkspaceService = async (data: { id?: string; name: string; description?: string; styleColor?: string, userId?: string[] }) => {
  return await prisma.$transaction(async (tx) => {
    const createData: Prisma.WorkspaceCreateInput = {
      id: data.id,
      name: data.name,
      description: data.description,
      styleColor: data.styleColor,
    }

    const workspace = await tx.workspace.create({
      data: createData
    })

    if (data.userId && data.userId.length > 0) {
      await tx.workspaceUser.createMany({
        data: data.userId.map((userId) => ({
          workspaceId: workspace.id,
          userId: userId,
          role: 'default'
        }))
      })
    }
    
    // Create default system folder "Root"
    /*
    await tx.folder.create({
      data: {
        name: 'Root',
        workspaceId: workspace.id,
        isSystem: 1,
        parentFolderId: null // Top level
      }
    })
    */

    return workspace
  })
}

/**
 * Get folders and files for a specific workspace and folder.
 * If folderId is undefined/null, it fetches the top-level items (where parentFolderId is null).
 */
export const getWorkspaceContent = async (workspaceId: string, folderId?: string | null) => {
  const effectiveFolderId = folderId || null

  const folders = await prisma.folder.findMany({
    where: {
      workspaceId,
      parentFolderId: effectiveFolderId,
      deletedAt: null
    },
    orderBy: { createdAt: 'desc' }
  })

  const files = await prisma.file.findMany({
    where: {
      workspaceId,
      folderId: effectiveFolderId,
      deletedAt: null
    },
    orderBy: { createdAt: 'desc' }
  })

  const parsedFiles = files.map(file => ({
    ...file,
    meta: file.meta ? JSON.parse(file.meta) : null
  }))

  return { folders, files: parsedFiles }
}

export const addUserToWorkspaceService = async (workspaceId: string, userId: string, role: string = 'default') => {
  // Check if already exists to avoid unique constraint error if handled loosely, 
  // but Prisma throw if duplicate on @@id.
  // We can use upsert or just create.
  return await prisma.workspaceUser.create({
    data: {
      workspaceId,
      userId,
      role
    }
  })
}

export const updateWorkspaceService = async (id: string, data: { name?: string; description?: string; styleColor?: string }) => {
  return await prisma.workspace.update({
    where: { id },
    data: data
  })
}

export const deleteWorkspaceService = async (workspaceId: string, permanent : boolean = false) => {
    if (permanent) {
        return await prisma.workspace.delete({
            where: { id: workspaceId }
        })
    }
    return await prisma.workspace.update({
        where: { id: workspaceId },
        data: { deletedAt: new Date() }
    })
}
