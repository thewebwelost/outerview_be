import { sign } from 'jsonwebtoken';

export const createJwtToken = (
  data: { [key: string]: any },
  secret: string,
  expires: string
) => {
  const accessToken = sign(data, secret, {
    expiresIn: expires,
  });

  return accessToken;
};
