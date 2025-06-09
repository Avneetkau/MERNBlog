import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from "../../redux/user/userSlice"; //In order to use this we need to dispatch this
import OAuth from "../OAuth/OAuth";

const SignIn = () => {
  
  const [ formData , setFormData ] = useState({});
  const { loading, error : errorMessage } = useSelector(state => state.user);
  const  dispatch = useDispatch();
  const navigate = useNavigate();
   const handleChange = (e) => {
    setFormData({ ...formData , [e.target.id] : e.target.value.trim() }); //Here we want to first have formData and then trace changes on base of id's.
   };
  

   const handleSubmit = async (e) => {
    e.preventDefault(); //This is going to prevent refresh of form data as we submit the Submit button
    if(  !formData.email || !formData.password ){ //This statement is to check if any field is empty then will show an alert message at end
      return dispatch(signInFailure('Please fill out  all the fields'));
    } 
    try{
      /*setLoading(true); Instead of using this to line we can use signInStart
      setErrorMessage(null);*/
      dispatch(signInStart);
      const res = await fetch('https://mern-blog-one-rho.vercel.app/api/auth/signin', {
        method : 'POST',
        headers :  {'Content-Type' : 'application/json'},
        body : JSON.stringify(formData)
      });
       const data = await res.json();
       if( data.success === false ) {
        //return setErrorMessage(data.message); instead of this line we can use signInFailure
        dispatch(signInFailure(data.message));
       }
    
       if(res.ok){
        dispatch(signInSuccess(data)); //If everything is ok we want to use this to store information
        navigate('/');
       }
    }
    catch (error) {
      /*setErrorMessage(error.message);
      setLoading(false);*/
      dispatch(signInFailure(error.message));
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

          

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              onChange = {handleChange}
              type="password"
              name="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="**************"
             
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
            ) : 'Sign In'
          }
            
          </button>
          <OAuth/>
        </form>
        <div className="flex gap-2 text-sm mt-5 ">
        <span className="ml-20">
          Don't have an account?
        </span>
        <Link to='/signup' className="text-red-500 hover:underline">Sign Up</Link>
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

export default SignIn;

//each field has unique id as id='email' id='password' id='username'