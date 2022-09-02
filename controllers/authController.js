const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const cookie = req.cookies;

  if (!email || !password) {
    res.status(400).json({ message: 'Name or password missing' });
  }

  // const foundUser = await User.findOne({ email }).exec();
  // if (!foundUser) return res.sendStatus(401);
  // const match = await bcrypt.compare(password, foundUser.password);

  // if (match) {
  //   // create jwts
  //   const accessToken = jwt.sign(
  //     {
  //       userInfo: {
  //         email: foundUser.email,
  //       },
  //     },
  //     process.env.ACCESS_TOKEN_SECRET,
  //     { expiresIn: '10m' }
  //   );
  //   const newRefreshToken = jwt.sign(
  //     { email: foundUser.email },
  //     process.env.REFRESH_TOKEN_SECRET,
  //     { expiresIn: '1d' }
  //   );

  //   const newRefreshTokenArr = !cookie?.jwt
  //     ? foundUser.refreshToken
  //     : foundUser.refreshToken.filter((rt) => rt !== cookie.jwt);

  //   if (cookie?.jwt) {
  //     res.clearCookie('jwt', {
  //       httpOnly: true,
  //       secure: true,
  //       sameSite: 'None',
  //     });
  //   }

  //   foundUser.refreshToken = [...newRefreshTokenArr, newRefreshToken];
  //   await foundUser.save();

  //   res.cookie('jwt', newRefreshToken, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: 'None',
  //     maxAge: 24 * 60 * 60 * 1000, // 24h
  //   });
  //   res.json({
  //     accessToken,
  //     user: {
  //       username: foundUser.username,
  //       email: foundUser.email,
  //     },
  //   });
  // } else {
  //   res.sendStatus(401);
  // }
  res.json({
    email,
    password,
  });
};

module.exports = { handleLogin };
