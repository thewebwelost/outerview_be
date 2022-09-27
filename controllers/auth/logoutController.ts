import { Request, Response } from 'express';
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
    where: { refreshToken },
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
  foundUser.refreshToken = foundUser.refreshToken.filter(
    (rt: string) => rt !== refreshToken
  );
  await foundUser.save();
  // clear cookies after logout
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.sendStatus(204);
};

export default { handleLogout };
