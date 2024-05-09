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
exports.getPost = exports.createPost = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
//CREATE NEW POST
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postedBy, text, img } = req.body;
        if (!postedBy || !text) { //You cant post an empty post
            return res.status(400).json({ message: "Text and postedBy details are required!" });
        }
        const user = yield userModel_1.default.findById(postedBy);
        if (!user)
            return res.status(404).json({ message: "User not found!" });
        if (user._id.toString() !== req.user._id.toString()) { // you can ONLY post your own post >> req.user from protectRoute.ts
            return res.status(400).json({ message: 'Unauthorized to create post!' });
        }
        const maxLength = 500;
        if (text.length > maxLength) {
            return res.status(400).json({ message: `Text MUST be less than ${maxLength} characters!` });
        }
        const newPost = new postModel_1.default({ postedBy, text, img }); // create new post object
        yield newPost.save(); //save to DB
        res.status(201).json({ message: "New Post created successfully!", newPost });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error on Create Post: ", err.message);
    }
});
exports.createPost = createPost;
//GET SPECIFIC POST
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.getPost = getPost;
