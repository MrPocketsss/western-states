// project files
import { Context } from '../../../context'
import { hasOwnProperty } from '../../../utils/hasOwnProperty'
import { RoleObject, PermRoleNotFound } from '../index'

// generated types
import {
  PermRoleNotFoundError,
  QueryGetRoleArgs,
  RequireFields,
  Resolver,
  ResolversTypes,
  Role,
  RoleResultResolvers,
} from '../../../generated/graphql'

export const RoleResult: RoleResultResolvers<
  Context,
  Role | PermRoleNotFoundError
> = {
  __resolveType: (obj) =>
    hasOwnProperty(obj, 'name') ? 'Role' : 'PermRoleNotFoundError',
}

export const getRole: Resolver<
  ResolversTypes['RoleResult'],
  {},
  Context,
  RequireFields<QueryGetRoleArgs, 'id'>
> = async (_parent, args, context, _info) => {
  const role = await context.prisma.role.findUnique({
    where: { id: args.id },
    include: {
      permissions: true,
    },
  })

  if (!role) return PermRoleNotFound

  return {
    ...RoleObject,
    ...role,
  }
}
