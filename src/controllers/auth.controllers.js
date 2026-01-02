import { register as registerService, login as loginService } from "../services/auth.services.js";

export const register = async (req, res) => {
    const { email, password,} = req.body;
    const user = await registerService( email, password,);
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
    res.status(201).json(data);
}


