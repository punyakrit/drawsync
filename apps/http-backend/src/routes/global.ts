import express ,{ Router } from "express";
import userRouter from "./userSign";
import { roomRouter } from "./room";

const globalRouter: Router = Router();



globalRouter.use('/user' ,userRouter)
globalRouter.use('/room', roomRouter)

export default globalRouter;