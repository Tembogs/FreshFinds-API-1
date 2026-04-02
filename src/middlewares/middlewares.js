import express from "express";
import cors from "cors";

const setupMiddlewares = (app) => {
    app.use(cors({origin: "https://fresh-finds2025.vercel.app",
        credentials: true}));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    }

    export default setupMiddlewares;