import jwt from "jsonwebtoken"
import User from "../models/userModel"

const protectRoute = async (req: any, res: any, next: any) => {
    try {
        const token = req.cookies.jwt

        if (!token) return res.status(401).json({ message: "Unauthorized Access!" })

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!) // get the decoded data from token

        const user = await User.findById(decoded.id).select("-password")  // Logged-in User details
        //NB: Next time save full User details during token creation to reduce database calls for fast API response

        req.user = user // add to request body

        next()  // for the next funtion (middleware) to handle
    } catch (err: any) {
        res.status(500).json({ message: err.message })
        console.log("Error on follow/unfollow user: ", err.message)
    }
}

export default protectRoute