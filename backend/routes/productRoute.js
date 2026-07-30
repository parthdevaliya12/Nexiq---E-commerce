import express from "express"
import { addProduct, deleteProduct, getAllProduct, updateProduct } from "../controllers/productController.js"
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js"
import { mutltipleUplaod } from "../middleware/multer.js"



const routes = express.Router()

routes.post('/add', isAuthenticated, isAdmin, mutltipleUplaod, addProduct)
routes.get('/get', getAllProduct)
routes.put('/update/:productId', isAuthenticated, isAdmin, mutltipleUplaod, updateProduct)
routes.delete('/delete/:productId', isAuthenticated, isAdmin, deleteProduct)

export default routes