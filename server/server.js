import path from "path";
import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import http from "http"
import authRouter from "./routes/auth.routes.js";
import connection from "./database/conntectToDB.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import conversationRouter from "./routes/conversation.routes.js";
import messageRouter from "./routes/message.routes.js";
import cloudinary from "./config/cloudinary.js";
import socketConfig from "./config/socketConfig.js";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
dotenv.config();

app.use("/api/auth", authRouter)
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/messages", messageRouter);

const PORT = process.env.PORT || 5000;

connection();
const io = socketConfig(server);

const __dirname = path.resolve();

if (process.env.NODE_ENV.trim() === "production") {
    app.use(express.static(path.join(__dirname, "/client/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    });
}

server.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) }); 