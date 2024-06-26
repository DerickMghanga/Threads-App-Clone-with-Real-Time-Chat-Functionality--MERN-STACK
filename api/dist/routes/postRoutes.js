"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const protectRoute_1 = __importDefault(require("../middlewares/protectRoute"));
const router = express_1.default.Router();
router.get('/create', protectRoute_1.default, postController_1.getPost);
router.post('/create', protectRoute_1.default, postController_1.createPost);
exports.default = router;
