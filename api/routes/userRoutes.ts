import express from 'express'
import { signUpUser, logInUser } from '../controllers/userController'

const router = express.Router()


router.post('/signup', signUpUser)
router.post('/login', logInUser)

export default router