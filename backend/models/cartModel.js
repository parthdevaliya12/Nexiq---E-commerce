import mongoose from "mongoose"


const cartSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
        unique: true
    },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
            quantity: { type: Number, required: true, default: 1 },
            price: { type: Number, required: true },

        }
    ],
    totalPrice: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

const cartModel = mongoose.model("cart", cartSchema)

export default cartModel