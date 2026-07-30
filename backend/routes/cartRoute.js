import express from "express"
import { addToCart, getCart, rmeoveFromCart, updateQuantity } from "../controllers/cartController.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js"


const routes = express.Router()

routes.get('/', isAuthenticated, getCart)
routes.post('/addtocart', isAuthenticated, addToCart)
routes.put('/update', isAuthenticated, updateQuantity)
routes.delete('/remove', isAuthenticated, rmeoveFromCart)

export default routes