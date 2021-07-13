// import modules
import * as argon2 from 'argon2'

// project files
import { hasOwnProperty } from '../../../utils/hasOwnProperty'
import { Context } from '../../../context'
import { UserInvalidInput } from '../index'

// generated types
import {
  MutationUpdateUserArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
  UpdateUserResultResolvers,
  User,
  UserInvalidInputError,
} from '../../../generated/graphql'
import { passwordTest } from '../../../utils/passwordCheck'

export const UpdateUserResult: UpdateUserResultResolvers<
  Context,
  User | UserInvalidInputError
> = {
  __resolveType: (obj) =>
    hasOwnProperty(obj, 'id') ? 'User' : 'UserInvalidInputError',
}

export const updateUser: Resolver<
  ResolverTypeWrapper<User> | ResolverTypeWrapper<UserInvalidInputError>,
  {},
  Context,
  RequireFields<MutationUpdateUserArgs, never>
> = async (_parent, args, context: Context, _info) => {
  const { id, newEmail, newPassword, newFirstName, newLastName, newSettings } =
    args.input

  // check if password is good, if not return the error message
  const pass = passwordTest(newPassword)
  if (typeof pass === 'object') return pass

  const user = await context.prisma.user.findFirst({
    where: { id: parseInt(id, 10) },
  })

  if (!user)
    return {
      ...UserInvalidInput,
      field: 'update',
      message: "That user doesn't exist!",
    }

  try {
    const updatedUser = await context.prisma.user.update({
      where: { id: user.id },
      data: {
        email: newEmail ? newEmail : user.email,
        password: newPassword ? await argon2.hash(newPassword) : user.password,
        firstName: newFirstName ? newFirstName : user.firstName,
        lastName: newLastName ? newLastName : user.lastName,
        settings: newSettings ? newSettings : user.settings,
      },
    })
    return { ...updatedUser, id: updatedUser.id.toString() }
  } catch (error) {
    console.error('Oops, an error!', error)

    throw new Error(error)
  }
}
