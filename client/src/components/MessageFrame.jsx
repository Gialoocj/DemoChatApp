import React from "react";
import "../styles/message.css";
const MessageFrame = () => {
  return (
    <>
      <div className="w-11/12 h-full rounded-t-lg message-frame relative hidden">
        <header className="flex w-full justify-between message-header bg-gray-100 p-2">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-black"></div>
            <span className="mx-3 font-semibold"> Username</span>
          </div>
          <button className="text-gray-400 hover:text-gray-500">
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>
        <div className="h-80 bg-white p-3 flex flex-col overflow-auto">
          <div className="send text-start">
            <span className=" w-auto break-words px-2 py-1 bg-gray-200 rounded-lg">
              Hello
            </span>
          </div>
          <div className="reciever text-end break-words">
            <span className=" w-auto break-words px-2 py-1 bg-violet-300 rounded-lg">
              Hello
            </span>
          </div>
        </div>
        <footer className="absolute bottom-0 w-full h-16 p-2 flex items-center justify-around">
          <input
            type="text"
            className="h-11 w-10/12 px-3 rounded-full bg-gray-100 focus:outline-none"
          />
          <button className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </footer>
      </div>
    </>
  );
};

export default MessageFrame;
