// import modules
import cuid from 'cuid'
import * as argon2 from 'argon2'

// import project files
import {
  User,
  GetUserResultResolvers,
  UserNotFoundError,
  QueryGetUserArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
  RegisterResultResolvers,
  UserInvalidInputError,
  MutationRegisterArgs,
  RegisterUser,
  AuthPayload,
  MutationLoginArgs,
  LoginResultResolvers,
} from '../generated/graphql'
import { Context } from '../context'
import { hasOwnProperty } from '../utils/hasOwnProperty'
import { sendMail } from '../utils/sendGrid'
import { sign, verify } from '../utils/jwt'

// user types
const UserObject = {
  __typeName: 'User',
}
const RegisterUserObject = {
  __typeName: 'RegisterUser',
}
const UserNotFound: UserNotFoundError = {
  __typename: 'UserNotFoundError',
  message: "Sorry, that user does't exist",
}

const UserInvalidInput = {
  __typeName: 'UserInvalidInputError',
  message: '',
  field: '',
}

// deals with union type resolving
export const GetUserResult: GetUserResultResolvers<
  Context,
  User | UserNotFoundError
> = {
  __resolveType: (obj) =>
    hasOwnProperty(obj, 'email') ? 'User' : 'UserNotFoundError',
}
export const RegisterResult: RegisterResultResolvers<
  Context,
  RegisterUser | UserInvalidInputError
> = {
  __resolveType: (obj) =>
    hasOwnProperty(obj, 'id') ? 'RegisterUser' : 'UserInvalidInputError',
}
export const LoginResult: LoginResultResolvers<
  any,
  AuthPayload | UserInvalidInputError
> = {
  __resolveType: (obj) =>
    hasOwnProperty(obj, 'id') ? 'AuthPayload' : 'UserInvalidInputError',
}

// queries
export const getUser: Resolver<
  ResolverTypeWrapper<User> | ResolverTypeWrapper<UserNotFoundError>,
  {},
  Context,
  RequireFields<QueryGetUserArgs, 'id'>
> = async (_parent, args, context: Context, _info) => {
  const user = await context.prisma.user.findUnique({
    where: {
      id: args.id,
    },
  })

  return user
    ? { ...UserObject, ...user, id: user.id.toString() }
    : UserNotFound
}
export const getUsers: Resolver<ResolverTypeWrapper<User>[], {}, Context, {}> =
  async (_parent, _args, context: Context, _info) => {
    const users = await context.prisma.user.findMany({})
    const output = users.map((user) => ({ ...user, id: user.id.toString() }))

    return users ? output : []
  }

// mutations
export const register: Resolver<
  | ResolverTypeWrapper<RegisterUser>
  | ResolverTypeWrapper<UserInvalidInputError>,
  {},
  Context,
  RequireFields<MutationRegisterArgs, never>
> = async (_parent, args, context: Context, _info) => {
  const { email } = args.input
  const tempPassword = cuid.slug()
  const tempPasswordExpires = new Date(Date.now() + 3600 * 1000 * 24) // exires one day from creation

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
        password: tempPassword,
        tempPassword,
        tempPasswordExpires,
        firstName: args.input?.firstName,
        lastName: args.input?.lastName,
        settings: {
          darkMode: false,
        },
      },
    })

    sendMail({ emailKind: 'register', to: email, tempPassword })

    const userResult: RegisterUser = {
      ...RegisterUserObject,
      ...user,
      id: user.id.toString(),
    }

    return userResult
  } catch (error) {
    if (error.message.includes('unique')) {
      const output: UserInvalidInputError = {
        ...UserInvalidInput,
        field: 'email',
        message: 'That email address is already registered. Try again',
      }
      return output
    }
  }

  // password check should be moved to update User Password function
  // const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
  // if (!passwordRegex.test(password)) {
  //   if (!/^.{8,}$/.test(password)) return {...UserInvalidInput, field: 'password', message: 'Password must be eight characters or longer' }
  //   if (!/^.*[a-z]$/.test(password)) return {...UserInvalidInput, field: 'password', message: 'Password must contain at least one lowercase alphabetical character' }
  //   if (!/^.*[A-Z]$/.test(password)) return {...UserInvalidInput, field: 'password', message: 'Password must contain at least one uppercase alphabetical character' }
  //   if (!/^.*[0-9]$/.test(password)) return {...UserInvalidInput, field: 'password', message: 'Password must contain at least one numeric character' }
  //   if (!/^.*[!@#$%^&*.]$/.test(password)) return {...UserInvalidInput, field: 'password', message: 'Password must contain at least one special character' }
  // }
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

// subscriptions
