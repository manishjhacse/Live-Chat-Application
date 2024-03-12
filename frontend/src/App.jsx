import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { GoHeartFill } from "react-icons/go";
import ChatRoom from "./components/ChatRoom";
import { Toaster } from "react-hot-toast";
const socket = io.connect("https://live-chat-application-5nk8.onrender.com");
function App() {
  return (
    <div className="flex relative justify-center flex-col overflow-hidden h-screen w-screen bg-gradient-to-r from-slate-900 to-slate-700 items-center">
      <Routes path="/">
        <Route path="/" element={<Home socket={socket} />} />
        <Route
          path="/chatroom/:roomId"
          element={<ChatRoom socket={socket} />}
        />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
      
      <p  className="absolute w-full justify-center text-white bottom-0 flex items-center gap-1 left-1/2 -translate-x-1/2">Made with <GoHeartFill className="text-red-500" /> by <a className="text-green-500 font-bold" href="https://manishkumarjha.tech" target="_blank">Manish</a></p>
    </div>
  );
}

export default App;
