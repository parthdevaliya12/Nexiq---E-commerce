import razorpayInstance from "../config/razorpay.js"
import cartModel from "../models/cartModel.js"
import orderModel from "../models/orderModel.js"
import crypto from "crypto"

export const orderCreate = async (req, res) => {
    try {
        const { products, amount, tax, shipping, currency } = req.body
        const options = {
            amount: Math.round(Number(amount) * 100), //convert to paisa
            currency: currency || "INR",
            receipt: `receipt ${Date.now()}`
        }

        const razorpayOrder = await razorpayInstance.orders.create(options)

        //save order in DB
        const newOrder = new orderModel({
            user: req.user._id,
            products,
            amount,
            tax,
            shipping,
            currency,
            status: "Pending",
            razorpayOrderId: razorpayOrder.id
        })


        await newOrder.save()

        return res.status(200).json({ success: true, dbOrder: newOrder, order: razorpayOrder })


    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", message: error.message })
    }
}

export const fakeUpiOrderCreate = async (req, res) => {
    try {
        const { products, amount, tax, shipping, currency, address } = req.body
        const userId = req.user._id

        //save order in DB directly as Paid
        const newOrder = new orderModel({
            user: userId,
            products,
            amount,
            tax,
            shipping,
            currency,
            address,
            status: "Paid",
            paymentMethod: "FakeUPI",
            razorpayOrderId: `fake_order_${Date.now()}`,
            razorepayPaymentId: `fake_payment_${Date.now()}`,
            razorepaySignature: `fake_sign_${Date.now()}`
        })

        await newOrder.save()
        
        // Clear cart
        await cartModel.findOneAndUpdate({ userId }, { $set: { items: [], totalPrice: 0 } })

        return res.status(200).json({ success: true, message: "Payment success", order: newOrder })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", message: error.message })
    }
}

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id
        const orders = await orderModel.find({ user: userId }).populate('products.productId').sort({ createdAt: -1 })
        return res.status(200).json({ success: true, orders })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", message: error.message })
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate('user', 'firstname lastname email').populate('products.productId').sort({ createdAt: -1 })
        return res.status(200).json({ success: true, orders })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", message: error.message })
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        const order = await orderModel.findByIdAndUpdate(id, { status }, { new: true })
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" })
        }
        return res.status(200).json({ success: true, message: "Order status updated", order })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", message: error.message })
    }
}

export const getUserOrdersAdmin = async (req, res) => {
    try {
        const { userId } = req.params
        const orders = await orderModel.find({ user: userId }).populate('products.productId').sort({ createdAt: -1 })
        return res.status(200).json({ success: true, orders })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", message: error.message })
    }
}
export const verifyOrder = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentFailed } = req.body
        const userId = req.user._id
        if (paymentFailed) {
            const order = await orderModel.findOneAndUpdate({ razorpayOrderId: razorpay_order_id }, { status: "Failed" }, { new: true })
            return res.status(400).json({ success: false, message: "Payment failed", order })

        }

        const sign = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(sign.toString()).digest("hax")

        if (expectedSignature === razorpay_signature) {
            const order = await orderModel.findOneAndUpdate({ razorpayOrderId: razorpay_order_id }, { status: "Paid", razorepayPaymentId: razorpay_payment_id, razorepaySignature: razorpay_signature }, { new: true })


            await cartModel.findOneAndUpdate({ userId }, { $set: { items: [], totalPrice: 0 } })

            return res.status(200).json({ success: true, message: "Payment success", order })
        } else {
            await orderModel.findOneAndUpdate({ razorpayOrderId: razorpay_order_id }, { status: "Failed" }, { new: true })
        }
        return res.status(400).json({ success: false, message: "Invalid signature", order })



    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", message: error.message })
    }
}

