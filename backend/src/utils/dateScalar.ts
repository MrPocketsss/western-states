import { GraphQLScalarType, Kind } from 'graphql'

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date scalar type',
  serialize: (value) => value.getTime(),
  parseValue: (value) => new Date(value),
  parseLiteral: (ast) => (ast.kind === Kind.INT ? new Date(parseInt(ast.value, 10)) : null),
})

/*
  serialize Function: 
    converts the scalar's back-end representation to a JSON-compatible format
    so Apollo Server can include it in an operation response.

    The Date scalar is represented on the backend by the Date Javascript object.
    When we send a Date scalar in a GraphQL response, we serialize it as the
    integer value returned by the getTime() function of the JS Date object.
  parseValue Function:
    converts the scalar's serialized JSON value to it's back-end representation
    before its added to a resolver's args.

    Apollo Server calls this method when the scalar is provided by a client as 
    a GraphQL variable for an argument.
  parseLiteral Function:
    When an incoming query string includes the scalar as a hard-coded argument
    value, that value is part of the query document's abstract syntax tree (AST).
    Apollo Server calls this method to convert the value's AST representation
    (which is always a string) to the scalar's back-end representation.

    We convert from the string to an integer, then to a date in order to match
    the result of parseValue()
*/
