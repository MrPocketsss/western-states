// project files
import { PermissionResult, getPermission } from './queries/getPermission'
import { getPermissions } from './queries/getPermissions'
import { getRole, RoleResult } from './queries/getRole'
import { getRoles } from './queries/getRoles'
import { createPermission } from './mutations/createPermission'
import { updatePermission } from './mutations/updatePermission'
import { deletePermission } from './mutations/deletePermission'
import { createRole } from './mutations/createRole'
import { updateRole } from './mutations/updateRole'
import { deleteRole } from './mutations/deleteRole'

// generated types
import { PermRoleNotFoundError } from '../../generated/graphql'

export const roleResolvers = {
  resolverTypes: {
    PermissionResult,
    RoleResult,
  },
  queries: {
    getPermission,
    getPermissions,
    getRole,
    getRoles,
  },
  mutations: {
    createPermission,
    updatePermission,
    deletePermission,
    createRole,
    updateRole,
    deleteRole,
  },
}

export const PermissionObject = {
  __typeName: 'Permission',
}
export const RoleObject = {
  __typeName: 'Role',
}
export const PermRoleNotFound: PermRoleNotFoundError = {
  __typename: 'PermRoleNotFoundError',
  message: "Sorry, that permission doesn't seem to exist",
}
