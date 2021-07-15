// project files
import { Context } from '../../../context'
import { hasOwnProperty } from '../../../utils/hasOwnProperty'
import { PermissionObject, PermRoleNotFound } from '../index'

// generated types
import {
  Permission,
  PermissionResultResolvers,
  PermRoleNotFoundError,
  QueryGetPermissionArgs,
  RequireFields,
  Resolver,
  ResolversTypes,
} from '../../../generated/graphql'

export const PermissionResult: PermissionResultResolvers<
  Context,
  Permission | PermRoleNotFoundError
> = {
  __resolveType: (obj) =>
    hasOwnProperty(obj, 'verb') ? 'Permission' : 'PermRoleNotFoundError',
}
export const getPermission: Resolver<
  ResolversTypes['PermissionResult'],
  {},
  Context,
  RequireFields<QueryGetPermissionArgs, 'id'>
> = async (_parent, args, context, _info) => {
  const permission = await context.prisma.permission.findUnique({
    where: { id: args.id },
    include: {
      roles: true,
    },
  })

  if (!permission) return PermRoleNotFound

  return {
    ...PermissionObject,
    ...permission,
  }
}
