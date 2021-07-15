import { Context } from '../../../context'

import {
  MutationDeletePermissionArgs,
  RequireFields,
  Resolver,
  ResolversTypes,
} from '../../../generated/graphql'

export const deletePermission: Resolver<
  ResolversTypes['PermissionResult'],
  {},
  Context,
  RequireFields<MutationDeletePermissionArgs, never>
> = async (_parent, args, context, _info) => {
  const { id } = args.input

  const permission = await context.prisma.permission.delete({
    where: { id },
  })

  return permission
}
