import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createJwtToken } from '../middleware/createJwtToken';
import { getUserRepo } from './userController';

const handleLogin = async (req: Request, res: Response) => {
  const { email, password, rememberMe } = req.body;
  const cookie = req.cookies;

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
    const accessToken = createJwtToken(foundUser.email);

    const newRefreshToken = createJwtToken(foundUser.email);

    const newRefreshTokenArr = !cookie?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt: string) => rt !== cookie.jwt);

    if (cookie?.jwt) {
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
    }

    foundUser.refreshToken = [...newRefreshTokenArr, newRefreshToken];
    await foundUser.save();

    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24, // 24h
    });

    res.json({
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
