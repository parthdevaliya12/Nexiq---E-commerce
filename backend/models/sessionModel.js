import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
    
}, { timestamps: true })

const sessionModel = mongoose.model("session", sessionSchema)

export default sessionModel