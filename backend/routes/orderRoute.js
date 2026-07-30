import express from "express"
import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js"
import { orderCreate, verifyOrder, fakeUpiOrderCreate, getUserOrders, getAllOrders, updateOrderStatus, getUserOrdersAdmin } from "../controllers/orderController.js"

const router = express.Router()


router.post('/createorder', isAuthenticated, orderCreate)
router.post('/verifypayment', isAuthenticated, verifyOrder)

// New routes
router.post('/fake-upi', isAuthenticated, fakeUpiOrderCreate)
router.get('/user-orders', isAuthenticated, getUserOrders)
router.get('/admin-orders', isAuthenticated, isAdmin, getAllOrders)
router.put('/update-status/:id', isAuthenticated, isAdmin, updateOrderStatus)
router.get('/admin-user-orders/:userId', isAuthenticated, isAdmin, getUserOrdersAdmin)

export default router