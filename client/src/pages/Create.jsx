import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import ChatGPT from "../components/ChatGPT";
import { useDispatch, useSelector } from "react-redux";
import MessageFrame from "../components/MessageFrame";
import CreatePost from "../components/CreatePost";

const Home = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);

  return (
    <div className="grid grid-cols-12 home">
      <div className="col-span-2">
        <Navbar />
      </div>
      <div className="col-span-7 pt-8 relative h-screen w-full ml-8">
        <div className="w-full h-3/4 flex justify-center mt-20">
          <CreatePost />
        </div>

        <div className="absolute right-0 bottom-2 w-4/12">
          <MessageFrame />
        </div>
      </div>
      <div className="col-span-3 flex justify-end">
        <div className="w-10/12">
          <ChatGPT />
        </div>
      </div>
    </div>
  );
};

export default Home;
