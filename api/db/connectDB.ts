import mongoose, { ConnectOptions } from "mongoose";

const connectDb = () => {
    try {
        const connection = mongoose.connect(process.env.MONGO_URI!, {
            // to avoid warnings in the console
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useCreateIndex: true
        } as ConnectOptions)

        console.log(`MongoDB Connected!`)
    } catch (error: any) {
        console.error(`Error on MongoDB Connection: ${error.message}`)
        process.exit(1)
    }
}

export default connectDb