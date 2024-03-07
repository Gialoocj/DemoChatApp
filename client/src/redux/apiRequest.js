import axios from "axios";
import {
  logOutFailed,
  logOutStart,
  logOutSuccess,
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import { getUserFailed, getUserStart, getUsersSuccess } from "./userSlice";
import { addPost, postError, setLoading } from "./postSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
    navigate("/home");
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("http://localhost:5000/api/v1/auth/register/", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(registerFailed());
  }
};

export const logOutUser = async (accessToken, dispatch, navigate, axiosJWT) => {
  dispatch(logOutStart());
  try {
    await axiosJWT.post(
      "http://localhost:5000/api/v1/auth/logout/",
      {},
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    localStorage.removeItem("accessToken");
    dispatch(logOutSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(logOutFailed());
    console.log(error);
  }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUserStart());
  try {
    const res = await axiosJWT.get("http://localhost:5000/api/v1/users", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (error) {
    dispatch(getUserFailed);
  }
};

export const createPost = async (
  accessToken,
  dispatch,
  navigate,
  userId,
  imgUrl,
  title
) => {
  dispatch(setLoading());
  try {
    const res = await axios.post(
      "http://localhost:5000/api/v1/posts/create-post",
      {
        headers: { token: `Bearer ${accessToken}` },
        body: {
          userId: `${userId}`,
          image: `${imgUrl}`,
          title: `${title}`,
        },
      }
    );
    dispatch(addPost());
    navigate("/home");
  } catch (error) {
    dispatch(postError());
  }
};
