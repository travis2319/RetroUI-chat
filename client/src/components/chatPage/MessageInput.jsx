import React, { useState } from "react";

function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage(""); // Clear the input after sending the message
    }
  };

  return (
    <div className="message-box flex items-center p-4 bg-opacity-50 border-t border-gray-700">
      <textarea
        className="message-input bg-transparent text-white outline-none border-none flex-grow mr-2"
        placeholder="Type message..."
        value={message}
        onChange={handleChange}
      ></textarea>
      <button
        className="message-submit bg-teal-500 text-white px-4 py-2 rounded-lg text-xs uppercase"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;
