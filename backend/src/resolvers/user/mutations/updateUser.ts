// import modules
import * as argon2 from 'argon2'
import { GraphQLJSONObject } from 'graphql-type-json'

// project files
import { hasOwnProperty } from '../../../utils/hasOwnProperty'
import { Context } from '../../../context'
import { UserInvalidInput, UserObject } from '../index'

// generated types
import {
  MutationUpdateUserArgs,
  RequireFields,
  Resolver,
  ResolversTypes,
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

interface Data {
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  settings?: any
  roles?: any
}

export const updateUser: Resolver<
  ResolversTypes['UpdateUserResult'],
  {},
  Context,
  RequireFields<MutationUpdateUserArgs, never>
> = async (_parent, args, context, _info) => {
  const {
    id,
    newEmail,
    newPassword,
    newFirstName,
    newLastName,
    newSettings,
    newRoles,
  } = args.input

  const updateData: Data = {}
  if (newEmail) updateData['email'] = newEmail
  if (newPassword) updateData['password'] = await argon2.hash(newPassword)
  if (newFirstName) updateData['firstName'] = newFirstName
  if (newLastName) updateData['lastName'] = newLastName
  if (newSettings) updateData['settings'] = newSettings
  if (newRoles)
    updateData['roles'] = {
      set: newRoles.map((id) => ({ id })),
    }

  try {
    return await context.prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
  // const { id, newEmail, newPassword, newFirstName, newLastName, newSettings } =
  //   args.input
  // // check if password is good, if not return the error message
  // const pass = passwordTest(newPassword)
  // if (typeof pass === 'object') return pass
  // const user = await context.prisma.user.findFirst({
  //   where: { id },
  // })
  // try {
  //   const updatedUser = await context.prisma.user.update({
  //     where: { id: user.id },
  //     data: {
  //       email: newEmail ? newEmail : user.email,
  //       password: newPassword ? await argon2.hash(newPassword) : user.password,
  //       firstName: newFirstName ? newFirstName : user.firstName,
  //       lastName: newLastName ? newLastName : user.lastName,
  //       settings: newSettings ? newSettings : user.settings,
  //     },
  //   })
  //   return { ...UserObject, ...updatedUser, id: updatedUser.id.toString() }
  // } catch (error) {
  //   console.error('Oops, an error!', error)
  //   throw new Error(error)
  // }
}
