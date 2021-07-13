const passwordRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
)

interface InvalidInput {
  __typeName: string
  message: string
  field: string
}

const UserInvalidInput = {
  __typeName: 'UserInvalidInputError',
  message: '',
  field: '',
}

export const passwordTest = (password): boolean | InvalidInput => {
  if (!passwordRegex.test(password)) {
    if (!/^.{8,}$/.test(password))
      return {
        ...UserInvalidInput,
        field: 'password',
        message: 'Password must be eight characters or longer',
      }
    if (!/[a-z]+/.test(password))
      return {
        ...UserInvalidInput,
        field: 'password',
        message:
          'Password must contain at least one lowercase alphabetical character',
      }
    if (!/[A-Z]+/.test(password))
      return {
        ...UserInvalidInput,
        field: 'password',
        message:
          'Password must contain at least one uppercase alphabetical character',
      }
    if (!/[0-9]+/.test(password))
      return {
        ...UserInvalidInput,
        field: 'password',
        message: 'Password must contain at least one numeric character',
      }
    if (!/[!@#$%^&*.]+/.test(password))
      return {
        ...UserInvalidInput,
        field: 'password',
        message: 'Password must contain at least one special character',
      }
  }

  return true
}
