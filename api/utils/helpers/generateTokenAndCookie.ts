import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId: any, res: any) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
        expiresIn: "15d"
    })

    res.cookie("jwt", token, {
        httpOnly: true,  // token cant be accessed by javascript
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: "strict",  //CSRF
    })

    return token // incase we want to use the token
}

export default generateTokenAndSetCookie