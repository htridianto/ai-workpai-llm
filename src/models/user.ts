
import { prisma } from '@/lib/db'
import { Prisma } from '@prisma/client'

export const createUser = async (data: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data
  })
}

export const getUserById = async (id: string) => {
  return await prisma.user.findFirst({
    where: {
      id,
      deletedAt: null
    }
  })
}

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: {
      email,
      deletedAt: null
    }
  })
}

export const listUsers = async () => {
  return await prisma.user.findMany({
    where: {
      deletedAt: null
    },
    orderBy: {
        createdAt: 'desc'
    }
  })
}

export const updateUser = async (id: string, data: Prisma.UserUpdateInput) => {
  return await prisma.user.update({
    where: { id },
    data
  })
}

export const deleteUser = async (id: string) => {
  return await prisma.user.update({
    where: { id },
    data: {
      deletedAt: new Date()
    }
  })
}
