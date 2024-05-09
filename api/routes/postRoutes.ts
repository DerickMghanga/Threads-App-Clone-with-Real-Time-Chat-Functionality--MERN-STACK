import express from "express"
import { createPost, getPost } from "../controllers/postController"
import protectRoute from "../middlewares/protectRoute"

const router = express.Router()

router.get('/create', protectRoute, getPost)
router.post('/create', protectRoute, createPost)

export default router