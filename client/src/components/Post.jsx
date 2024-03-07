import React, { useEffect, useState } from "react";
import "../styles/post.css";
import heart from "../assets/img/heart.png";
import heartEmpty from "../assets/img/heartEmpty.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const [like, setLike] = useState(false);
  const [likeNumber, setLikeNumber] = useState(0);
  const handleLike = () => {
    setLike(!like);
  };
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);

  useEffect(() => {
    if (!user) navigate("/");
  }, []);

  return (
    <div className="w-8/12 rounded-lg h-auto post">
      <header className="p-3 flex justify-between">
        <div className="flex items-end">
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
          <span className="font-semibold">{user?.data.username}</span>
        </div>
        <div className="flex justify-center items-center">
          <button onClick={handleLike}>
            {like ? (
              <div>
                <img src={heart} />
              </div>
            ) : (
              <img src={heartEmpty} />
            )}
          </button>
        </div>
      </header>
      <div className="bg-yellow-400"></div>
    </div>
  );
};

export default Post;
