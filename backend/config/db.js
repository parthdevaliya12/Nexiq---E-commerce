import mongoose from "mongoose";

const dbconnect = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Database Connected to ${process.env.MONGO_URL}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
};

export default dbconnect