import express ,{ Request, Response, Router } from "express";
import { middleware } from "../middleware";
import { prismaCLient } from "@repo/prisma/db";

export const roomRouter: Router = Router()

roomRouter.use(express.json());

roomRouter.post('/', middleware, async (req:Request, res:Response) => {
    const {name} = req.body
    const userId = req.userId
    try{

        const roomId = await prismaCLient.room.create({
            data:{
                name:name,
                userId: parseInt(userId as string)
            }
        })
        res.json({
            message :"Room created successfully",
            roomId : roomId?.id
        })
    }catch(e){
        res.status(400).json({
            message :"Error "+ e,
        })
    }
})


roomRouter.get('/all', middleware, async (req:Request, res:Response) => {
    
    const userId = req.userId
    try{

        const rooms = await prismaCLient.room.findMany({
            where:{
                userId: parseInt(userId as string)
            }
        })
        res.json({
            rooms
        })
    }catch(e){
        res.status(400).json({
            message :"Error "+ e,
        })
    }
})

roomRouter.get('/slug/:slug', middleware, async (req:Request, res:Response) => {
    const slug = req.params.slug;
    const userId = req.userId
    try{

        const rooms = await prismaCLient.room.findFirst({
            where:{
                name: slug,
            }
        })
        res.json({
            messsage : rooms?.id
        })
    }catch(e){
        res.status(400).json({
            message :"Error "+ e,
        })
    }
})


roomRouter.get('/messages', middleware, async (req:Request, res:Response) => {
    const roomId = req.query.id;
    const userId = req.userId
    try{

        const chats = await prismaCLient.chat.findMany({
            where:{
                userId: parseInt(userId as string),
                roomId: parseInt(roomId as string)
            },orderBy:{
                id:"desc"
            },
            take:50
        })
        res.json({
            chats
        })
    }catch(e){
        res.status(400).json({
            message :"Error "+ e,
        })
    }
})