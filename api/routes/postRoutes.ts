import express from "express"
import { createPost, getPost, deletePost } from "../controllers/postController"
import protectRoute from "../middlewares/protectRoute"

const router = express.Router()

router.get('/:id', getPost)
router.post('/create', protectRoute, createPost)
router.delete('/:id', protectRoute, deletePost)

export default router