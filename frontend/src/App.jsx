import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ChatRoom from "./components/ChatRoom";
import { Toaster } from "react-hot-toast";
const socket = io.connect("https://live-chat-application-5nk8.onrender.com");
function App() {
  return (
    <div className="flex justify-center flex-col overflow-hidden h-screen w-screen bg-gray-900  sm:bg-gradient-to-r sm:from-slate-900 sm:to-slate-700 items-center">
      <Routes path="/">
        <Route path="/" element={<Home socket={socket} />} />
        <Route
          path="/chatroom/:roomId"
          element={<ChatRoom socket={socket} />}
        />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
      
    
    </div>
  );
}

export default App;
