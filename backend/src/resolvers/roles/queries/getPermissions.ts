// project files
import { Context } from '../../../context'

//generated types
import {
  Resolver,
  ResolverTypeWrapper,
  Permission,
} from '../../../generated/graphql'

export const getPermissions: Resolver<
  ResolverTypeWrapper<Permission>[],
  {},
  Context,
  {}
> = async (_parent, _args, context, _info) => {
  const users = await context.prisma.permission.findMany({})

  return users ? users : []
}
