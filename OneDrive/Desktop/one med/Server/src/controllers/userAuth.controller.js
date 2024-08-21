import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { getUserByEmail , createUser } from '../mongodb/models/user.js';

export const registration = async (req, res) => {
    const { name, email, password, dateofBirth, gender } = req.body;

    if (!email || !password || !name || !dateofBirth || !gender) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
    try {
        const user = await getUserByEmail(email);
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already Exist"
            });
        }
        else if (!user) {
            const encryptPassword = await bcrypt.hash(password, 10);

            const avatar = "https://api.dicebear.com/7.x/notionists/svg";

            const result = await createUser({ 
                name : name, 
                email : email, 
                password: encryptPassword, 
                avatar : avatar, 
                dateofBirth : dateofBirth, 
                Gender : gender, 
                DependentUsers : [], 
                GuardianId : null, 
                healthIssues: [], 
            });
            result.password = undefined;
            const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

            return res.status(201).json({ success: true, token, result });

        }
        else {
            return res.status(400).json({
                success: false,
                message: "Please create a strong"
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

};


export const login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
    try {

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: "User Not Found", success: false });
        }

        const decryptPassword = await bcrypt.compare(password, user.password);
        if (!decryptPassword) {
            return res.status(400).json({ message: "Invalid Credentials", success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        user.password = undefined;
       
        return res.status(201).json({ success: true, token, user });

    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
};


export const logout = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "logged out successfully"
    })
}