"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const protectRoute_1 = __importDefault(require("../middlewares/protectRoute"));
const router = express_1.default.Router();
router.post('/signup', userController_1.signUpUser);
router.post('/login', userController_1.logInUser);
router.post('/logout', userController_1.logOutUser);
router.get('/profile/:username', userController_1.getProfile);
router.post('/follow/:id', protectRoute_1.default, userController_1.followUnFollowUser);
router.post('/update', protectRoute_1.default, userController_1.updateUser);
exports.default = router;
