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
const logOutUser = (req: any, res: any) => {
    try {
        res.cookie('jwt', "", { maxAge: 1 })
        res.status(200).json({ message: "User logged out successfully!" })
    } catch (err: any) {
        res.status(500).json({ message: err.message })
        console.log("Error on LogOut: ", err.message)
    }
}

//FOLLOW AND UN-FOLLOW USER
const followUnFollowUser = async (req: any, res: any) => {
    try {
        const { id } = req.params  // id from url params
        const userToModify = await User.findById(id)  // user to modify (either follow or unfollow)
        const currentUser = await User.findById(req.user._id)

        if (id === req.user._id) return res.status(400).json({ message: "You can follow/unfollow yourself!" })

        if (!userToModify || !currentUser) return res.status(400).json({ message: "User Not Found!" })

        //check if the logged-in User is following the user
        const isFollowing = currentUser.following.includes(id)

        if (isFollowing) {
            // >> UNFOLLOW USER
            // remove id from Logged-in-user Following array 
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })

            // Remove logged-user id from UserToModify Followers array
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })

            return res.status(200).json({ message: "User UnFollowed successfully!" })
        } else {
            // >> FOLLOW USER
            // Add id to Logged-in-user Following array
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })

            // Add logged-user id to UserToModify Followers array
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })

            res.status(200).json({ message: "User Followed successfully!" })
        }

    } catch (err: any) {
        res.status(500).json({ message: err.message })
        console.log("Error on Follow/UnFollow User: ", err.message)
    }
}

//UPDATE USER DETAILS
const updateUser = async (req: any, res: any) => {
    const { name, email, username, password, profilePic, bio } = req.body
    const userId = req.user._id

    try {
        let user = await User.findById(userId)

        if (!user) return res.status(400).json({ message: "User not found!" })

        if (password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            user.password = hashedPassword
        }

        user.name = name || user.name
        user.email = email || user.email
        user.username = username || user.username
        user.profilePic = profilePic || user.profilePic
        user.bio = bio || user.bio

        const updatedUser = await user.save()

        res.status(200).json({message: "Profile updated successfully!", user: updatedUser})
    } catch (err: any) {
        res.status(500).json({ message: err.message })
        console.log("Error on Update User: ", err.message)
    }
}

export { signUpUser, logInUser, logOutUser, followUnFollowUser, updateUser }