import { PrismaLibSql } from '@prisma/adapter-libsql'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || 'file:./dev.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter: adapter as any })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
