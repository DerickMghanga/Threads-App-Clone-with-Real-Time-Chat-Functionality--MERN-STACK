import express from "express"
import { createPost, getPost, deletePost, likeUnlikePost } from "../controllers/postController"
import protectRoute from "../middlewares/protectRoute"

const router = express.Router()

router.get('/:id', getPost)
router.post('/create', protectRoute, createPost)
router.delete('/:id', protectRoute, deletePost)
router.post('/like/:id', protectRoute, likeUnlikePost)

export default router