import { Request } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const sign = (userId: number, isRefresh: boolean) => {
  return jwt.sign(
    { userId },
    isRefresh ? process.env.JWT_REFRESH_SECRET : process.env.JWT_APP_SECRET,
    {
      expiresIn: process.env.JWT_APP_EXPIRATION,
      algorithm: 'HS256',
      // audience: process.env.JWT_AUDIENCE,
      // issuer: process.env.JWT_ISSUER,
    }
  )
}

interface Token extends JwtPayload {
  userId: number
}

function getTokenPayload(token: string) {
  return jwt.verify(token, process.env.JWT_APP_SECRET) as Token
}

export const getUserId = (req: Request) => {
  const token = req?.headers?.authorization?.replace('Bearer ', '')

  if (!token) throw new Error('No token found')
  const { userId } = getTokenPayload(token)

  return userId
}
