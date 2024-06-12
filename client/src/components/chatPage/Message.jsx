import React from "react";

function Message({ text, timestamp, isPersonal }) {
  return (
    <div
      className={`message p-2 rounded-lg ${
        isPersonal
          ? "bg-teal-500 text-white self-end"
          : "bg-gray-700 text-white"
      }`}
    >
      {text}
      <span className="block text-xs text-gray-500">{timestamp}</span>
    </div>
  );
}

export default Message;
