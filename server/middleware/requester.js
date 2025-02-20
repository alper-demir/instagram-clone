import jwt from "jsonwebtoken";

// Is the requesting user requesting their own profile or someone else's profile?
// A. The requesting user is updating their own profile.

export const requester = (req, res, next) => {
    const { userId } = req.params;
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.decode(token, process.env.JWT_SECRET);

        if (!decoded) return res.status(401).json({ message: "Unauthorized" });

        if (userId !== decoded.user._id) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Error verifying user", error });
    }
}