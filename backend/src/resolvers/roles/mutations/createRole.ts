import { Context } from '../../../context'

import {
  MutationCreateRoleArgs,
  RequireFields,
  Resolver,
  ResolversTypes,
} from '../../../generated/graphql'

export const createRole: Resolver<
  ResolversTypes['RoleResult'],
  {},
  Context,
  RequireFields<MutationCreateRoleArgs, never>
> = async (_parent, args, context, _info) => {
  const { name } = args.input

  const role = await context.prisma.role.create({
    data: {
      name,
    },
  })

  return role
}
