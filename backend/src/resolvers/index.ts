// import modules
import GraphQLJSON from 'graphql-type-json'

// import generated types
import { Resolvers } from '../generated/graphql'

// import project files
import { dateScalar } from '../utils/dateScalar'
import {
  GetUserResult,
  getUser,
  getUsers,
  login,
  LoginResult,
  register,
  RegisterResult,
} from './user'

export const resolvers: Resolvers = {
  JSON: GraphQLJSON,
  Date: dateScalar,
  GetUserResult,
  LoginResult,
  RegisterResult,
  Query: {
    getUser,
    getUsers,
  },
  Mutation: {
    register,
    login,
  },
}
