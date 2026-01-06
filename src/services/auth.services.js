import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const register = async (username, emailAddress, password, phoneNumber, address, role) => {
    try {
        console.log("Attempting to register user with:", { username, emailAddress, phoneNumber, address, role });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("Password hashed successfully.");
        const user = new User({
        name: username,
        email: emailAddress,
        password: hashedPassword,
        phoneNumber,
        address,
        role

        });
        console.log("User object created:", user);

        await user.save();
        console.log("User saved successfully.");

        return user;

    } catch (error) {
        console.log("Error during registration:", error);
        return null;
        
    }
};

export const login = async (emailAddress, password) => {
    try {
        const user = await User.findOne({ email: emailAddress });
        if (!user) {
            return null;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        
        console.log(isMatch);

        if (!isMatch) {
            return null;
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        return { token, user };
    } catch (error) {
        console.log(error);
        return null;
    }
}