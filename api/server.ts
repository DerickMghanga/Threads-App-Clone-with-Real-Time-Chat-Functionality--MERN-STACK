import express from 'express'
import "dotenv/config";

const PORT = process.env.PORT || 5000
const app = express()

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})