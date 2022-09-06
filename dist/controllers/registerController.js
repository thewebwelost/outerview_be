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
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, rememberMe } = req.body;
    if (!username || !password)
        return res.status(400).json({ message: 'Name or password missing' });
    // const duplicate = await User.findOne({ email }).exec();
    // if (duplicate) return res.sendStatus(409); // Conflict
    // try {
    //   // encrypting password
    //   const hashedPwd = await bcrypt.hash(password, 10);
    //   // create and store new user
    //   const newUser = await User.create({
    //     username,
    //     email,
    //     password: hashedPwd,
    //   });
    //   res.status(201).json({ success: `User ${newUser.username} added` });
    // } catch (err) {
    //   res.status(500).json({ message: err.message });
    // }
    res.sendStatus(200); // TODO: everything to be cleaned
});
exports.default = {
    createUser,
};
