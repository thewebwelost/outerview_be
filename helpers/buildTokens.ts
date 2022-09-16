import { sign } from 'jsonwebtoken';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;

export function buildAccessToken(user: { email: string }, options: object) {
  const accessToken = sign(user, accessTokenSecret, options);
  return accessToken;
}
export function buildRefreshToken(user: { email: string }, options: object) {
  const accessToken = sign(user, refreshTokenSecret, options);
  return accessToken;
}
