import { Role } from '@prisma/client'
import { Context } from '../../../context'

import {
  MutationUpdateRoleArgs,
  RequireFields,
  Resolver,
  ResolversTypes,
} from '../../../generated/graphql'

interface Data {
  name?: string
  permissions?: any
}

export const updateRole: Resolver<
  ResolversTypes['RoleResult'],
  {},
  Context,
  RequireFields<MutationUpdateRoleArgs, never>
> = async (_parent, args, context, _info) => {
  const { id, name, permissions } = args.input

  const updateData: Data = {}
  if (name) updateData['name'] = name
  if (permissions)
    updateData['permissions'] = {
      set: permissions.map((id) => ({ id })),
    }

  return await context.prisma.role.update({
    where: { id: args.input.id },
    data: updateData,
    include: { permissions: true },
  })
}
