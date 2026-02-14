import { prisma } from '@/server/lib/db'
import { Prisma } from '@prisma/client'
import { mapFolder, mapFileContext } from './workspace'

export const createFolder = async (data: Prisma.FolderUncheckedCreateInput) => {
  return await prisma.folder.create({
    data
  })
}

export const getFolderById = async (id: string) => {
  const folder = await prisma.folder.findFirst({
    where: {
      id,
      deletedAt: null
    }
  })
  return folder ? mapFolder(folder) : null
}

export const getFolderContent = async (folderId: string) => {
  const subFolders = await prisma.folder.findMany({
    where: {
      parentFolderId: folderId,
      deletedAt: null
    },
    orderBy: { createdAt: 'desc' }
  })

  const fileContexts = await prisma.fileContext.findMany({
    where: {
      folderId,
      deletedAt: null
    },
    orderBy: { createdAt: 'desc' }
  })

  return { 
    subFolders: subFolders.map(mapFolder), 
    fileContexts: fileContexts.map(mapFileContext) 
  }
}


export const updateFolder = async (id: string, data: Prisma.FolderUpdateInput) => {
  return await prisma.folder.update({
    where: { id },
    data
  })
}

export const deleteFolder = async (id: string, permanent: boolean = false) => {
    if (permanent) {
        return await prisma.folder.delete({
            where: { id }
        })
    }
    return await prisma.folder.update({
        where: { id },
        data: { deletedAt: new Date() }
    })
}

export const isFolderNameDuplicate = async (workspaceId: string, name: string, parentFolderId: string | null, excludeFolderId?: string) => {
    const existing = await prisma.folder.findFirst({
        where: {
            workspaceId,
            name,
            parentFolderId,
            deletedAt: null,            
            NOT: excludeFolderId ? { id: excludeFolderId } : undefined
        }
    })
    return !!existing
}
