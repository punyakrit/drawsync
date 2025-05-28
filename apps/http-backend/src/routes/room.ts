import express ,{ Request, Response, Router } from "express";
import { middleware } from "../middleware";

export const roomRouter: Router = Router()

roomRouter.use(express.json());

roomRouter.post('/', middleware, (req:Request, res:Response) => {
    res.json({
        message :"Room created successfully",
    })
})


