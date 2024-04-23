import express from 'express'
import "dotenv/config";
import connectDb from './db/connectDB';
import cookieParser from 'cookie-parser'
import cors from 'cors'

import userRoutes from './routes/userRoutes'

connectDb()

const PORT = process.env.PORT || 5000
const app = express()

//Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


//Routes
app.use('/api/users', userRoutes)


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})