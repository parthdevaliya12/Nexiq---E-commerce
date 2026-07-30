import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

export const getCart = async (req, res) => {
    try {
        const userId = req.id
        const cart = await cartModel.findOne({ userId }).populate("items.productId")
        if (!cart) {
            return res.json({ success: true, cart: [] })
        }
        res.status(200).json({ success: true, cart })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}


export const addToCart = async (req, res) => {
    try {
        const userId = req.id
        const { productId } = req.body
        //check if product exit
        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            });
        }
        //find the user cart if exit
        let cart = await cartModel.findOne({ userId })

        //cart dosen't exit create a new cart
        if (!cart) {
            cart = new cartModel({
                userId, items: [{ productId, quantity: 1, price: product.productPrice }],
                totalPrice: product.productPrice
            })
        } else {
            //find if product already in cart
            const itemIndex = cart.items.findIndex(
                (item) => item.productId && item.productId.toString() === productId
            )
            if (itemIndex > -1) {
                //if product exists - just increase qty
                cart.items[itemIndex].quantity += 1
            } else {
                //if new product - push to cart
                cart.items.push({ productId, quantity: 1, price: product.productPrice })
            }

            //recalculate total price
            cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
        }

        //save updated cart
        await cart.save()

        //populate product details before sending response
        const populatedCart = await cartModel.findById(cart._id).populate("items.productId")

        res.status(200).json({ success: true, message: "Product added to cart", cart: populatedCart })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}


export const updateQuantity = async (req, res) => {
    try {
        const userId = req.id
        const { productId, type } = req.body


        let cart = await cartModel.findOne({ userId })

        //cart dosen't exit create a new cart
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }
        const item = cart.items.find(
            (item) => item.productId && item.productId.toString() === productId,
        )

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found"
            });
        }
        if (type === "increase") item.quantity += 1
        if (type === "decrease" && item.quantity > 1) item.quantity -= 1
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
        //save updated cart
        await cart.save()
        cart = await cart.populate("items.productId")


        res.status(200).json({ success: true, cart })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}


export const rmeoveFromCart = async (req, res) => {
    try {
        const userId = req.id
        const { productId } = req.body


        let cart = await cartModel.findOne({ userId })

        //cart dosen't exit create a new cart
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            (item) => item.productId && item.productId.toString() !== productId,
        )
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
        cart = await cart.populate("items.productId")
        await cart.save()

        res.status(200).json({ success: true, cart })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}
