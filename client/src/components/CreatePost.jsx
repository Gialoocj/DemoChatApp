import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/post.css";
import { addPost, setLoading } from "../redux/postSlice";
import { createPost } from "../redux/apiRequest";
import axios from "axios";
import Notice from "./Notice";

const CreatePost = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [content, setContent] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.login?.currentUser);
  const onDrop = useCallback((acceptedFiles) => {
    // Kiểm tra xem acceptedFiles có chứa ít nhất một file hay không
    if (acceptedFiles && acceptedFiles.length > 0) {
      // Lấy file ảnh đầu tiên từ mảng acceptedFiles
      const imageFile = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setUploadedImage(imageFile); // Lưu trữ file ảnh thay vì URL
    } else {
      console.error("No valid files uploaded");
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleCreatePost = async () => {
    try {
      // Gửi request lên server để lưu bài viết
      const formData = new FormData();
      formData.append("image", uploadedImage);
      formData.append("userId", user?.data._id);
      formData.append("title", content);
      const response = await axios.post(
        "http://localhost:5000/api/v1/posts/create-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post created:", response.data);
      setMessage("Bài viết của bạn đã được tải lên");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="post w-11/12 rounded-lg relative">
      <header className="w-full p-3 flex justify-between border border-b-1 border-t-0 border-l-0 border-r-0 border-gray-200">
        <div className="w-10/12 text-center font-semibold">Create New Post</div>
        <button
          className="text-md text-blue-500 hover:text-blue-600 font-semibold mr-3"
          onClick={handleCreatePost}
        >
          Post
        </button>
      </header>
      <div className="grid grid-cols-7 h-full pb-12 w-full ">
        <div className="col-span-5 content h-full w-full relative">
          <div
            {...getRootProps()}
            className="w-full h-full flex justify-center items-center border border-dashed border-gray-300 hover:cursor-pointer absolute inset-0"
          >
            <input
              {...getInputProps()}
              className="opacity-0 w-full h-full cursor-pointer"
            />
            <p className="z-10">Kéo và thả ảnh hoặc nhấp để chọn</p>
          </div>
          {uploadedImage && (
            <img
              src={URL.createObjectURL(uploadedImage)} // Sử dụng URL.createObjectURL để hiển thị ảnh
              alt="Uploaded"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        <div className="col-span-2 h-full w-full p-3 ">
          <header className="h-12 flex items-end w-full">
            <div className="w-9 h-9 rounded-full bg-gray-400"></div>
            <span className="font-semibold mx-3"> {user?.data.username}</span>
          </header>
          <div
            contentEditable="true"
            className="w-full h-1/5 rounded-lg border-2 border-gray-200 mt-3 p-2"
            onInput={(e) => {
              setContent(e.target.innerText);
            }}
          ></div>
        </div>
      </div>
      <div className={`absolute top-0 ${message !== null ? "" : "hidden"}`}>
        <Notice message={message} />
      </div>
    </div>
  );
};

export default CreatePost;
