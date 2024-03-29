import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { loginSuccess } from "./redux/authSlice";

const refreshToken = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/v1/auth/refresh", {
      withCredential: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodeToken = jwtDecode(user?.accessToken);
      if (decodeToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer" + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
