import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import { v2 as cloudinary } from "cloudinary";

import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoute from "./routes/messageRoute.js";

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set the maximum payload size (in bytes)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// This is the inbuilt express Middleware
//Middleware is the function between req, and res
app.use(express.json({ limit: "50mb" })); //To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); //To parse form data in the req.body
app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoute);

app.listen(PORT, () =>
  console.log(`Server has started running at http://localhost:${PORT}`)
);
