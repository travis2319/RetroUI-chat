import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "../../contexts/SocketContext";

const ChatPage = ({ userList }) => {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [currentUserSocketId, setCurrentUserSocketId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (socket) {
      setCurrentUserSocketId(socket.id);
      socket.on("send_message", handleReceiveMessage);
      return () => {
        socket.off("send_message", handleReceiveMessage);
      };
    }
  }, [socket]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleReceiveMessage = (data) => {
    console.log(`received from other user: ${(data.text, data.name)}`);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: data.text,
        timestamp: formatTime(new Date()),
        isPersonal: false,
        name: data.name, // Include the name of the sender
      },
    ]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const currentUser = userList.find(
        (user) => user.id === currentUserSocketId
      ); // Find current user from userList
      const messageData = {
        text: newMessage,
        timestamp: formatTime(new Date()),
        isPersonal: true,
        name: currentUser.name, // Send the name of the current user
      };
      console.log(`from ${messageData.text}  ${messageData.name}`);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      socket.emit("send_message", {
        text: messageData.text,
        name: messageData.name,
      });
      setNewMessage("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className="col-span-1 md:col-span-3 flex flex-col bg-black bg-opacity-50 rounded-lg overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-6 space-y-3 ${
                message.isPersonal ? "justify-end" : ""
              }`}
            >
              <div className="relative w-11 h-5 px-2 ">
                {message.name.charAt(0).toUpperCase() + message.name.slice(1)}
              </div>
              <div
                className={`p-3 rounded-xl relative text-slate-900 ${
                  message.isPersonal ? "bg-green-300" : "bg-blue-300"
                }`}
              >
                {message.text}
                <span
                  className={`absolute top-12 ${
                    message.isPersonal ? "right-0" : "left-0"
                  } text-xs text-gray-400`}
                >
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 bg-black bg-opacity-30 rounded-b-lg flex space-x-2 items-center">
          <span className="p-2 bg-black bg-opacity-40 text-white rounded-l-lg cursor-pointer">
            <i className="fas fa-paperclip"></i>
          </span>
          <textarea
            className="w-full p-2 bg-black bg-opacity-40 rounded-lg text-white border-0 focus:outline-none"
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
            className="p-2 bg-black bg-opacity-40 text-white rounded-r-lg cursor-pointer"
            onClick={handleSendMessage}
          >
            <i className="fas fa-location-arrow"></i>
          </span>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
