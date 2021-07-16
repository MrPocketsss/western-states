// project files
import { GetUserResult, getUser } from './queries/getUser'
import { getUsers } from './queries/getUsers'
import { RegisterResult, register } from './mutations/register'
import { LoginResult, login } from './mutations/login'
import { resetUser } from './mutations/resetUser'
import { UpdateUserResult, updateUser } from './mutations/updateUser'

// generated types
import {
  UserInvalidInputError,
  UserNotFoundError,
} from '../../generated/graphql'

export const userResolvers = {
  resolverTypes: {
    GetUserResult,
    LoginResult,
    RegisterResult,
    UpdateUserResult,
  },
  queries: {
    getUser,
    getUsers,
  },
  mutations: {
    login,
    register,
    resetUser,
    updateUser,
  },
}

export const UserObject = {
  __typeName: 'User',
}
export const RegisterUserObject = {
  __typeName: 'RegisterUser',
}
export const UserNotFound: UserNotFoundError = {
  __typename: 'UserNotFoundError',
  message: "Sorry, that user does't exist",
}

export const UserInvalidInput: UserInvalidInputError = {
  __typename: 'UserInvalidInputError',
  message: '',
  field: '',
}
