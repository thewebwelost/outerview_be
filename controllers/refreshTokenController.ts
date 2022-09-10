import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../model/User';

const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' });

  const foundUser = await AppDataSource.getRepository(User).findOne({
    where: { refreshToken },
  });

  // reuse refresh token scenario
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      // TODO: fix types
      async (err: any, decoded: any) => {
        if (err) return res.sendStatus(403);
        const user = await AppDataSource.getRepository(User).findOne({
          where: { email: decoded.email },
        });
        if (user) {
          user.refreshToken = [];
          await user.save();
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

      const accessToken = jwt.sign(
        {
          userInfo: { email: decoded.email },
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '10m' }
      );

      const newRefreshToken = jwt.sign(
        { email: foundUser.email },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: '1d' }
      );

      foundUser.refreshToken = [...newRefreshTokenArr, newRefreshToken];
      foundUser.save();

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
