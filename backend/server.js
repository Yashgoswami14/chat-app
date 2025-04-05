import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongodb from "./db/connectToMongodb.js";

const app = express();
const PORT = process.env.PORT || 5000;  

dotenv.config(); 

app.use(express.json()); //to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());  // to parse the cookie data to access the req.cookie

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/",(req,res) => {
    res.send("Home Route.")
})

app.listen(PORT, () => {
    connectToMongodb();
    console.log("Server is running on port 5000");
}); 