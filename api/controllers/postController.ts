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

//GET SPECIFIC POST
const getPost = async (req: any, res: any) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({ message: "Post not found!" })
        }

        res.status(200).json({ post })
    } catch (err: any) {
        res.status(500).json({ message: err.message })
        console.log("Error on GET Post: ", err.message)
    }
}

//DELETE POST
const deletePost = async (req: any, res: any) => {
    try {
        const post: any = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({ message: "Post not found!" })
        }
        
        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized to delete this post!" })
        }

        await Post.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: "Post deleted successfully!" })

    } catch (err: any) {
        res.status(500).json({ message: err.message })
        console.log("Error on DELETE Post: ", err.message)
    }
}

export { createPost, getPost, deletePost }