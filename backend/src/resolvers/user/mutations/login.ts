// modules
import * as argon2 from 'argon2'

// project files
import { sign } from '../../../utils/jwt'
import { hasOwnProperty } from '../../../utils/hasOwnProperty'
import { Context } from '../../../context'
import { UserInvalidInput } from '../index'

// generated types
import {
  AuthPayload,
  LoginResultResolvers,
  MutationLoginArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
  UserInvalidInputError,
} from '../../../generated/graphql'

export const LoginResult: LoginResultResolvers<
  any,
  AuthPayload | UserInvalidInputError
> = {
  __resolveType: (obj) =>
    hasOwnProperty(obj, 'token') ? 'AuthPayload' : 'UserInvalidInputError',
}

export const login: Resolver<
  ResolverTypeWrapper<AuthPayload> | ResolverTypeWrapper<UserInvalidInputError>,
  {},
  Context,
  RequireFields<MutationLoginArgs, never>
> = async (_parent, args, context: Context, _info) => {
  const { email, password } = args.input
  const badLogin: UserInvalidInputError = {
    ...UserInvalidInput,
    field: 'login',
    message: 'Incorrect email or password',
  }

  const user = await context.prisma.user.findUnique({
    where: { email },
  })

  if (!user) return badLogin

  if (!argon2.verify(user.password, password)) return badLogin

  const payload: AuthPayload = {
    __typename: 'AuthPayload',
    token: sign(user.id, false),
    refresh: sign(user.id, true),
  }

  return payload
}
