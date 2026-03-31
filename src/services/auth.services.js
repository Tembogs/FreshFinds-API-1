import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';

// ✅ REGISTER
export const register = async (username, emailAddress, password, phoneNumber, address, role) => {
    try {
        //  Check if email already exists
        const existingUser = await User.findOne({ emailAddress });
        if (existingUser) return null; // or throw a specific error

        //  Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //  Create user
        const user = new User({
            name: username,
            emailAddress,
            password: hashedPassword,
            phoneNumber,
            address,
            role: role || "user"
        });

        // Save user
        await user.save();

        //  Remove sensitive info before returning
        user.password = undefined;

        return user;

    } catch (error) {
        console.error("❌ Register Service Error:", error);
        return null;
    }
};

// ✅ LOGIN
export const login = async (emailAddress, password) => {
    try {
        // Find user
        const user = await User.findOne({ emailAddress });
        if (!user) return null;

        //  Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        //  Generate token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        //  Remove password from returned user
        user.password = undefined;

        return { token, user };

    } catch (error) {
        console.error("❌ Login Service Error:", error);
        return null;
    }
};