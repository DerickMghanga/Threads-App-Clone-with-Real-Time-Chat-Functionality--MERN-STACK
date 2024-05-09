"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokenAndSetCookie = (userId, res) => {
    const token = jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    });
    res.cookie("jwt", token, {
        httpOnly: true, // token cant be accessed by javascript
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: "strict", //CSRF
    });
    return token; // incase we want to use the token
};
exports.default = generateTokenAndSetCookie;
