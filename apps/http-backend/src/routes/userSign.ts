import express ,{ Router } from "express";
import jwt from 'jsonwebtoken';
const userRouter: Router = Router();

userRouter.use(express.json());

userRouter.post('/signup' ,(req,res)=>{
    const {email, password} = req.body
    res.json({
        message: 'User signed up successfully',
    })
})

userRouter.post('/signin' ,(req,res)=>{
    const {email, password} = req.body
    res.json({
        message: 'User signed up successfully',
    })
})

export default userRouter;