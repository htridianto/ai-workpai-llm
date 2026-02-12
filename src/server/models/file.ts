
import { prisma } from '@/server/lib/db'
import { Prisma } from '@prisma/client'

// Helper to handle meta parsing
export type FileWithMeta = Omit<Prisma.FileGetPayload<{}>, 'meta'> & {
  meta: any
}

export const createFile = async (data: Omit<Prisma.FileUncheckedCreateInput, 'meta'> & { meta?: any }) => {
  const { meta, ...rest } = data
  const metaString = meta ? JSON.stringify(meta) : null

  const file = await prisma.file.create({
    data: {
      ...rest,
      meta: metaString
    }
  })

  return {
    ...file,
    meta: file.meta ? JSON.parse(file.meta) : null
  }
}

export const getFileById = async (id: string): Promise<FileWithMeta | null> => {
  const file = await prisma.file.findFirst({
    where: {
      id,
      deletedAt: null
    }
  })

  if (!file) return null

  return {
    ...file,
    meta: file.meta ? JSON.parse(file.meta) : null
  }
}

export const listFilesByWorkspace = async (workspaceId: string): Promise<FileWithMeta[]> => {
  const files = await prisma.file.findMany({
    where: {
      workspaceId,
      deletedAt: null
    },
    orderBy: { createdAt: 'desc' }
  })

  return files.map(file => ({
    ...file,
    meta: file.meta ? JSON.parse(file.meta) : null
  }))
}


export const updateFile = async (id: string, data: Omit<Prisma.FileUncheckedUpdateInput, 'meta'> & { meta?: any }) => {
  const { meta, ...rest } = data
  const updateData: Prisma.FileUncheckedUpdateInput = { ...rest }

  if (meta !== undefined) {
    updateData.meta = meta ? JSON.stringify(meta) : null
  }

  const file = await prisma.file.update({
    where: { id },
    data: updateData
  })

  return {
    ...file,
    meta: file.meta ? JSON.parse(file.meta) : null
  }
}

export const deleteFile = async (id: string) => {
    return await prisma.file.update({
        where: { id },
        data: { deletedAt: new Date() }
    })
}
