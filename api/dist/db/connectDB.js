"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = () => {
    try {
        const connection = mongoose_1.default.connect(process.env.MONGO_URI, {
        // to avoid warnings in the console
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
        //useCreateIndex: true
        });
        console.log(`MongoDB Connected!`);
    }
    catch (error) {
        console.error(`Error on MongoDB Connection: ${error.message}`);
        process.exit(1);
    }
};
exports.default = connectDb;
