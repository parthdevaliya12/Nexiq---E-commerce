import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    profilePic: { //cloudinary image 
        type: String,
        default: ""
    },
    profilePicPublicId: { //cloudinary public id for deletion
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    googleId: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    zipcode: {
        type: Number,
    },
    phoneNo: {
        type: Number,
    },


}, { timestamps: true })

const userModel = mongoose.model("users", userSchema)
export default userModel