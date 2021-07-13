// import modules
import GraphQLJSON from 'graphql-type-json'

// import generated types
import { Resolvers } from '../generated/graphql'

// import project files
import { dateScalar } from '../utils/dateScalar'
import { userResolvers } from './user/index'

export const resolvers: Resolvers = {
  JSON: GraphQLJSON,
  Date: dateScalar,
  ...userResolvers.resolverTypes,
  Query: {
    ...userResolvers.queries,
  },
  Mutation: {
    ...userResolvers.mutations,
  },
}
