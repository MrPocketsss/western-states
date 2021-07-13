// modules
import cuid from 'cuid'

// project files
import { sendMail } from '../../../utils/sendGrid'
import { hasOwnProperty } from '../../../utils/hasOwnProperty'
import { Context } from '../../../context'
import { RegisterUserObject, UserInvalidInput } from '../index'

// generated types
import {
  Maybe,
  MutationRegisterArgs,
  RegisterResultResolvers,
  RegisterUser,
  RequireFields,
  Resolver,
  ResolversTypes,
  UserInvalidInputError,
} from '../../../generated/graphql'

export const RegisterResult: RegisterResultResolvers<
  Context,
  RegisterUser | UserInvalidInputError
> = {
  __resolveType: (obj) =>
    hasOwnProperty(obj, 'id') ? 'RegisterUser' : 'UserInvalidInputError',
}

export const register: Resolver<
  Maybe<ResolversTypes['RegisterResult']>,
  {},
  Context,
  RequireFields<MutationRegisterArgs, never>
> = async (_parent, args, context, _info) => {
  const { email } = args.input
  const tempCode = cuid()
  const tempCodeExpires = new Date(Date.now() + 3600 * 1000 * 24) // exires one day from creation

  // make sure email is okay
  if (email.indexOf('@') < 0) {
    const output: UserInvalidInputError = {
      ...UserInvalidInput,
      field: 'email',
      message: 'Please enter a valid email address',
    }
    return output
  }

  try {
    const user = await context.prisma.user.create({
      data: {
        email,
        password: '',
        tempCode,
        tempCodeExpires,
        firstName: args.input?.firstName,
        lastName: args.input?.lastName,
        settings: {
          darkMode: false,
        },
      },
    })

    sendMail({ emailKind: 'register', to: email, tempCode })

    const userResult: RegisterUser = {
      ...RegisterUserObject,
      ...user,
      id: user.id.toString(),
    }

    return userResult
  } catch (error) {
    if (
      error.message.includes(
        'Unique constraint failed on the fields: (`email`)'
      )
    ) {
      return {
        ...UserInvalidInput,
        field: 'email',
        message: 'That email address is already registered. Try again',
      }
    }
  }
}
