import { Context } from '../../../context'

import {
  MutationUpdatePermissionArgs,
  Permission,
  PermissionModel,
  RequireFields,
  Resolver,
  ResolversTypes,
} from '../../../generated/graphql'

export const updatePermission: Resolver<
  ResolversTypes['PermissionResult'],
  {},
  Context,
  RequireFields<MutationUpdatePermissionArgs, never>
> = async (_parent, args, context, _info) => {
  const { id, verb, resource, own } = args.input

  const oldPermission: Permission = await context.prisma.permission.findFirst({
    where: { id },
    include: { roles: true },
  })

  const newPermission: Permission = await context.prisma.permission.update({
    where: { id },
    data: {
      verb: verb ? verb : oldPermission.verb,
      resource: resource ? resource : oldPermission.resource,
      own: own ? own : oldPermission.own,
    },
  })

  return newPermission
}
