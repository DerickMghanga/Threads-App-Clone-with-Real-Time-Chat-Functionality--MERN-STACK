import Post from "../models/postModel"
import User from "../models/userModel"


//CREATE NEW POST
const createPost = async (req: any, res: any) => {
    try {
        const { postedBy, text, img } = req.body

        if (!postedBy || !text) {  //You cant post an empty post
            return res.status(400).json({ message: "Text and postedBy details are required!" })
        }

        const user: any = await User.findById(postedBy)
        if (!user) return res.status(404).json({ message: "User not found!" })

        if (user._id.toString() !== req.user._id.toString()) { // you can ONLY post your own post >> req.user from protectRoute.ts
            return res.status(400).json({ message: 'Unauthorized to create post!' })
        }

        const maxLength = 500
        if (text.length > maxLength) {
            return res.status(400).json({ message: `Text MUST be less than ${maxLength} characters!` })
        }

        const newPost = new Post({ postedBy, text, img }) // create new post object
        await newPost.save()  //save to DB

        res.status(201).json({ message: "New Post created successfully!", newPost })

    } catch (err: any) {
        res.status(500).json({ message: err.message })
        console.log("Error on Create Post: ", err.message)
    }
}

export { createPost }