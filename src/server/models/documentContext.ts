
import { prisma } from '@/server/lib/db'
import { Prisma } from '@prisma/client'

// Helper to handle meta parsing
export type DocumentContextWithMeta = Omit<Prisma.DocumentContextGetPayload<{}>, 'meta'> & {
  meta: any
}

export const createDocumentContext = async (data: Omit<Prisma.DocumentContextUncheckedCreateInput, 'meta'> & { meta?: any }) => {
  const { meta, ...rest } = data
  const metaString = meta ? JSON.stringify(meta) : null

  const documentContext = await prisma.documentContext.create({
    data: {
      ...rest,
      meta: metaString
    }
  })

  return {
    ...documentContext,
    meta: documentContext.meta ? JSON.parse(documentContext.meta) : null
  }
}

export const getDocumentContextById = async (id: string): Promise<DocumentContextWithMeta | null> => {
  const documentContext = await prisma.documentContext.findFirst({
    where: {
      id,
      deletedAt: null
    }
  })
  if (!documentContext) return null

  return {
    ...documentContext,
    meta: documentContext.meta ? JSON.parse(documentContext.meta) : null
  }
}

export const listDocumentContextsByWorkspace = async (workspaceId: string): Promise<DocumentContextWithMeta[]> => {
  const documentContexts = await prisma.documentContext.findMany({
    where: {
      workspaceId,
      deletedAt: null
    },
    orderBy: { createdAt: 'desc' }
  })

  return documentContexts.map(doc => ({
    ...doc,
    meta: doc.meta ? JSON.parse(doc.meta) : null
  }))
}


export const updateDocumentContext = async (id: string, data: Omit<Prisma.DocumentContextUncheckedUpdateInput, 'meta'> & { meta?: any }) => {
  const { meta, ...rest } = data
  const updateData: Prisma.DocumentContextUncheckedUpdateInput = { ...rest }

  if (meta !== undefined) {
    updateData.meta = meta ? JSON.stringify(meta) : null
  }

  const documentContext = await prisma.documentContext.update({
    where: { id },
    data: updateData
  })

  return {
    ...documentContext,
    meta: documentContext.meta ? JSON.parse(documentContext.meta) : null
  }
}

export const deleteDocumentContext = async (id: string) => {
    return await prisma.documentContext.update({
        where: { id },
        data: { deletedAt: new Date() }
    })
}
