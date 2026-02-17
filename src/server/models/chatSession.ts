
import { prisma } from '@/server/lib/db'
import { ChatSession, Message, Role } from '@/shared/types/types'
import { v4 as uuidv4 } from 'uuid'

export const mapChatMessage = (m: any): Message => ({
    id: m.id,
    role: m.role as Role,
    text: m.text,
    attachments: m.attachments ? JSON.parse(m.attachments) : [],
    timestamp: m.createdAt.getTime(),
    isError: m.isError === 1
})

export const mapChatSession = (s: any): ChatSession => ({
    id: s.id,
    slug: s.slug || undefined,
    workspaceId: s.workspaceId,
    userId: s.userId || undefined,
    title: s.title,
    modelId: s.modelId,
    createdAt: s.createdAt.getTime(),
    fileContextIds: s.fileContextIds ? JSON.parse(s.fileContextIds) : [],
    messages: (s.messages || []).map(mapChatMessage)
})

export const getChatSessionsByWorkspaceId = async (workspaceId: string) => {
    const sessions = await prisma.chatSession.findMany({
        where: {
            workspaceId,
            deletedAt: null
        },
        include: {
            messages: {
                orderBy: { createdAt: 'asc' }
            }
        },
        orderBy: { createdAt: 'desc' }
    })
    return sessions.map(mapChatSession)
}

export const getChatSessionById = async (id: string) => {
    const session = await prisma.chatSession.findUnique({
        where: { id },
        include: {
            messages: {
                orderBy: { createdAt: 'asc' }
            }
        }
    })
    if (!session || session.deletedAt) return null
    return mapChatSession(session)
}

export const createChatSession = async (data: ChatSession) => {
    const created = await prisma.chatSession.create({
        data: {
            id: data.id || uuidv4(),
            slug: data.slug || null,
            workspaceId: data.workspaceId,
            userId: data.userId || null,
            title: data.title || 'New Chat',
            modelId: data.modelId,
            fileContextIds: data.fileContextIds ? JSON.stringify(data.fileContextIds) : JSON.stringify([]),
            messages: {
                create: (data.messages || []).map((m: Message) => ({
                    id: m.id || uuidv4(),
                    role: m.role,
                    text: m.text,
                    attachments: m.attachments ? JSON.stringify(m.attachments) : null,
                    isError: m.isError ? 1 : 0,
                    createdAt: m.timestamp ? new Date(m.timestamp) : new Date()
                }))
            }
        },
        include: {
            messages: true
        }
    })
    return mapChatSession(created)
}

export const updateChatSession = async (id: string, data: Partial<ChatSession>) => {
    const updateData: any = {}
    if (data.slug !== undefined) updateData.slug = data.slug
    if (data.title !== undefined) updateData.title = data.title
    if (data.modelId !== undefined) updateData.modelId = data.modelId
    if (data.fileContextIds !== undefined) updateData.fileContextIds = JSON.stringify(data.fileContextIds)
    
    console.log("updateChatSession", { sessionId: id, messages: data.messages?.length });
    if (data.messages) {
        // Simple re-sync
        await prisma.chatMessage.deleteMany({
            where: { sessionId: id }
        })

        updateData.messages = {
            create: data.messages.map((m: Message) => ({
                id: m.id || uuidv4(),
                role: m.role,
                text: m.text,
                attachments: m.attachments ? JSON.stringify(m.attachments) : null,
                isError: m.isError ? 1 : 0,
                createdAt: m.timestamp ? new Date(m.timestamp) : new Date()
            }))
        }
    }
    console.log("updateChatSession", { sessionId: id, data: updateData });
    const updated = await prisma.chatSession.update({
        where: { id },
        data: {...updateData, modelId: null},
        include: {
            messages: { orderBy: { createdAt: 'asc' } }
        }
    })
    return mapChatSession(updated)
}

export const deleteChatSession = async (id: string, permanent: boolean = false) => {
    if (permanent) {
        return await prisma.chatSession.delete({ where: { id } })
    }
    return await prisma.chatSession.update({
        where: { id },
        data: { deletedAt: new Date() }
    })
}
