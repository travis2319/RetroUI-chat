import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSocket } from "../../contexts/SocketContext";
import { Sidebar, ChatPage } from "../index.js";
import video from "../../assets/background1.mp4"; // Import your video file

const Chat = () => {
  const location = useLocation();
  const { socketInfo } = location.state || {};
  const socket = useSocket();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (socket) {
      const handleMessageResponse = (data) => {
        console.log("Received user list:", data);
        setUserList(data); // Set the user list received from the server
      };

      socket.on("user_list", handleMessageResponse);

      return () => {
        socket.off("user_list", handleMessageResponse);
      };
    }
  }, [socket]);

  return (
    <div>
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
        src={video}
        autoPlay
        loop
        muted
      />
      <div className="h-screen ">
        <div className="container mx-auto h-full flex justify-center items-center p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full h-full">
            <Sidebar userList={userList} /> {/* Pass userList as prop */}
            <ChatPage userList={userList} /> {/* Pass userList as prop */}
          </div>
        </div>
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 0;
            height: 0;
          }
          .custom-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}</style>
      </div>
    </div>
  );
};

export default Chat;
