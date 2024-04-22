import express from 'express'
import "dotenv/config";
import connectDb from './db/connectDB';

connectDb()

const PORT = process.env.PORT || 5000
const app = express()

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})