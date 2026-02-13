
import { prisma } from '@/server/lib/db'
import { Prisma } from '@prisma/client'
import { UserRole } from '@/shared/types/types'

export const createOrganization = async (data: { name: string; description?: string }) => {
  return await prisma.organization.create({
    data
  })
}

export const getOrganizationById = async (id: string) => {
  return await prisma.organization.findFirst({
    where: { id, deletedAt: null },
    include: {
      users: {
        include: {
          user: true
        }
      },
      workspaces: true
    }
  })
}

export const listOrganizations = async () => {
  return await prisma.organization.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' }
  })
}

export const updateOrganization = async (id: string, data: Prisma.OrganizationUpdateInput) => {
  return await prisma.organization.update({
    where: { id },
    data
  })
}

export const deleteOrganization = async (id: string, permanent: boolean = false) => {
  if (permanent) {
    return await prisma.organization.delete({
      where: { id }
    })
  }
  return await prisma.organization.update({
    where: { id },
    data: { deletedAt: new Date() }
  })
}

export const addUserToOrganization = async (organizationId: string, userId: string, role: UserRole = 'member') => {
  return await prisma.organizationUser.upsert({
    where: {
      userId_organizationId: {
        userId,
        organizationId
      }
    },
    update: { role },
    create: {
      organizationId,
      userId,
      role
    }
  })
}

export const removeUserFromOrganization = async (organizationId: string, userId: string) => {
  return await prisma.organizationUser.delete({
    where: {
      userId_organizationId: {
        userId,
        organizationId
      }
    }
  })
}

export const getUserOrganizations = async (userId: string) => {
  return await prisma.organizationUser.findMany({
    where: { userId },
    include: {
      organization: true
    }
  })
}
