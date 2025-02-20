import express from "express";
import { login, logout, register, verifyToken } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/verify-token", verifyToken);
authRouter.get("/", protectedRoute, (req, res) => {
    res.send("Korunan alana girdin.");
})

export default authRouter;