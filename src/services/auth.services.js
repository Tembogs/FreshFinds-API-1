import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MongoClient } from 'mongodb';
import 'dotenv/config';


export const register = async (username, emailAddress, password, phoneNumber, address, role) => {
    try {
        console.log("Attempting to register user with:", { username, emailAddress, phoneNumber, address, role });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("Password hashed successfully.");
        const user = new User({
        name: username,
        emailAddress: emailAddress,
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
    const client = new MongoClient(process.env.MONGO_URL); // Ensure this is imported
    try {
        await client.connect(); // ⚡ CRITICAL: You must connect first!
        const db = client.db();
        const user = await db.collection('users').findOne({ emailAddress });

        if (!user) {
            console.log("❌ User not found with email:", emailAddress);
            return null;
        }

        console.log("✅ User found:", user.emailAddress);
        
        // This matches 'password' from your seedAdmin script
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("📊 Match Result:", isMatch);

        if (!isMatch) {
            return null;
        }

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        return { token, user };
    } catch (error) {
        console.log("❌ Login Error:", error);
        return null;
    } finally {
        await client.close(); // Best practice: close connection after logic
    }
}
