import { Context } from '../../../context'

import {
  MutationupdatePermissionArgs,
  RequireFields,
  Resolver,
  ResolversTypes,
} from '../../../generated/graphql'

export const updatePermission: Resolver<
  ResolversTypes['PermissionResult'],
  {},
  Context,
  RequireFields<MutationupdatePermissionArgs, never>
> = async (_parent, args, context, _info) => {
  return await context.prisma.permission.update({
    where: { id: args.input.id },
    data: {},
  })
}
