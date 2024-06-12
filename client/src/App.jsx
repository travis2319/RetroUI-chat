import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([
        ...messages,
        {
          text: newMessage,
          time: new Date().toLocaleTimeString(),
          isUser: true,
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-blue-500">
      <div className="container mx-auto h-full flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full h-full">
          <div className="col-span-1 md:col-span-1 flex flex-col bg-black bg-opacity-40 rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-2 rounded-l-lg bg-black bg-opacity-30 text-white border-0 focus:outline-none"
                />
                <span className="absolute top-0 right-0 p-2 bg-black bg-opacity-30 text-white rounded-r-lg cursor-pointer">
                  <i className="fas fa-search"></i>
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ul className="space-y-4 p-4">
                <li className="bg-black bg-opacity-30 p-2 rounded-lg flex items-center space-x-4">
                  <div className="relative w-16 h-16">
                    <img
                      src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                      className="rounded-full border-2 border-white w-full h-full"
                      alt="user"
                    />
                    <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                  </div>
                  <div className="text-white">
                    <span className="block text-xl">Khalid Charif</span>
                    <p className="text-sm text-gray-400">Online</p>
                  </div>
                </li>
                {/* Repeat similar structure for other users */}
              </ul>
            </div>
          </div>
          <div className="col-span-1 md:col-span-3 flex flex-col bg-black bg-opacity-40 rounded-lg overflow-hidden">
            <div className="p-4 flex items-center space-x-4 bg-black bg-opacity-40 rounded-t-lg">
              <div className="relative w-16 h-16">
                <img
                  src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                  className="rounded-full border-2 border-white w-full h-full"
                  alt="user"
                />
                <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="text-white">
                <span className="block text-xl">Khalid Charif</span>
                <p className="text-sm text-gray-400">1767 Messages</p>
              </div>
              <div className="ml-auto flex space-x-4 text-white text-xl cursor-pointer">
                <i className="fas fa-video"></i>
                <i className="fas fa-phone"></i>
                <i className="fas fa-ellipsis-v"></i>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 ${
                    message.isUser ? "justify-end" : ""
                  }`}
                >
                  <div className="relative w-10 h-10">
                    <img
                      src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                      className="rounded-full border-2 border-white w-full h-full"
                      alt="user"
                    />
                  </div>
                  <div
                    className={`p-3 rounded-xl relative text-white ${
                      message.isUser ? "bg-green-300" : "bg-blue-300"
                    }`}
                  >
                    {message.text}
                    <span
                      className={`absolute top-12   ${
                        message.isUser ? "right-0" : "left-0"
                      } text-xs text-gray-400`}
                    >
                      {message.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-black bg-opacity-40 rounded-b-lg flex items-center">
              <span className="p-2 bg-black bg-opacity-30 text-white rounded-l-lg cursor-pointer">
                <i className="fas fa-paperclip"></i>
              </span>
              <textarea
                className="w-full p-2 bg-black bg-opacity-30 text-white border-0 focus:outline-none"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              ></textarea>
              <span
                className="p-2 bg-black bg-opacity-30 text-white rounded-r-lg cursor-pointer"
                onClick={handleSendMessage}
              >
                <i className="fas fa-location-arrow"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
