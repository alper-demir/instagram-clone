import express from "express";
import { login, logout, register, verifyToken } from "../controllers/auth.controller.js";
import User from "../models/user.model.js"

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/verify-token", verifyToken);

authRouter.get("/ping", async (req, res) => {  // Cron
    await User.findOne({ username: "alperdemir" }); // MongoDB inaktifliğini önlemek için sorgu gönderiyoruz.
    res.status(200).send("✅ Server is alive!");
});

export default authRouter;