
import { prisma } from '@/server/lib/db'
import { Prisma } from '@prisma/client'
import { Folder, FileContext, Workspace as WorkspaceType } from '@/shared/types/types'
import { isStringObject } from 'util/types'
import { DEFAULT_SYSTEM_INSTRUCTION, DEFAULT_COLORS } from '@/shared/constants'
import { mapChatSession } from './chatSession'

// --- Constants ---
const systemFolders = [
  { id: '.base', name: 'Knowledge Base', isShared: true },
  { id: '.troops', name: 'Troops', isShared: true, isStarred: true },
  { id: '.links', name: '.links' },  
  { id: '.databases', name: '.databases' },
  { id: '.whatsapp', name: '.whatsapp' }  
]
// --- Mapping Helpers ---

export const mapFolder = (f: any): Folder => {
  const meta = f.meta ? JSON.parse(f.meta) : {}
  return {
    id: f.id,
    name: f.name,
    workspaceId: f.workspaceId,
    parentId: f.parentFolderId || undefined,
    dateCreated: f.createdAt.getTime(),
    isReadOnly: f.isSystem === 1,
    isStarred: f.isStarred === 1,
    isShared: f.isShared === 1,
    isTrashed: f.deletedAt !== null,
    meta: meta
  }
}

export const mapFileContext = (f: any): FileContext => {
  const meta = f.meta ? JSON.parse(f.meta) : {}

  let folderId = f.folderId || undefined;
  // if(f.type === 'whatsapp'){
  //   folderId = `.wa_number_${meta.waNumber}`;
  // }
  return {
    id: f.id,
    name: f.name,
    workspaceId: f.workspaceId,
    folderId: folderId,
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

export const mapWorkspace = (ws: any): WorkspaceType => {
  const meta = ws.meta ? JSON.parse(ws.meta) : {};
  return {
    ...ws,
    slug: ws.id,
    title: ws.name,
    id: ws.id,   
    description: ws.description || 'Secure AI workspace for document retrieval and RAG.',
    symbol: ws.name.substring(0, 1).toUpperCase(),
    color: ws.styleColor || DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)],
    organizationId: ws.organizationId,
    createdAt: ws.createdAt.getTime(),
    meta: meta,
    folders: [...ws.folders || []].map(mapFolder),
    fileContexts: [...ws.fileContexts || []].map(mapFileContext),
    threads: [...ws.chatSessions || []].map(mapChatSession),
    // systemInstruction: meta.openAiPrompt || DEFAULT_SYSTEM_INSTRUCTION,
    // openAiTemp: meta.openAiTemp || 0.7,
    // similarityThreshold: meta.similarityThreshold || 0.25    
  };
};


export const getAllWorkspaces = async () => {
  const workspaces = await prisma.workspace.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' }
  })
  return workspaces.map(mapWorkspace);
}

export const getWorkspaceById = async (id: string) => {
  const ws = await prisma.workspace.findFirst({
    where: { id, deletedAt: null },
    include: {
      folders: {
        where: { deletedAt: null },
        orderBy: [{ name: 'asc' }, { createdAt: 'desc' }]
      },
      fileContexts: {
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' }
      },
      chatSessions: {
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!ws) return null
  /*
  const waFiles = (ws.fileContexts || []).filter(f => f.type === 'whatsapp');
  const uniqueWaNumbers = Array.from(new Set(waFiles.map(f => {
    const meta = f.meta ? JSON.parse(f.meta) : {};    
    return meta.waNumber || null;
  }))).filter(n => n !== null) as string[];  

  const waVirtualFolders = uniqueWaNumbers.map(num => ({
      id: `.wa_number_${num}`,
      name: num,
      workspaceId: ws.id,
      createdAt: waFiles[0].createdAt, 
      parentFolderId: `.whatsapp-${ws.id}`,
      isSystem: 1,
      isShared: 0
  }));
  */
  // console.log('waVirtualFolders', uniqueWaNumbers, waVirtualFolders);

  return mapWorkspace(ws);
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

  const workspaces = await prisma.workspace.findMany({
    where,
    include: {
      folders: {
        where: { deletedAt: null },
        orderBy: [{ name: 'asc' }, { createdAt: 'desc' }]
      },
      fileContexts: {
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' }
      },
      chatSessions: {
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' }
      }
    },    
    orderBy: { createdAt: 'desc' }
  })
  return workspaces.map(mapWorkspace);
}

export const createWorkspaceService = async (data: { id?: string; name: string; description?: string; organizationId?: string; userId?: string[]}) => {
  return await prisma.$transaction(async (tx) => {
    const createData: Prisma.WorkspaceCreateInput = {
      id: data.id,
      name: data.name,
      description: data.description,
      styleColor: DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)],
      organization: data.organizationId ? { connect: { id: data.organizationId } } : undefined,      
      meta: JSON.stringify({
        slug: data.id,
        name: data.name,
        similarityThreshold: 0.3,
        openAiTemp: 0.7,
        openAiHistory: 20,
        openAiPrompt: DEFAULT_SYSTEM_INSTRUCTION,
        queryRefusalResponse: "I'm sorry, but I cannot answer this question.\nThere is no relevant information to answer your query.",
        chatMode: "chat",
        topN: 4
      })
    } 

    const workspace = await tx.workspace.create({
      data: createData
    })

    if (data.userId && data.userId.length > 0) {
      await tx.workspaceUser.createMany({
        data: data.userId.map((userId) => ({
          workspaceId: workspace.id,
          userId: userId
        }))
      })
    }

    
    // Create default system folder "Root"    
    const folders = await Promise.all(systemFolders.map(folder => {
      return tx.folder.create({
        data: {
          id: folder.id ? `${folder.id}-${workspace.id}` : undefined,
          name: folder.name,
          workspaceId: workspace.id,
          isSystem: 1,
          isShared: folder.isShared ? 1 : 0,
          isStarred: folder.isStarred ? 1 : 0,
          parentFolderId: null // Top level
        }
      })
    }))
    
    return mapWorkspace({...workspace, folders})
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

export const addUserToWorkspaceService = async (workspaceId: string, userId: string) => {
  // Check if already exists to avoid unique constraint error if handled loosely, 
  // but Prisma throw if duplicate on @@id.
  // We can use upsert or just create.
  return await prisma.workspaceUser.create({
    data: {
      workspaceId,
      userId
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
