import React, { useState } from "react";
import ChatGptIcon from "../assets/img/ChatIcon.svg";
import "../assets/publicStyles.css";
import "../styles/message.css";

const ChatGPT = () => {
  const [message, setMessage] = useState(null);

  return (
    <div className="w-full h-full p-5 chat relative">
      <div className="flex items-center">
        <div className="w-14 h-14 rounded-full">
          <img
            src={ChatGptIcon}
            alt="ảnh"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="mx-3 chat-title">Friend Blend Chat Bot</h1>
      </div>

      <div>
        <div class="chat-container">
          <div class="chat-message sent">
            <div class="message">Hi there!</div>
          </div>
          <div class="chat-message received">
            <div class="message">Tôi có thể giúp gì cho bạn?</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 h-14 w-11/12 flex justify-around items-center">
        <input
          type="text"
          className="w-10/12 h-12 border-2 border-gray-300 rounded-full focus:outline-none focus:border-violet-300 text-md px-4"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />

        <button className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center text-blue-500 hover:text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatGPT;
