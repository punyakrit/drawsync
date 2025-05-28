import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, Request) {
    const url = Request.url
    if(!url){
        return
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token');
    const decoded = jwt.verify (token as string , "123123" )

    if(!decoded){
        ws.close()
        return
    }

  ws.on('message', function message(data) {
    ws.send('Pong ')
  });


});