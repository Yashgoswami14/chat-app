import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from 'path';

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongodb from "./db/connectToMongodb.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;  
const __dirname = path.resolve()

dotenv.config(); 

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());  // to parse the cookie data to access the req.cookie

// Define API routes first
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve the static files for the frontend (React, etc.)
app.use(express.static(path.join(__dirname, "frontend/dist")));

// Catch-all route to serve index.html for any other non-API request
app.get(/^((?!\/api).)*$/, (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});


server.listen(PORT, () => {
    connectToMongodb();
    console.log(`Server is running on port ${PORT}`);
});
