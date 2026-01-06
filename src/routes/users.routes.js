import { Router } from "express";
import { addToCart, deleteUser, getUserByEmailAddress, getUsers, updateUser } from "../controllers/users.controllers.js";
import { admin, protect } from "../middlewares/auth.js";

const router = Router();


router.post("/cart", protect, addToCart);
router.get("/", protect, admin, getUsers);
router.put("/:id", protect, updateUser);
router.get("/email", getUserByEmailAddress);
router.delete("/:id", protect, admin, deleteUser);

export default router;