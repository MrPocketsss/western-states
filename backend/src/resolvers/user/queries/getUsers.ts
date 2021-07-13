// project files
import { Context } from '../../../context'

//generated types
import { Resolver, ResolverTypeWrapper, User } from '../../../generated/graphql'

export const getUsers: Resolver<ResolverTypeWrapper<User>[], {}, Context, {}> =
  async (_parent, _args, context: Context, _info) => {
    const users = await context.prisma.user.findMany({})
    const output = users.map((user) => ({ ...user, id: user.id.toString() }))

    return users ? output : []
  }
