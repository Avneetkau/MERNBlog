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
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';    // for other work
import { signInSuccess } from "../../redux/user/userSlice";     // for other work
import OAuth from "../OAuth/OAuth";

const SignUpForm = () => {
  
  const [ formData , setFormData ] = useState({});
  const [ errorMessage , setErrorMessage ] = useState(null);
  const [ loading , setLoading ] =useState(false);
  
const dispatch = useDispatch(); // for other work

  const navigate = useNavigate();
   const handleChange = (e) => {
    setFormData({ ...formData , [e.target.id] : e.target.value.trim() }); //Here we want to first have formData and then trace changes on base of id's.
   };
  

   const handleSubmit = async (e) => {
    e.preventDefault(); //This is going to prevent refresh of form data as we submit the Submit button
    if( !formData.username || !formData.email || !formData.password ){ //This statement is to check if any field is empty then will show an alert message at end
      return setErrorMessage('Please fill out  all the fields');
    } 
    try{
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method : 'POST',
        headers :  {'Content-Type' : 'application/json'},
        body : JSON.stringify(formData)
      });
       const data = await res.json();
       if( data.success === false ) {
        return setErrorMessage(data.message);
       }
       setLoading(false);
       if(res.ok){

        const signinRes = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
       const signinData = await signinRes.json();
        if (signinRes.ok) {
        dispatch(signInSuccess(signinData));
       //navigate('/signin');
      navigate('/');
        } else {
        setErrorMessage(signinData.message || 'Sign in after signup failed');
      }
    
       }
       setLoading(false);
    }
    catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
   };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

        <form  onSubmit={handleSubmit}> {/*Use to handle submission of the data*/}
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700" >Email</label>
            <input
              onChange = {handleChange}
              type="email"
              name="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Enter your email"
              
            />
          </div>

          {/* Username Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              onChange = {handleChange}
              type="text"
              name="username"
              id="username"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Enter your username"
            
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              onChange = {handleChange}
              type="password"
              name="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Enter your password"
             
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-700 transition duration-300"
            disabled={loading}
          >
          {
            loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Loading...
              </div>
            ) : 'Sign Up'
          }
            
          </button>
          <OAuth/>
        </form>
        <div className="flex gap-2 text-sm mt-5 ">
        <span className="ml-20">
          Already have an account?
        </span>
        <Link to='/signin' className="text-red-500 hover:underline">Sign in</Link>
        </div>
        <div className="mt-5">
        {
          errorMessage && (
          <label className="text-red-500 border-2-red">{errorMessage}</label>
          )
        }
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

//each field has unique id as id='email' id='password' id='username'