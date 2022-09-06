"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' });
    // const foundUser = await User.findOne({ refreshToken }).exec();
    // // reuse refresh token scenario
    // if (!foundUser) {
    //   jwt.verify(
    //     refreshToken,
    //     process.env.REFRESH_TOKEN_SECRET,
    //     async (err, decoded) => {
    //       if (err) return res.sendStatus(403);
    //       const user = await User.findOne({ email: decoded.email }).exec();
    //       user.refreshToken = [];
    //       await user.save();
    //     }
    //   );
    //   return res.sendStatus(403);
    // }
    // const newRefreshTokenArr = foundUser.refreshToken.filter(
    //   (rt) => rt !== refreshToken
    // );
    // jwt.verify(
    //   refreshToken,
    //   process.env.REFRESH_TOKEN_SECRET,
    //   async (err, decoded) => {
    //     if (err) {
    //       foundUser.refreshToken = [...newRefreshTokenArr];
    //       await foundUser.save();
    //     }
    //     if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
    //     const accessToken = jwt.sign(
    //       {
    //         userInfo: { email: decoded.email },
    //       },
    //       process.env.ACCESS_TOKEN_SECRET,
    //       { expiresIn: '10m' }
    //     );
    //     const newRefreshToken = jwt.sign(
    //       { email: foundUser.email },
    //       process.env.REFRESH_TOKEN_SECRET,
    //       { expiresIn: '1d' }
    //     );
    //     foundUser.refreshToken = [...newRefreshTokenArr, newRefreshToken];
    //     foundUser.save();
    //     res.cookie('jwt', newRefreshToken, {
    //       httpOnly: true,
    //       secure: true,
    //       sameSite: 'None',
    //       maxAge: 24 * 60 * 60 * 1000,
    //     });
    //     res.json({ accessToken });
    //   }
    // );
    res.sendStatus(200); // TODO: everything to be cleaned
});
exports.default = { handleRefreshToken };
