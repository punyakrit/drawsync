import express ,{ Router } from "express";
import jwt from 'jsonwebtoken';
const userRouter: Router = Router();
import  { userZod, SignInZod } from '@repo/common/types'
userRouter.use(express.json());

userRouter.post('/signup' ,(req,res)=>{
    const data = userZod.safeParse(req.body); 
    if(!data.success){
        res.status(400).json({
            message: 'Invalid input data' 
        });
        return 
    }
    const {email, password} = req.body
    res.json({
        message: 'User signed up successfully',
    })
})

userRouter.post('/signin' ,(req,res)=>{
    const data = SignInZod.safeParse(req.body);
    if(!data.success){
        res.status(400).json({
            message: 'Invalid input data'
        });
        return 
    }
    const {email, password} = req.body
    res.json({
        message: 'User signed up successfully',
    })
})

export default userRouter;