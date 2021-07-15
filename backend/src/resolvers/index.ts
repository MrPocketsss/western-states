// import modules
import GraphQLJSON from 'graphql-type-json'

// import generated types
import { Resolvers } from '../generated/graphql'

// import project files
import { dateScalar } from '../utils/dateScalar'
import { userResolvers } from './user'
import { roleResolvers } from './roles'

export const resolvers: Resolvers = {
  JSON: GraphQLJSON,
  Date: dateScalar,
  ...userResolvers.resolverTypes,
  ...roleResolvers.resolverTypes,
  Query: {
    ...userResolvers.queries,
    ...roleResolvers.queries,
  },
  Mutation: {
    ...userResolvers.mutations,
    ...roleResolvers.mutations,
  },
}
