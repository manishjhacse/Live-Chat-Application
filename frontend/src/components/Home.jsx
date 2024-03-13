import React, { useState } from "react";
import { nanoid } from "nanoid";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { GoHeartFill } from "react-icons/go";
export default function Home({ socket }) {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const createRoomId =() => {
    try {
      const id = nanoid();
      setRoomId(id);
      toast.success("RoomId created")
    } catch (err) {
      toast.error("Unable to generate id, please try again");
    }
  };
  const handleJoinRoom = () => {
    if (userName === "" || roomId === "") {
      toast.warning("Please fill all the details");
      return;
    }
    try {
      socket.emit("join_room", { roomId });
      navigate(`/chatroom/${roomId}`, {
        state: { userName },
      });
      toast.success("Welcome to the Room")
    } catch (err) {
      toast.error("Unable to join, please try again");
    }
  };
  return (
    <div className=" justify-center bg-gradient-to-r from-slate-300 gap-y-3 to-slate-500 px-3 py-10 w-[250px] flex flex-col items-center rounded-md">
      <h1 className="text-xl font-bold">JOIN A CHAT</h1>
      <form className="w-full gap-y-2 flex flex-col">
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full bg-transparent outline-none border border-black placeholder:text-black rounded-md px-3 py-1 text-black"
          type="text"
          placeholder="Your Name"
        />

        <input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full bg-transparent outline-none border border-black placeholder:text-black rounded-md px-3 py-1 text-black"
          type="text"
          placeholder="ROOM ID"
        />
      </form>
      <div>
        <button
          onClick={handleJoinRoom}
          className="bg-gradient-to-r from-slate-900 to-slate-700 px-3 py-1 rounded-md text-white hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-900 transition-all duration-150 font-bold text-sm "
        >
          JOIN
        </button>
      </div>
      <div>
        <p>
          Create a{" "}
          <span
            onClick={createRoomId}
            className="font-bold italic underline cursor-pointer"
          >
            Room Id
          </span>
        </p>
      </div>
      <p  className="absolute w-full justify-center text-white bottom-0 flex items-center gap-1 left-1/2 -translate-x-1/2">Made with <GoHeartFill className="text-red-500" /> by <a className="text-green-500 font-bold" href="https://manishkumarjha.tech" target="_blank">Manish</a></p>
    </div>
  );
}
