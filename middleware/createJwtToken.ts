import { sign } from 'jsonwebtoken';

export const createJwtToken = (email: string) => {
  const accessToken = sign(
    {
      email,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '10m' }
  );

  return accessToken;
};
