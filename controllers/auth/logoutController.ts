import { Request, Response } from 'express';
import { ArrayContains } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../model/User';

const handleLogout = async (req: Request, res: Response) => {
  // check if jwt token exists
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  // get user by refresh token from cookie
  const repo = await AppDataSource.getRepository(User);
  const foundUser = await repo.findOne({
    relations: ['credentials'],
    where: { credentials: { refreshToken: ArrayContains([refreshToken]) } },
  });
  // delete jwt if no user found
  if (!foundUser) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.sendStatus(204);
  }

  // delete single refreshToken from db
  foundUser.credentials.refreshToken =
    foundUser.credentials.refreshToken.filter(
      (rt: string) => rt !== refreshToken
    );
  await repo.save(foundUser);
  // clear cookies after logout
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.sendStatus(204);
};

export default { handleLogout };
