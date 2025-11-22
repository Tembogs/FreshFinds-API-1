import { Router } from "express";
import { checkout, verifyPayment, getOrders, getOrder, updateOrderStatus, getAllOrders } from "../controllers/orders.controllers.js";
import { protect, admin } from "../middlewares/auth.js";

const router = Router();

router.post("/checkout", protect, checkout);
router.get("/verify-payment", verifyPayment);
router.get("/", protect, getOrders);
router.get("/all", protect, admin, getAllOrders);
router.get("/:id", protect, getOrder);
router.put("/:id", protect, admin, updateOrderStatus);

export default router;