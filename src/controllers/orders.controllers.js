import { checkout as checkoutService, verifyPayment as verifyPaymentService, getOrders as getOrdersService, getOrder as getOrderService, updateOrderStatus as updateOrderStatusService, getAllOrders as getAllOrdersService } from "../services/orders.services.js";
import mongoose from "mongoose";

export const checkout = async (req, res) => {
    const { paymentMethod } = req.body;
    try {
        const result = await checkoutService(req.user.id, paymentMethod);
        if (paymentMethod === 'Paystack') {
            return res.status(200).json(result);
        }
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const verifyPayment = async (req, res) => {
    const { reference } = req.query;
    try {
        const order = await verifyPaymentService(reference);
        if (!order) {
            return res.status(400).json({ message: "Payment verification failed" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getOrders = async (req, res) => {
    const orders = await getOrdersService(req.user.id);
    res.status(200).json(orders);
}

export const getAllOrders = async (req, res) => {
    const orders = await getAllOrdersService();
    res.status(200).json(orders);
}

export const getOrder = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid order ID" });
    }
    const order = await getOrderService(req.params.id);
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
}

export const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    const order = await updateOrderStatusService(req.params.id, status);
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
}