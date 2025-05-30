import { WebSocketServer, WebSocket } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/index';
import { prismaCLient } from '@repo/prisma/db';
interface User {
  ws: WebSocket,
  rooms: String[]
  userId: Number
}

const users: User[] = []

function checkUser(token: string | null) {
  try {

    const decodedJWT = jwt.verify(token as string, JWT_SECRET) as { userId?: string }

    if (decodedJWT && decodedJWT.userId) {
      return decodedJWT.userId;

    }
    return null
  } catch (e) {
    return null
  }
}

const wss = new WebSocketServer({ port: 8080 });


wss.on('connection', function connection(ws, Request) {
  const url = Request.url
  if (!url) {
    return
  }
  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token');

  const userId = checkUser(token as string)

  if (userId === null) {
    ws.close()
    return null
  }

  users.push({
    userId: parseInt(userId as string),
    rooms: [],
    ws: ws
  })

  ws.on('message', async function message(data) {
    console.log(users)
    const parsedData = JSON.parse(data as unknown as string)

    if (parsedData.type === "join_room") {
      const user = users.find(x => x.ws === ws)
      user?.rooms.push(parsedData.roomId)
    }

   
    if (parsedData.type === "chat") {
      await prismaCLient.chat.create({
        data:{
          roomId:parseInt(parsedData.roomId),
          userId:parseInt(userId as string),
          message: parsedData.message
        }
      })
      const roomId = parsedData.roomId
      const message = parsedData.message

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(JSON.stringify({
            type: "chat",
            message: message,
            roomId: roomId
          }))
        }
      })
    }
  });


});