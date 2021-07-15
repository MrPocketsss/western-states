import { Context } from '../../../context'

import {
  MutationDeleteRoleArgs,
  RequireFields,
  Resolver,
  ResolversTypes,
} from '../../../generated/graphql'

export const deleteRole: Resolver<
  ResolversTypes['RoleResult'],
  {},
  Context,
  RequireFields<MutationDeleteRoleArgs, never>
> = async (_parent, args, context, _info) => {
  const { id } = args.input

  const role = await context.prisma.role.delete({
    where: { id },
  })

  return role
}
