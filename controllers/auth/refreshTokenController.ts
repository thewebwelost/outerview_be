import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ArrayContains } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { buildAccessToken, buildRefreshToken } from '../../helpers/buildTokens';
import { User } from '../../model/User';

const handleRefreshToken = async (req: Request, res: Response) => {
  // user asks to refresh expired access token
  // with their refresh token issued earlier
  // sent inside jwt cookie
  const cookies = req.cookies;
  // request gets declined if no cookie found
  if (!cookies?.jwt) return res.sendStatus(401);
  // we store old token in memory and clear cookie
  const refreshToken = cookies.jwt;
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  // we need to find user in our DB by old token
  const repo = await AppDataSource.getRepository(User);
  // const foundUser = await repo
  //   .createQueryBuilder('user')
  //   .leftJoinAndSelect('user.refreshToken', 'token')
  //   .where('token @> :refreshToken', { refreshToken: [refreshToken] })
  //   .getOne();

  const foundUser = await repo.findOne({
    where: {
      credentials: {
        refreshToken: ArrayContains([refreshToken]),
      },
    },
  });

  // if there is no user found by token, it is potentially
  // a fraud request trying to reuse compromised token
  if (!foundUser) {
    // we now decode the compromised jwt and find user by email from token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      // TODO: fix types
      async (err: any, decoded: any) => {
        if (err) return res.sendStatus(403);

        const repo = await AppDataSource.getRepository(User);
        const fraudUser = await repo.findOne({
          where: {
            credentials: {
              email: decoded.email,
            },
          },
        });

        // const fraudUser = await repo
        //   .createQueryBuilder('fraudUser')
        //   .leftJoinAndSelect('fraudUser.credentials', 'credentials')
        //   .where('credentials.email = :email', { email: decoded.email })
        //   .getOne();

        // and then delete all tokens to prevent fraud
        if (fraudUser) {
          fraudUser.credentials.refreshToken = [];
          await fraudUser.save();
        }
      }
    );
    // we exit with 401 status error and will ask user to log in again
    return res.sendStatus(401);
  }

  // when we find user with issued token we delete the old token from DB
  const newRefreshTokenArr =
    foundUser.credentials.refreshToken &&
    foundUser.credentials.refreshToken.filter((rt) => rt !== refreshToken);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    // TODO: fix types
    async (err: any, decoded: any) => {
      if (err) {
        foundUser.credentials.refreshToken = [...newRefreshTokenArr];
        await foundUser.save();
      }

      if (err || foundUser.credentials.email !== decoded.email)
        return res.sendStatus(403);
      // issue new tokens if everything is matched correctly
      const accessToken = buildAccessToken(
        { email: foundUser.credentials.email },
        { expiresIn: '10m' }
      );

      const newRefreshToken = buildRefreshToken(
        { email: foundUser.credentials.email },
        { expiresIn: '30d' }
      );
      // write new refresh token to db
      foundUser.credentials.refreshToken = [
        ...newRefreshTokenArr,
        newRefreshToken,
      ];
      await foundUser.save();
      // return jwt in secure cookie
      res.cookie('jwt', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
      });
      // return access token as a response
      res.json({ accessToken });
    }
  );
};

export default { handleRefreshToken };
