import jwt from 'jsonwebtoken'

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

export const verify = (token: string, isRefresh: boolean) => {
  return jwt.verify(token, isRefresh ? process.env.JWT_REFRESH_SECRET : process.env.JWT_APP_SECRET)
}
