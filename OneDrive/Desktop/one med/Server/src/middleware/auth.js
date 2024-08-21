import jwt from "jsonwebtoken";
import User from "../mongodb/models/user.js";



export const isLoggedIn = async (req, res, next) => {
    const token = req.header("Authorization");
    console.log(token);
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Please login to access resource"
        });
    }
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId.id);
    req.user = user;
    next();
};