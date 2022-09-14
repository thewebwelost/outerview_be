import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createJwtToken } from '../helpers/createJwtToken';
import { getUserRepo } from './userController';

const handleLogin = async (req: Request, res: Response) => {
  const { email, password, rememberMe } = req.body;
  const cookies = req.cookies;

  if (!email || !password) {
    res.status(400).json({ message: 'Name or password missing' });
  }

  const repo = await getUserRepo();
  const foundUser = await repo.findOne({
    where: { email },
  });

  if (!foundUser) return res.sendStatus(401);

  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    // create jwts
    const accessToken = createJwtToken(
      { email: foundUser.email },
      process.env.ACCESS_TOKEN_SECRET as string,
      '10m'
    );

    const newRefreshToken = createJwtToken(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET as string,
      '1d'
    );

    const newRefreshTokenArr = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt: string) => rt !== cookies.jwt);

    if (cookies?.jwt) {
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
    }

    foundUser.refreshToken = [...newRefreshTokenArr, newRefreshToken];
    await foundUser.save();

    const ms24h = 1000 * 60 * 60 * 24;

    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: rememberMe ? ms24h * 30 : ms24h,
    });

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
