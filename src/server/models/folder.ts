
import { prisma } from '@/server/lib/db'
import { Prisma } from '@prisma/client'

export const createFolder = async (data: Prisma.FolderUncheckedCreateInput) => {
  return await prisma.folder.create({
    data
  })
}

export const getFolderById = async (id: string) => {
  return await prisma.folder.findFirst({
    where: {
      id,
      deletedAt: null
    }
  })
}

export const getFolderContent = async (folderId: string) => {
  const subFolders = await prisma.folder.findMany({
    where: {
      parentFolderId: folderId,
      deletedAt: null
    },
    orderBy: { createdAt: 'desc' }
  })

  const files = await prisma.file.findMany({
    where: {
      folderId,
      deletedAt: null
    },
    orderBy: { createdAt: 'desc' }
  })

  const parsedFiles = files.map(file => ({
    ...file,
    meta: file.meta ? JSON.parse(file.meta) : null
  }))

  return { subFolders, files: parsedFiles }
}

export const updateFolder = async (id: string, data: Prisma.FolderUpdateInput) => {
  return await prisma.folder.update({
    where: { id },
    data
  })
}

export const deleteFolder = async (id: string) => {
    return await prisma.folder.update({
        where: { id },
        data: { deletedAt: new Date() }
    })
}
