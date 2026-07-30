import mongoose from "mongoose"


const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
            quantity: { type: Number, required: true },
        }
    ],
    amount: {
        type: Number, required: true
    },
    tax: {
        type: Number,
        required: true
    },
    shipping: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: "INR"
    },
    status: {
        type: String,
        enum: ["Pending", "Paid", "Failed", "Delivered"],
        default: "Pending"
    },
    paymentMethod: {
        type: String,
        enum: ["Razorpay", "FakeUPI"],
        default: "Razorpay"
    },
    address: {
        type: Object,
        required: true
    },

    //razorepay field
    razorepayOrderId: {
        type: String,
    },
    razorepayPaymentId: {
        type: String
    },
    razorepaySignature: {
        type: String
    }


}, { timestamps: true })

const orderModel = mongoose.model("order", orderSchema)

export default orderModel