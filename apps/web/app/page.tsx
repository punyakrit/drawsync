"use client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

function page() {
  const[roomId, setRoomId] = useState<string>("")
  const router = useRouter()
  function call(){
    router.push(`/chat/${roomId}`)
  }
  return (
    <div >
      <input placeholder='room id' onChange={(e)=>setRoomId(e.target.value)}></input>
      <button onClick={call}>Send Now</button>
    </div>
  )
}

export default page
