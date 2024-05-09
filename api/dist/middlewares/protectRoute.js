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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const protectRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.jwt;
        if (!token)
            return res.status(401).json({ message: "Unauthorized Access!" });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET); // get the decoded data from token
        const user = yield userModel_1.default.findById(decoded.id).select("-password"); // Logged-in User details
        //NB: Next time save full User details during token creation to reduce database calls for fast API response
        req.user = user; // add to request body
        next(); // for the next funtion (middleware) to handle
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error on follow/unfollow user: ", err.message);
    }
});
exports.default = protectRoute;
