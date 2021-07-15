// project files
import { Context } from '../../../context'

//generated types
import { Resolver, ResolverTypeWrapper, Role } from '../../../generated/graphql'

export const getRoles: Resolver<ResolverTypeWrapper<Role>[], {}, Context, {}> =
  async (_parent, _args, context, _info) => {
    const roles = await context.prisma.role.findMany({
      include: { permissions: true },
    })

    return roles ? roles : []
  }
