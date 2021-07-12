import { ApolloServer } from 'apollo-server-micro'
import { PrismaClient } from '@prisma/client'
import Redis from 'ioredis'

import { loadFiles } from 'graphql-import-files'

import { resolvers } from './resolvers'

const prisma = new PrismaClient()
const redis = new Redis()

export const apolloServer = new ApolloServer({
  typeDefs: loadFiles('**/schema/*.gql'),
  resolvers,
  context: () => {
    return {
      prisma,
      redis,
    }
  },
})
