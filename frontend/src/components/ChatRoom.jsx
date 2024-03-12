import React, { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useLocation, useParams } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-hot-toast";
export default function ChatRoom({ socket }) {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const userName = location.state.userName;
  const { roomId } = useParams();
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (message === "") return;

    const messageData = {
      roomId,
      userName,
      message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    await socket.emit("send_message", messageData);
    setChats((prev) => [...prev, messageData]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (messageData) => {
      setChats((prev) => [...prev, messageData]);
      scrollToBottom();
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleCopy = async () => {
    navigator.clipboard.writeText(roomId);
    toast.success("RoomId Copied to clipboard")
  };
useEffect(()=>{
    scrollToBottom()
},[chats])
  return (
    <div className=" bg-gray-900 md:bg-opacity-80  text-white px-3 overflow-hidden md:py-1 w-screen sm:w-[300px] h-[100%] py-3 sm:h-[500px] flex flex-col items-center rounded-md">
      <h1 className="uppercase relative flex items-center gap-2 font-bold text-base">
        Your Private Room
        <FaCopy className="cursor-pointer" onClick={handleCopy} />
      </h1>
      <div className="w-full  overflow-y-scroll hide-scrollbar py-3 h-[85%] md:h-[87%]">
        {chats.map((messageContent, index) => {
          const isUserMessage = userName === messageContent.userName;
          return (
            <div
              key={index}
              className={`flex flex-col ${
                isUserMessage ? "items-end" : "items-start"
              } mb-4`}
            >
              <div 
              style={{
                maxWidth: "200px", // Set a maximum width for the message content
                overflow: "hidden", // Hide overflowing content
                wordWrap: "break-word", // Allow the text to wrap onto the next line
              }}
                className={`rounded-lg py-1 px-2 ${
                  isUserMessage
                    ? "bg-green-500 text-white"
                    : "bg-[#1E40AF] text-white"

                }`}
              >
                <p className="text-sm ">{messageContent.message}</p>
              </div>
              <div className="text-[10px] text-slate-500">
                <span className="mr-1">{messageContent.time}</span>
                <span>{messageContent.userName}</span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="relative px border border-[#9CA3AF] my-1 rounded-md flex w-full justify-start">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          className="w-[90%] bg-transparent outline-none  placeholder:text-slate-400 py-1 px-1 text-white"
          type="text"
          placeholder="Message..."
        />
        <button
          onClick={handleSend}
          className="px-1 py-1 text-blue-500 font-bold  rounded-full absolute text-2xl right-1 top-1/2 -translate-y-1/2"
        >
          <IoIosSend />
        </button>
      </div>
    </div>
  );
}
