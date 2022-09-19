import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getUserRepo } from './userController';
import { buildAccessToken, buildRefreshToken } from '../helpers/buildTokens';

const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const cookies = req.cookies;

  if (!email || !password) {
    return res.status(400).json({ message: 'Name or password missing' });
  }
  // find user in DB via email
  const repo = await getUserRepo();
  const foundUser = await repo.findOne({
    where: { email },
  });

  if (!foundUser) return res.sendStatus(401);

  const match = await bcrypt.compare(password, foundUser.password);
  // if user was found and pass is matched issue access and refresh tokens
  if (match) {
    const accessToken = buildAccessToken(
      { email: foundUser.email },
      { expiresIn: '10m' }
    );

    const newRefreshToken = buildRefreshToken(
      { email: foundUser.email },
      { expiresIn: '15d' }
    );

    // if there is a jwt, delete it from DB
    const newRefreshTokenArr = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt: string) => rt !== cookies.jwt);
    // clear existing jwt cookie
    if (cookies?.jwt) {
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
    }
    // write new jwt to db
    foundUser.refreshToken = [...newRefreshTokenArr, newRefreshToken];
    foundUser.refreshToken.length = 5;
    await foundUser.save();
    // send new jwt with secure cookie
    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    // send issued access token
    res.json({
      success: true,
      accessToken,
      user: {
        username: foundUser.username,
        email: foundUser.email,
      },
    });
  } else {
    res.sendStatus(401);
  }
};

export default { handleLogin };
