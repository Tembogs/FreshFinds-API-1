import { Router } from "express";
import { createProduct, getProducts, getProduct, deleteProducts } from "../controllers/product.controllers.js";
import { protect } from "../middlewares/auth.js";

const router = Router();

router.post("/", protect, createProduct);      // Create
router.get("/",protect, getProducts);         // Get all
router.get("/:id",protect, getProduct);       // Get one
router.delete("/:id",protect, deleteProducts) // Delete

export default router;
