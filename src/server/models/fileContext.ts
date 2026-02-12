import { prisma } from '@/server/lib/db'
import { Prisma } from '@prisma/client'
import { mapFileContext } from './workspace'
import { FileContext } from '@/shared/types/types'

export const createFileContext = async (data: Omit<Prisma.FileContextUncheckedCreateInput, 'meta'> & { meta?: any }) => {
  const { meta, ...rest } = data
  const metaString = meta ? JSON.stringify(meta) : null

  const fileContext = await prisma.fileContext.create({
    data: {
      ...rest,
      meta: metaString
    }
  })

  return mapFileContext(fileContext)
}

export const getFileContextById = async (id: string) => {
  const fileContext = await prisma.fileContext.findFirst({
    where: {
      id,
      deletedAt: null
    }
  })

  if (!fileContext) return null

  return mapFileContext(fileContext)
}

export const listFileContextsByWorkspace = async (workspaceId: string) => {
  const fileContexts = await prisma.fileContext.findMany({
    where: {
      workspaceId,
      deletedAt: null
    },
    orderBy: { createdAt: 'desc' }
  })

  return fileContexts.map(mapFileContext)
}

export const updateFileContext = async (id: string, data: Omit<Prisma.FileContextUncheckedUpdateInput, 'meta'> & { meta?: any }) => {
  const { meta, ...rest } = data
  const updateData: Prisma.FileContextUncheckedUpdateInput = { ...rest }

  if (meta !== undefined) {
    updateData.meta = meta ? JSON.stringify(meta) : null
  }

  const fileContext = await prisma.fileContext.update({
    where: { id },
    data: updateData
  })

  return mapFileContext(fileContext)
}

export const deleteFileContext = async (id: string, permanent: boolean = false) => {
    if (permanent) {
        return await prisma.fileContext.delete({
            where: { id }
        })
    }
    return await prisma.fileContext.update({
        where: { id },
        data: { deletedAt: new Date() }
    })
}
