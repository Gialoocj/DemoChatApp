import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import ChatGPT from "../components/ChatGPT";
import AllUser from "../components/Friends";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers, loginUser } from "../redux/apiRequest";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createAxios } from "../createInstance";
import { loginSuccess } from "../redux/authSlice";
import Friends from "../components/Friends";
import MessageFrame from "../components/MessageFrame";
import Post from "../components/Post";

const Home = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    if (!user) navigate("/login");
    if (user?.accessToken) getAllUsers(user?.accessToken, dispatch, axiosJWT);
  }, []);
  return (
    <div className="grid grid-cols-12 home">
      <div className="col-span-2">
        <Navbar />
      </div>
      <div className="col-span-7 pt-8 relative h-screen w-full ml-8">
        <div className="w-full flex justify-center">
          <Post />
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
