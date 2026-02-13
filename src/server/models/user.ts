
import { prisma } from '@/server/lib/db'
import { Prisma } from '@prisma/client'

export const createUser = async (data: Prisma.UserCreateInput) => {
  /*
  return await prisma.user.create({
    data
  })
  */  
  return await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: data
    })    

    //do: create default organization for new user, with organization id is new user id, check if organization with id is new user id already exists first
    const existingOrganization = await tx.organization.findUnique({
      where: {
        id: newUser.id
      }
    })
    if (existingOrganization) {
      return newUser
    }
    const newOrganization = await tx.organization.create({
      data: {
        id: newUser.id,
        name: newUser.name + ' Team',
        description: 'Default organization for ' + newUser.name + ' team',
      }
    })
    return newUser
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

export const deleteUser = async (id: string, permanent: boolean = false) => {
  if (permanent) {
    return await prisma.user.delete({
      where: { id }
    })
  }
  return await prisma.user.update({
    where: { id },
    data: {
      deletedAt: new Date()
    }
  })
}
