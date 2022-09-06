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
const handleLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Client should delete the accessToken as well
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        res.sendStatus(204);
    const refreshToken = cookies.jwt;
    // const foundUser = await User.findOne({ refreshToken }).exec();
    // if (!foundUser) {
    //   res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });
    //   return res.sendStatus(204);
    // }
    // // delete the refreshToken from db
    // foundUser.refreshToken = foundUser.refreshToken.filter(
    //   (rt) => rt !== refreshToken
    // );
    // await foundUser.save();
    // res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });
    // res.sendStatus(204);
    res.sendStatus(200); // TODO: everything to be cleaned
});
exports.default = { handleLogout };
