import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import dbconnect from "./config/db.js"
import userRoutes from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoute.js"
import orderRoute from "./routes/orderRoute.js"
import analyticsRoute from "./routes/analyticsRoute.js"




dotenv.config()

const app = express()
const port = process.env.PORT || 5000
app.use(express.json())


app.use(cors({
    origin: true,
    credentials: true,
}))

dbconnect()

app.use('/api/user', userRoutes)
app.use('/api/product', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)
app.use('/api/analytics', analyticsRoute)





app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})