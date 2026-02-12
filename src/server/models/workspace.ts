
import { prisma } from '@/server/lib/db'
import { Prisma } from '@prisma/client'
import { Folder, FileContext } from '@/shared/types/types'

export const getAllWorkspaces = async () => {
  return await prisma.workspace.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' }
  })
}

// --- Constants ---

export const VIRTUAL_FOLDERS = [
  { id: '.website_links', name: '.website_links', type: 'link' },
  { id: '.whatsapp_groups', name: '.whatsapp_groups', type: 'whatsapp' },
  { id: '.databases', name: '.databases', type: 'database' }
];

// --- Mapping Helpers ---

export const mapFolder = (f: any): Folder => ({
  id: f.id,
  name: f.name,
  workspaceId: f.workspaceId,
  parentId: f.parentFolderId || undefined,
  dateCreated: f.createdAt.getTime(),
  isReadOnly: f.isSystem === 1,
  isStarred: f.isStarred === 1,
  isShared: f.isShared === 1,
  isTrashed: f.deletedAt !== null
})

export const mapFileContext = (f: any): FileContext => {
  const meta = f.meta ? JSON.parse(f.meta) : {}
  return {
    id: f.id,
    name: f.name,
    workspaceId: f.workspaceId,
    folderId: f.folderId || undefined,
    type: f.type || 'txt',
    status: f.status || 'indexed',
    size: f.size || 0,
    snippet: f.snippet || undefined,
    isStarred: f.isStarred === 1,
    isShared: f.isShared === 1,
    isTrashed: f.deletedAt !== null,
    ownerId: f.ownerId || undefined,
    dateCreated: f.createdAt.getTime(),
    progress: meta.progress !== undefined ? meta.progress : (f.status === 'indexed' ? 100 : 0),
    meta: meta
  }
}

export const getWorkspaceById = async (id: string) => {
  const ws = await prisma.workspace.findFirst({
    where: { id, deletedAt: null },
    include: {
      folders: {
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' }
      },
      fileContexts: {
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!ws) return null

  return {
    ...ws,
    id: ws.id,
    slug: ws.id,
    title: ws.name,
    createdAt: ws.createdAt.getTime(),
    folders: ws.folders.map(mapFolder),
    virtualFolders: VIRTUAL_FOLDERS.map(vf => ({
      id: vf.id,
      name: vf.name,
      workspaceId: ws.id,
      dateCreated: ws.createdAt.getTime(), // or some static date
      isVirtual: true,
      virtualType: vf.type,
      isReadOnly: true
    })),
    fileContexts: ws.fileContexts.map(mapFileContext)
  }
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

export const createWorkspaceService = async (data: { id?: string; name: string; description?: string; styleColor?: string, userId?: string[]}) => {
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
 * Get folders and file contexts for a specific workspace and folder.
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

  const fileContexts = await prisma.fileContext.findMany({
    where: {
      workspaceId,
      folderId: effectiveFolderId,
      deletedAt: null
    },
    orderBy: { createdAt: 'desc' }
  })

  return { 
    folders: folders.map(mapFolder), 
    fileContexts: fileContexts.map(mapFileContext) 
  }
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

export const deleteWorkspaceService = async (workspaceId: string, permanent: boolean = false) => {
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
