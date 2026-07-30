import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
export const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Unauthorized access", success: false })
        }
        const token = authHeader.split(" ")[1]
        let decoded
        try {
            decoded = await jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(400).json({ message: "Registration token has expired", success: false })

            }
            return res.status(400).json({ message: "Token verification failed", success: false })
        }
        const user = await userModel.findById(decoded.id)
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false })
        }
        req.user = user
        req.id = user._id
        next()

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message })
    }
}


export const isAdmin = async (req, res, next) => {
    try {
        if (req.user && req.user.role === "admin") {
            next()
        } else {
            return res.status(403).json({ message: "Access denied", success: false })
        }


    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message })
    }
}

