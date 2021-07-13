// modules
import { Request } from 'express'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-micro'
import { applyMiddleware } from 'graphql-middleware'
import { PrismaClient } from '@prisma/client'
import Redis from 'ioredis'

// project files
import { loadFiles } from 'graphql-import-files'
import { resolvers } from './resolvers'
import { getUserId } from './utils/jwt'
import { permissions } from './permissions'

const prisma = new PrismaClient()
const redis = new Redis()

const schema = makeExecutableSchema({
  typeDefs: loadFiles('**/schema/*.gql'),
  resolvers,
})

const schemaWithMiddleware = applyMiddleware(schema, permissions)

export const apolloServer = new ApolloServer({
  schema: schemaWithMiddleware,
  context: ({ req }: { req: Request }) => {
    return {
      prisma,
      redis,
      user: req && req.headers.authorization ? getUserId(req) : null,
    }
  },
})
