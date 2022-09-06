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
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(400).json({ message: 'No user Id was provided' });
    }
    // try {
    //   const user = await User.findById(req.params.id);
    //   if (!user) {
    //     return res
    //       .status(400)
    //       .json({ message: `User ${req.params.id} not found` });
    //   }
    //   return res.status(200).json(user);
    // } catch (err) {
    //   console.error(err);
    // }
    res.sendStatus(200); // TODO: everything to be cleaned
});
exports.default = {
    getUser,
};
