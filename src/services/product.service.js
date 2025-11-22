import Product from "../models/product.js";

// Create a new product
export const createNewProduct = async (name, description, price, images, stock) => {
  const newProduct = new Product({
    name,
    description,
    price,
    images,
    stock,
  });
  return await newProduct.save();
};

// Get ALL products
export const getAllProducts = async () => {
  return await Product.find();
};

// Get ONE product by ID
export const getProductById = async (id) => {
  return await Product.findById(id);
};

// Delete product by ID
export const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};
