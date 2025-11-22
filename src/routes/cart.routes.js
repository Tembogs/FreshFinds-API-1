import { Router } from "express";
import { getCart, addToCart, updateCart, removeFromCart } from "../../controllers/cart.controllers.js";
import { protect } from "../../middlewares/auth.js";

const router = Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.put("/", protect, updateCart);
router.delete("/", protect, removeFromCart);

export default router;