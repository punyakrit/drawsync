import express, { Router } from "express";
import jwt from 'jsonwebtoken';
const userRouter: Router = Router();
import { userZod, SignInZod } from '@repo/common/types'
import { prismaCLient } from "@repo/prisma/db";
import { JWT_SECRET } from "@repo/backend-common/index";
userRouter.use(express.json());

userRouter.post('/signup', async (req, res) => {
    const data = userZod.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({
            message: 'Invalid input data'
        });
        return
    }
    const { name, username, password } = req.body
    try {

        await prismaCLient.user.create({
            data: {
                username: username,
                password: password,
                name: name,
                photo: ""
            }
        })
        res.json({
            message: 'User signed up successfully',
        })
    } catch (e) {
        res.status(411).json({
            message: "Something went wrong " + e
        })
    }
})

userRouter.post('/signin', async (req, res) => {
    const data = SignInZod.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({
            message: 'Invalid input data'
        });
        return
    }
    const { username, password } = req.body
    try {

        const userExists = await prismaCLient.user.findFirst({
            where: {
                username: username,
                password: password
            }
        })

        if (!userExists) {
            res.status(400).json({
                message: "Invalid Credentials"
            })
            return
        }

        const token = jwt.sign({ userId: userExists?.id }, JWT_SECRET)
        res.json({
            message: 'User signed in successfully',
            token : token
        })
    } catch (e) {
        res.status(411).json({
            message: "Something went wrong " + e
        })
    }
})

export default userRouter;