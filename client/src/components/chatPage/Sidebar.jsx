import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSocket } from "../../contexts/SocketContext";

const Sidebar = () => {
  const socket = useSocket();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (socket) {
      const handleUserList = (data) => {
        console.log("In sidebar response:", data);
        setUsers(data); // Update the state with the received user list
      };

      socket.on("user_list", handleUserList);

      return () => {
        socket.off("user_list", handleUserList);
      };
    }
  }, [socket]);

  useEffect(() => {
    const handleDisconnect = () => {
      console.log("Socket disconnected");
      // You can implement the socket disconnect logic here
    };

    if (socket) {
      socket.on("disconnect", handleDisconnect);

      return () => {
        socket.off("disconnect", handleDisconnect);
      };
    }
  }, [socket]);

  const handleGoBack = () => {
    // Disconnect socket when "Go Back" button is clicked
    if (socket) {
      socket.disconnect();
    }
  };

  return (
    <div className="col-span-1 md:col-span-1 flex flex-col bg-black bg-opacity-50 rounded-lg overflow-hidden ">
      <div className="p-4">
        <div className=" flex relative w-full p-2 rounded-lg  bg-black bg-opacity-30 items-center justify-center text-white border-0 focus:outline-none">
          {/* <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 rounded-l-lg bg-black bg-opacity-30 text-white border-0 focus:outline-none"
          />
          <span className="absolute top-0 right-0 p-2 bg-black bg-opacity-30 text-white rounded-r-lg cursor-pointer">
            <i className="fas fa-search"></i>
          </span> */}
          <h1 className="text-5xl text-pink-600">...On</h1>
          <h1 className="text-5xl text-pink-500">li</h1>
          <h1 className="text-5xl text-pink-400">ne...</h1>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <ul className="space-y-4 p-4">
          {users.map((user, index) => (
            <li
              key={index}
              className="bg-black bg-opacity-30 p-2 rounded-lg flex items-center justify-center space-x-4"
            >
              <div className="text-white ">
                <span className="block text-xl">{user.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4">
        <div className=" flex relative w-full p-2 rounded-lg  bg-black bg-opacity-30 items-center justify-center text-white border-0 focus:outline-none">
          {/* <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 rounded-l-lg bg-black bg-opacity-30 text-white border-0 focus:outline-none"
          />
          <span className="absolute top-0 right-0 p-2 bg-black bg-opacity-30 text-white rounded-r-lg cursor-pointer">
            <i className="fas fa-search"></i>
          </span> */}
          <Link to="../" onClick={handleGoBack}>
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
