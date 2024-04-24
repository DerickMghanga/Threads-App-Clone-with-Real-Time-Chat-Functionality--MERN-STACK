import User from "../models/userModel"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndCookie"

//REGISTER USER
const signUpUser = async (req: any, res: any) => {
    try {
        const { name, email, username, password } = req.body
        const user: any = await User.findOne({ $or: [{ email }, { username }] })

        if (user) {
            return res.status(409).json({ message: "User already exists!" })
        }

        // hash user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //save to Mongo DB
        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword
        })

        await newUser.save()

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)

            return res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username
            })
        } else {
            return res.status(400).json({ message: "Invalid User data!" })
        }

    } catch (err: any) {
        res.status(500).json({ message: err.message })
        console.log("Error in SignUp user: ", err.message)
    }
}

//LOG-IN USER
const logInUser = async (req: any, res: any) => {
    try {
        const { username, password } = req.body
        const user: any = await User.findOne({ username })
        //console.log(user)

        //if (!user) return res.status(400).json({ message: "Username doesn't exist!" })

        const isPasswordCorrect: any = await bcrypt.compare(password, user?.password || "")

        if (!user || !isPasswordCorrect) return res.status(400).json({ message: "Invalid Username or Password!" })

        generateTokenAndSetCookie(user._id, res)  // generate token and set cookie to response

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username
        })

    } catch (err: any) {
        res.status(500).json({ message: err.message })
        console.log("Error on logInUser: ", err.message)
    }
}

//LOG-OUT USER
const logOutUser = async (req: any, res: any) => {
    try {
        res.cookie('jwt', "", { maxAge: 1 })
        res.status(200).json({ message: "User logged out successfully!" })
    } catch (err: any) {
        res.status(500).json({ message: err.message })
        console.log("Error on LogOut: ", err.message)
    }
}

export { signUpUser, logInUser, logOutUser }