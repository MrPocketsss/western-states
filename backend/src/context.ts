import { PrismaClient } from '@prisma/client'
import { Redis } from 'ioredis'

export interface Context {
  prisma: PrismaClient
  redis: Redis
  userId: number | null
}
