import { Router } from "express";
import { createProduct, getProducts, getProduct, deleteProducts } from "../controllers/product.controllers.js";

const router = Router();

router.post("/", createProduct);      // Create
router.get("/", getProducts);         // Get all
router.get("/:id", getProduct);       // Get one
router.delete("/:id", deleteProducts) // Delete

export default router;
