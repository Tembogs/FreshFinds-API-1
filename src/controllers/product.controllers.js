import { createNewProduct, getAllProducts, getProductById, deleteProduct } from "../services/product.service.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, images, stock } = req.body;
    const newProduct = await createNewProduct(name, description, price, images, stock);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product by ID (optional route: /api/products/:id)
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product
export const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await deleteProduct(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
