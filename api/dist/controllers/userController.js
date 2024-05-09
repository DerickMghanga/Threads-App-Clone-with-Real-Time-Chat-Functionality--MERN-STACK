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
exports.getProfile = exports.updateUser = exports.followUnFollowUser = exports.logOutUser = exports.logInUser = exports.signUpUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateTokenAndCookie_1 = __importDefault(require("../utils/helpers/generateTokenAndCookie"));
//REGISTER USER
const signUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, username, password } = req.body;
        const user = yield userModel_1.default.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(409).json({ message: "User already exists!" });
        }
        // hash user password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        //save to Mongo DB
        const newUser = new userModel_1.default({
            name,
            email,
            username,
            password: hashedPassword
        });
        yield newUser.save();
        if (newUser) {
            (0, generateTokenAndCookie_1.default)(newUser._id, res);
            return res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username
            });
        }
        else {
            return res.status(400).json({ message: "Invalid User data!" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error in SignUp user: ", err.message);
    }
});
exports.signUpUser = signUpUser;
//LOG-IN USER
const logInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield userModel_1.default.findOne({ username });
        //console.log(user)
        //if (!user) return res.status(400).json({ message: "Username doesn't exist!" })
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, (user === null || user === void 0 ? void 0 : user.password) || "");
        if (!user || !isPasswordCorrect)
            return res.status(400).json({ message: "Invalid Username or Password!" });
        (0, generateTokenAndCookie_1.default)(user._id, res); // generate token and set cookie to response
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error on logInUser: ", err.message);
    }
});
exports.logInUser = logInUser;
//LOG-OUT USER
const logOutUser = (req, res) => {
    try {
        res.cookie('jwt', "", { maxAge: 1 });
        res.status(200).json({ message: "User logged out successfully!" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error on LogOut: ", err.message);
    }
};
exports.logOutUser = logOutUser;
//FOLLOW AND UN-FOLLOW USER
const followUnFollowUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // id from url params
        const userToModify = yield userModel_1.default.findById(id); // user to modify (either follow or unfollow)
        const currentUser = yield userModel_1.default.findById(req.user._id);
        if (id === req.user._id.toString())
            return res.status(400).json({ message: "You can't follow/unfollow yourself!" });
        if (!userToModify || !currentUser)
            return res.status(400).json({ message: "User Not Found!" });
        //check if the logged-in User is following the user
        const isFollowing = currentUser.following.includes(id);
        if (isFollowing) {
            // >> UNFOLLOW USER
            // remove id from Logged-in-user Following array 
            yield userModel_1.default.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
            // Remove logged-user id from UserToModify Followers array
            yield userModel_1.default.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
            return res.status(200).json({ message: "User UnFollowed successfully!" });
        }
        else {
            // >> FOLLOW USER
            // Add id to Logged-in-user Following array
            yield userModel_1.default.findByIdAndUpdate(req.user._id, { $push: { following: id } });
            // Add logged-user id to UserToModify Followers array
            yield userModel_1.default.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
            res.status(200).json({ message: "User Followed successfully!" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error on Follow/UnFollow User: ", err.message);
    }
});
exports.followUnFollowUser = followUnFollowUser;
//UPDATE USER DETAILS
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, username, password, profilePic, bio } = req.body;
    const userId = req.user._id; // data from protectRoute middleware
    try {
        let user = yield userModel_1.default.findById(userId);
        if (!user)
            return res.status(400).json({ message: "User not found!" });
        if (password) {
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            user.password = hashedPassword;
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;
        const updatedUser = yield user.save();
        res.status(200).json({ message: "Profile updated successfully!", user: updatedUser });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error on Update User: ", err.message);
    }
});
exports.updateUser = updateUser;
//GET USER PROFILE DETAILS
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    try {
        const user = yield userModel_1.default.findOne({ username }).select('-password').select('-updatedAt');
        if (!user)
            return res.status(400).json({ message: "User not found!" });
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error on getProfile: ", err.message);
    }
});
exports.getProfile = getProfile;
