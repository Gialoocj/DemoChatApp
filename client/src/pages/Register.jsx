import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/apiRequest";

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
    };
    registerUser(newUser, dispatch, navigate);
    console.log(registerForm);
  };

  return (
    <div className="w-full h-screen bg-gray-50">
      <div className="w-2/5 mx-auto ">
        <h1 className="text-6xl text-center text-violet-600 pt-20 mb-28">
          Friend Blend
        </h1>
        <form
          className="w-3/5 h-auto mx-auto bg-gray-100 p-5 rounded-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="username" className="block font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={registerForm.username}
              onChange={handleChange}
              className="block w-full px-4 py-2 rounded h-12 bg-blue-100 focus:outline-none focus:ring-1 focus:border-violet-200"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={registerForm.email}
              onChange={handleChange}
              className="block w-full px-4 py-2 rounded h-12 bg-blue-100 focus:outline-none focus:ring-1 focus:border-violet-200"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={registerForm.password}
              onChange={handleChange}
              className="block w-full px-4 py-2 rounded h-12 bg-blue-100 focus:outline-none focus:ring-1 focus:border-violet-200"
              required
            />
          </div>
          <button
            type="submit"
            className="block w-full h-12 px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600"
          >
            Register
          </button>
        </form>
        <h4 className="text-center mt-10">
          <span>Have you not acount?</span>
          <Link className="text-violet-500 font-semibold mx-1" to="/login">
            Login
          </Link>
          now
        </h4>
      </div>
    </div>
  );
};

export default Register;
