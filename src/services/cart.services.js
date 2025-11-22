import User from "../models/user";

export const getCart = async (userId) => {
    const user = await User.findById(userId).populate("cart.product");
    return user.cart;
}

export const addToCart = async (userId, productId, quantity) => {
    const user = await User.findById(userId);
    const cartItem = user.cart.find((item) => item.product == productId);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        user.cart.push({ product: productId, quantity });
    }
    await user.save();
    return user.cart;
}

export const updateCart = async (userId, productId, quantity) => {
    const user = await User.findById(userId);
    const cartItem = user.cart.find((item) => item.product == productId);
    if (cartItem) {
        cartItem.quantity = quantity;
    }
    await user.save();
    return user.cart;
}

export const removeFromCart = async (userId, productId) => {
    const user = await User.findById(userId);
    user.cart = user.cart.filter((item) => item.product != productId);
    await user.save();
    return user.cart;
}