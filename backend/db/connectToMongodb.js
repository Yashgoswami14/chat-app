import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongodb = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to mongodb");
    } catch (error) {
        console.log("Error while connecting to mongodb: ",error.message);
    }
}

export default connectToMongodb;