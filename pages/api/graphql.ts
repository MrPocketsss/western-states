import { apolloServer } from '../../backend/src/apollo'

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export default handler
