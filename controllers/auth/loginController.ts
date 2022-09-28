import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { buildAccessToken, buildRefreshToken } from '../../helpers/buildTokens';
import { AppDataSource } from '../../data-source';
import { User } from '../../model/User';

const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const cookies = req.cookies;

  if (!email || !password) {
    return res.status(400).json({ message: 'Name or password missing' });
  }
  // find user in DB via email
  const repo = await AppDataSource.getRepository(User);
  const foundUser = await repo.findOne({
    where: { userCredentials: { email } },
  });

  if (!foundUser) return res.sendStatus(401);

  const match = await bcrypt.compare(
    password,
    foundUser.userCredentials.password
  );
  // if user was found and pass is matched issue access and refresh tokens
  if (match) {
    const accessToken = buildAccessToken(
      { email: foundUser.userCredentials.email },
      { expiresIn: '10m' }
    );

    const newRefreshToken = buildRefreshToken(
      { email: foundUser.userCredentials.email },
      { expiresIn: '30d' }
    );

    // if there is a jwt, delete it from DB
    const newRefreshTokenArr = !cookies?.jwt
      ? foundUser.userCredentials.refreshToken
      : foundUser.userCredentials.refreshToken.filter(
          (rt: string) => rt !== cookies.jwt
        );
    // clear existing jwt cookie
    if (cookies?.jwt) {
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
    }
    // write new jwt to db
    foundUser.userCredentials.refreshToken = [
      newRefreshToken,
      ...newRefreshTokenArr,
    ];

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
        username: foundUser.userCredentials.username,
        email: foundUser.userCredentials.email,
      },
    });
  } else {
    res.sendStatus(401);
  }
};

export default { handleLogin };
