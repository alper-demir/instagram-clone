import jwt from "jsonwebtoken";

export const protectedRoute = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    if (!jwt.verify(token, process.env.JWT_SECRET)) {
        res.status(401).json({ message: "Unauthorized" });
    }
    next();
}