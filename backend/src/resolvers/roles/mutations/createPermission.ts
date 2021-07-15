import { Context } from '../../../context'

import {
  MutationCreatePermissionArgs,
  RequireFields,
  Resolver,
  ResolversTypes,
} from '../../../generated/graphql'

export const createPermission: Resolver<
  ResolversTypes['PermissionResult'],
  {},
  Context,
  RequireFields<MutationCreatePermissionArgs, never>
> = async (_parent, args, context, _info) => {
  const { verb, resource, own } = args.input

  const permission = await context.prisma.permission.create({
    data: {
      verb,
      resource,
      own,
    },
  })

  return permission
}
