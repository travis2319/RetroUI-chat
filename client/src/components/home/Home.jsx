// src/components/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../contexts/SocketContext";
import video from "../../assets/background1q.mp4";

const Home = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const [formData, setFormData] = useState({ roomName: "", roomId: "" });
  const [isListenerRegistered, setIsListenerRegistered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const joinRoom = () => {
    if (formData.roomName && formData.roomId) {
      console.log(
        `Joining room with Name: ${formData.roomName}, ID: ${formData.roomId}, and Socket ID: ${socket.id}`
      );
      const socketInfo = {
        id: socket.id,
        name: formData.roomName,
        roomid: formData.roomId,
      };
      socket.emit("user", {
        id: socketInfo.id,
        name: socketInfo.name,
        roomId: socketInfo.roomid,
      });
      navigate("/chat", { state: { socketInfo } });
    } else {
      console.log("Room Name or Room ID is missing");
    }
  };

  useEffect(() => {
    if (socket && !isListenerRegistered) {
      const handleWelcome = (s) => {
        console.log(`${s}`);
      };

      socket.on("welcome", handleWelcome);
      setIsListenerRegistered(true);

      return () => {
        socket.off("welcome", handleWelcome);
      };
    }
  }, [socket]);

  return (
    <div className="min-h-screen flex justify-center items-center overflow-hidden relative">
      <video
        className="fixed top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto z-[-1] transform -translate-x-1/2 -translate-y-1/2 object-cover"
        src={video}
        autoPlay
        loop
        muted
      ></video>
      <div className="w-[420px] bg-transparent shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-sm rounded-[10px] border-[1px_solid_rgba(255,255,255,0.18)] p-8 relative text-white">
        <h1 className="text-5xl text-center">JOIN ROOM</h1>
        <div className="my-8 relative">
          <input
            type="text"
            name="roomName"
            placeholder="Name"
            value={formData.roomName}
            onChange={handleChange}
            required
            className="w-full h-12 bg-transparent border-x-2 outline-none border-2 border-solid border-[rgba(230,230,230,0.2)] rounded-[40px] text-base text-white p-5 placeholder-white"
          />
        </div>
        <div className="my-8 relative">
          <input
            type="text"
            name="roomId"
            placeholder="Room"
            value={formData.roomId}
            onChange={handleChange}
            required
            className="w-full h-12 bg-transparent border-x-2 outline-none border-2 border-solid border-[rgba(230,230,230,0.2)] rounded-[40px] text-base text-white p-5 placeholder-white"
          />
        </div>

        {/* <div className="my-8 relative">
          <select
            id="Party"
            onChange={handleChange}
            name="roomId"
            className="bg-transparent border-x-2 border-[rgba(230,230,230,0.2)] text-sm rounded-[40px]  placeholder-white block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-white dark:text-gray-700"
          >
            <option selected className="text-gray-700">
              Select party
            </option>
            <option value="GOT">GHOST OF TSUSHIMA</option>
            <option value="COD">CALL OF DUTY</option>
            <option value="GOW">GOD OF WAR</option>
            <option value="GTA6">GTA 6</option>
          </select>
        </div>
         */}
        <button
          onClick={joinRoom}
          className="w-full h-12 bg-white text-gray-800 font-semibold rounded-[40px] border-2 border-transparent outline-none shadow-md cursor-pointer transition-colors duration-500 hover:border-[1px_solid_rgba(255,255,255,0.18)] hover:text-black hover:font-bold"
        >
          JOIN
        </button>
      </div>
    </div>
  );
};

export default Home;
