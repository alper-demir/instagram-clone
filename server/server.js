import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import connection from "./database/conntectToDB.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import cloudinary from "./config/cloudinary.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
dotenv.config();

app.use("/api/auth", authRouter)
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

const PORT = process.env.PORT || 5000;

connection();
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) }); 