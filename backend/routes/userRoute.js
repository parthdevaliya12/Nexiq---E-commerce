import express from "express"
import { allUsers, checkPassword, forgetPassword, getUserById, login, logout, register, reVerify, updateUser, verify, verifyOtp, googleAuth } from "../controllers/userController.js"
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js"
import { singleUpload } from "../middleware/multer.js"


const routes = express.Router()

routes.post('/register', register)
routes.post('/verify', verify)
routes.post('/reverify', reVerify)
routes.post('/login', login)
routes.post('/google', googleAuth)
routes.post('/logout', isAuthenticated, logout)
routes.post('/forgetpassword', forgetPassword)
routes.post('/verifyotp/:email', verifyOtp)
routes.post('/changepassword/:email', checkPassword)
routes.get('/allusers', isAuthenticated, isAdmin, allUsers)
routes.get('/getuser/:userId', getUserById)
routes.put("/update/:id", isAuthenticated, singleUpload, updateUser);


export default routes