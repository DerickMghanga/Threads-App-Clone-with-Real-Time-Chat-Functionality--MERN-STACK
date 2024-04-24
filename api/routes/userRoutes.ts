import express from 'express'
import { signUpUser, logInUser, logOutUser, followUnFollowUser } from '../controllers/userController'
import protectRoute from '../middlewares/protectRoute'

const router = express.Router()


router.post('/signup', signUpUser)
router.post('/login', logInUser)
router.post('/logout', logOutUser)
router.post('/follow/:id', protectRoute, followUnFollowUser)

export default router