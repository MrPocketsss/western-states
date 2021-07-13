import { rule, shield, or, and } from 'graphql-shield'

const isAuthenticated = rule()((parent, args, { user }, info) => {
  return user ? true : false
})

export const permissions = shield({
  Query: {
    getUser: isAuthenticated,
  },
})
