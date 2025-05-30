import axios from 'axios'
import React from 'react'

async function getChats(roomId:string) {
    const response  = await axios.get(`http://localhost:8000/api/v1/room/messages?id=${roomId}`, {
        headers:{
            Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0ODU0NjI5NX0.wEBCggNbO5tRjOaOZlP3WcE-tNj2RYbL2zllFx7s1zY"
        }
    })
    return response.data
}

async function Chatroom({id}:{id:string}) {
    const data =  await getChats(id)
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}

export default Chatroom
