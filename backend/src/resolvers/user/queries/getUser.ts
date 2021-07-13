// project files
import { Context } from '../../../context'
import { hasOwnProperty } from '../../../utils/hasOwnProperty'
import { UserObject, UserNotFound } from '../index'

// generated types
import {
  GetUserResultResolvers,
  QueryGetUserArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
  User,
  UserNotFoundError,
} from '../../../generated/graphql'

export const GetUserResult: GetUserResultResolvers<
  Context,
  User | UserNotFoundError
> = {
  __resolveType: (obj) =>
    hasOwnProperty(obj, 'email') ? 'User' : 'UserNotFoundError',
}

export const getUser: Resolver<
  ResolverTypeWrapper<User> | ResolverTypeWrapper<UserNotFoundError>,
  {},
  Context,
  RequireFields<QueryGetUserArgs, 'id'>
> = async (_parent, args, context, _info) => {
  console.log("I'm getting the user id: ", context.userId)
  const user = await context.prisma.user.findUnique({
    where: {
      id: args.id,
    },
  })

  if (!user) return UserNotFound

  return { ...UserObject, ...user, id: user.id.toString() }
}
