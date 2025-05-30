import axios from "axios";
import React from "react";
import Chatroom from "../../components/Chatroom";

async function page({ params }: { params: { rooms: string } }) {
  const slug = (await params).rooms;

  const result = await axios.get(
    `http://localhost:8000/api/v1/room/slug/${slug}`,
    {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0ODU0NjI5NX0.wEBCggNbO5tRjOaOZlP3WcE-tNj2RYbL2zllFx7s1zY",
      },
    }
  );

  const roomId = result.data.messsage;
  return (
    <div>
      <Chatroom id={roomId} />
    </div>
  );
}

export default page;
