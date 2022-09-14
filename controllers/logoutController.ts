import { Request, Response } from 'express';
import { getUserRepo } from './userController';

const handleLogout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const repo = await getUserRepo();
  const foundUser = await repo.findOne({
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
