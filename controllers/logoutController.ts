import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../model/User';

const handleLogout = async (req: Request, res: Response) => {
  // Client should delete the accessToken as well
  const cookies = req.cookies;
  if (!cookies?.jwt) res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = await AppDataSource.getRepository(User).findOne({
    where: { refreshToken },
  });

  if (!foundUser) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.sendStatus(204);
  }

  // delete the refreshToken from db
  foundUser.refreshToken = foundUser.refreshToken.filter(
    (rt: string) => rt !== refreshToken
  );

  await foundUser.save();

  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.sendStatus(204);
};

export default { handleLogout };
