import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;

    if (!firstName || !lastName || !username || !email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const usernameExists = await User.findOne({ username });
        const userEmailExists = await User.findOne({ email });

        if (usernameExists) {
            return res.status(400).json({ message: "Username already exists!" });
        }

        if (userEmailExists) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const user = await User.findOne({ username }, { username: 1, password: 1, profilePicture: 1 });
        
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        user.password = undefined; // We don't want to include password in the token

        const token = generateToken(user);
        res.setHeader("token", `Bearer ${token}`);
        res.status(200).json({ message: "Login successful!", user, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
}

export const logout = async (req, res) => {
    //
}

export const verifyToken = async (req, res) => {

    const { token } = req.body;
    try {

        if (!token) return res.status(401).json({ message: "Unauthorized" });
        if (!jwt.verify(token, process.env.JWT_SECRET)) {
            res.status(401).json({ message: "Unauthorized" });
        }

        res.status(200).json({ message: "Token is valid!", isTokenValid: true });
    } catch (error) {
        res.status(500).json({ message: "Error verify token!" });
    }
}