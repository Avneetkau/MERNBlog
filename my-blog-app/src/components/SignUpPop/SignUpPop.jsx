{/*import React, { useState } from 'react';

const SignInPop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Sign In Button 
      <button 
        onClick={openModal}
        className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Sign In
      </button>

      {/* Modal (Popup Form) 
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Sign Up</h2>
              <button onClick={closeModal} className="text-gray-500 text-2xl">×</button>
            </div>

            {/* Sign Up Form 
            <form>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInPop;*/}
import React, { useState } from "react";
import axios from "../../axiosInstance"; // ✅ Using centralized Axios instance
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";
import OAuth from "../OAuth/OAuth";

const SignUpForm = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all the fields");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const { data } = await axios.post("/api/auth/signup", formData);

      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }

      const { data: signinData } = await axios.post("/api/auth/signin", {
        email: formData.email,
        password: formData.password,
      });

      if (signinData.success === false) {
        setLoading(false);
        return setErrorMessage(signinData.message || "Sign in after signup failed");
      }

      dispatch(signInSuccess(signinData));
      setLoading(false);
      navigate("/");
    } catch (err) {
      setErrorMessage(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              onChange={handleChange}
              type="text"
              name="username"
              id="username"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-700 transition duration-300"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </button>

          <OAuth />
        </form>

        <div className="flex gap-2 text-sm mt-5">
          <span className="ml-20">Already have an account?</span>
          <Link to="/signin" className="text-red-500 hover:underline">
            Sign in
          </Link>
        </div>

        <div className="mt-5">
          {errorMessage && (
            <label className="text-red-500">{errorMessage}</label>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;


//each field has unique id as id='email' id='password' id='username'