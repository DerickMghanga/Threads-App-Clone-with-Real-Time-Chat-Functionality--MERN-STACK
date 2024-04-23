import User from "../models/userModel"
import bcrypt from "bcryptjs"

//User register
const signUpUser = async (req: any, res: any) => {
    try {
        const { name, email, username, password } = req.body
        const user: any = await User.findOne({ $or: [{ email }, { username }] })

        if (user) {
            return res.status(409).json({message: "User already exists!"})
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
            return res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username
            })
        } else {
            return res.status(400).json({message: "Invalid User data!"})
        }

    } catch (err: any) {
        res.status(500).json({ message: err.message })
        console.log("Error in SignUp user: ", err.message)
    }
}

export { signUpUser }