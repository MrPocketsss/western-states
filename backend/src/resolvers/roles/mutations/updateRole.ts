import { Role } from '@prisma/client'
import { Context } from '../../../context'

import {
  MutationUpdateRoleArgs,
  RequireFields,
  Resolver,
  ResolversTypes,
} from '../../../generated/graphql'

export const updateRole: Resolver<
  ResolversTypes['RoleResult'],
  {},
  Context,
  RequireFields<MutationUpdateRoleArgs, never>
> = async (_parent, args, context, _info) => {
  const { id, name, permissions } = args.input

  const permissionSet = permissions.map((id) => ({ id }))

  const oldRole: Role = await context.prisma.role.findFirst({
    where: { id },
    include: {
      permissions: {
        select: { id: true },
      },
    },
  })

  const newRole = await context.prisma.role.update({
    where: { id },
    data: {
      name: name ? name : oldRole.name,
      permissions: { connect: permissionSet },
    },
    include: { permissions: true },
  })

  return newRole
}
