import Order from "../models/order.js";
import User from "../models/user.js";
import sendEmail from "./email.services.js";
import axios from "axios";
import "dotenv/config";

export const checkout = async (userId, paymentMethod) => {
    const user = await User.findById(userId).populate("cart.product");
    if (!user || !user.cart.length) {
        throw new Error("User not found or cart is empty");
    }

    const total = user.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

    if (paymentMethod === 'Paystack') {
        const params = {
            email: user.email,
            amount: total * 100, // Paystack amount is in kobo
            metadata: {
                userId: userId,
                cart: user.cart,
            }
        };

        const { data } = await axios.post('https://api.paystack.co/transaction/initialize', params, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const order = new Order({
            user: userId,
            items: user.cart,
            total,
            payment: {
                method: paymentMethod,
                reference: data.data.reference,
            },
        });
        await order.save();

        return { authorization_url: data.data.authorization_url };
    } else {
        const order = await createOrder(userId, paymentMethod);
        return order;
    }
};

export const verifyPayment = async (reference) => {
    const { data } = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
    });

    if (data.data.status === 'success') {
        const order = await Order.findOneAndUpdate({ "payment.reference": reference }, { "payment.status": "Paid" }, { new: true }).populate('user');
        if (order) {
            const user = await User.findById(order.user._id);
            user.cart = [];
            await user.save();

            // Send order confirmation email
            const subject = "Your Order Confirmation";
            const itemsHtml = order.items.map(item => `<li>${item.product.name} (x${item.quantity}) - ${item.product.price * item.quantity}</li>`).join('');
            const html = `<h1>Order Confirmed!</h1>
                        <p>Hi ${order.user.name},</p>
                        <p>Your order with ID ${order._id} has been placed successfully.</p>
                        <h3>Order Summary:</h3>
                        <ul>${itemsHtml}</ul>
                        <h3>Total: ${order.total}</h3>
                        <p>Thank you for your purchase!</p>`;
            await sendEmail(order.user.email, subject, html);
            return order;
        }
    }
    return null;
};

export const createOrder = async (userId, paymentMethod) => {
    const user = await User.findById(userId).populate("cart.product");
    if (!user.cart.length) {
        return null;
    }
    const total = user.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const order = new Order({
        user: userId,
        items: user.cart,
        total,
        payment: {
            method: paymentMethod,
        },
    });
    await order.save();

    // Send order confirmation email
    const subject = "Your Order Confirmation";
    const itemsHtml = order.items.map(item => `<li>${item.product.name} (x${item.quantity}) - ${item.product.price * item.quantity}</li>`).join('');
    const html = `<h1>Order Confirmed!</h1>
                <p>Hi ${user.name},</p>
                <p>Your order with ID ${order._id} has been placed successfully.</p>
                <h3>Order Summary:</h3>
                <ul>${itemsHtml}</ul>
                <h3>Total: ${order.total}</h3>
                <p>Thank you for your purchase!</p>`;
    await sendEmail(user.email, subject, html);

    user.cart = [];
    await user.save();
    return order;
}

export const getOrders = async (userId) => {
    const orders = await Order.find({ user: userId });
    return orders;
}

export const getAllOrders = async () => {
    const orders = await Order.find();
    return orders;
}

export const getOrder = async (orderId) => {
    const order = await Order.findById(orderId);
    return order;
}

export const updateOrderStatus = async (orderId, status) => {
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    return order;
}