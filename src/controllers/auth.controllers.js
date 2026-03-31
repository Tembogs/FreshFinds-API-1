import { register as registerService, login as loginService } from "../services/auth.services.js";

export const register = async (req, res) => {
    const { name, emailAddress, password, phoneNumber, address, role} = req.body;
    const user = await registerService(name, emailAddress, password, phoneNumber, address, role);
    if(!user) {
        return res.status(400).json({ message: "user not created"});
    }
    res.status(201).json(user);
}

export const login = async (req, res) => {
    const {emailAddress,password } = req.body
    const data = await loginService(emailAddress, password);
    if(!data) {
        return res.status(400).json({message: "Invalid Credentials"});
    }

    const { token, user } = data;

        // 🍪 Secure cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        res.status(200).json({
            message: "Login successful",
            user
        });
}


