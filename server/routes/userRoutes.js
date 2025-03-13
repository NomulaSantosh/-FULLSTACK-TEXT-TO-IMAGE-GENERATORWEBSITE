import express from 'express'
import {
    userCredits,
    paymentRazorpay,
    verifyRazorpay,
    registerUser,
    loginUser,
    paymentStripe,
    verifyStripe
} from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js'

const userRouter = express.Router()

//in the userRouter we have to create the endpoint path {'/register} and we have to provide the controller function at the endpoint

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/credits', userAuth, userCredits)
userRouter.post('/pay-razor', userAuth, paymentRazorpay)
userRouter.post('/verify-razor', verifyRazorpay)
userRouter.post('/pay-stripe', userAuth, paymentStripe)
userRouter.post('/verify-stripe', userAuth, verifyStripe)
export default userRouter

// http://localhost:4000/api/users/register
// http://localhost:4000/api/users/login
