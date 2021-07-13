// import modules
import * as argon2 from 'argon2'

// project files
import { Context } from '../../../context'
import { sign } from '../../../utils/jwt'
import { passwordTest } from '../../../utils/passwordCheck'
import { UserInvalidInput } from '../index'

// generated types
import {
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
  UserInvalidInputError,
  AuthPayload,
  MutationResetUserArgs,
} from '../../../generated/graphql'

export const resetUser: Resolver<
  ResolverTypeWrapper<AuthPayload> | ResolverTypeWrapper<UserInvalidInputError>,
  {},
  Context,
  RequireFields<MutationResetUserArgs, never>
> = async (_parent, args, context: Context, _info) => {
  const user = await context.prisma.user.findFirst({
    where: { tempCode: args.input.tempCode },
  })

  if (!user)
    return {
      ...UserInvalidInput,
      field: 'tempCode',
      message: 'No user exists with that code!',
    }
  // if the code is no longer valid
  if (user.tempCodeExpires.getTime() > Date.now())
    return {
      ...UserInvalidInput,
      field: 'code',
      message: 'Sorry, that link has expired.',
    }

  // check if password is good, if not return the error message
  const pass = passwordTest(args.input.password)
  if (typeof pass === 'object') return pass

  try {
    await context.prisma.user.update({
      where: { id: user.id },
      data: {
        password: await argon2.hash(args.input.password),
        tempCode: null,
        tempCodeExpires: null,
      },
    })

    const payload: AuthPayload = {
      __typename: 'AuthPayload',
      token: sign(user.id, false),
      refresh: sign(user.id, true),
    }

    return payload
  } catch (error) {
    console.error('An error occurred O.O', error)
    throw new Error(error)
  }
}
