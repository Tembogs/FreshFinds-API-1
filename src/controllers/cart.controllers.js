import { getCart as getCartService, addToCart as addToCartService, updateCart as updateCartService, removeFromCart as removeFromCartService } from "../services/cart.services.js";

export const getCart = async (req, res) => {
    const cart = await getCartService(req.user.id);
    res.status(200).json(cart);
}

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const cart = await addToCartService(req.user.id, productId, quantity);
    res.status(200).json(cart);
}

export const updateCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const cart = await updateCartService(req.user.id, productId, quantity);
    res.status(200).json(cart);
}

export const removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const cart = await removeFromCartService(req.user.id, productId);
    res.status(200).json(cart);
}