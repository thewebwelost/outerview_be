import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getUserRepo } from './userController';
import { createJwtToken } from '../helpers/createJwtToken';

const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  const repo = await getUserRepo();
  const foundUser = await repo.findOne({
    where: { refreshToken },
  });

  // detect refresh token reuse
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      // TODO: fix types
      async (err: any, decoded: any) => {
        if (err) return res.sendStatus(403);

        const repo = await getUserRepo();
        const fraudUser = await repo.findOne({
          where: { email: decoded.email },
        });

        if (fraudUser) {
          fraudUser.refreshToken = [];
          await fraudUser.save();
        }
      }
    );
    return res.sendStatus(403);
  }

  const newRefreshTokenArr =
    foundUser.refreshToken &&
    foundUser.refreshToken.filter((rt) => rt !== refreshToken);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    // TODO: fix types
    async (err: any, decoded: any) => {
      if (err) {
        foundUser.refreshToken = [...newRefreshTokenArr];
        await foundUser.save();
      }

      if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

      const accessToken = createJwtToken(
        { email: decoded.email },
        process.env.ACCESS_TOKEN_SECRET as string,
        '10m'
      );

      const newRefreshToken = createJwtToken(
        { email: foundUser.email },
        process.env.REFRESH_TOKEN_SECRET as string,
        '1d'
      );

      foundUser.refreshToken = [...newRefreshTokenArr, newRefreshToken];
      await foundUser.save();

      res.cookie('jwt', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken });
    }
  );
};

export default { handleRefreshToken };
