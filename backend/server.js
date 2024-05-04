import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";

import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

// This is the inbuilt express Middleware
//Middleware is the function between req, and res
app.use(express.json()); //To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); //To parse form data in the req.body
app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () =>
  console.log(`Server don start at http://localhost:${PORT}`)
);
