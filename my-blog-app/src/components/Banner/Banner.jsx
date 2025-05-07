import React from 'react';
import {useState} from 'react';
import { useSelector } from 'react-redux';
import Background from "../../assets/bannerImage.avif";
import { Link } from 'react-router-dom';

const Banner = () => {
  const { currentUser } = useSelector(state => state.user);
  return (
    <div className="flex justify-center font-serif">
      <div className="relative flex w-[1300px] h-[100vh]">
        {/* Left Side: Heading and Button */}
        <div className="flex flex-col justify-center  px-10 py-6 w-1/2 text-black ">
          <h1 className="text-6xl  font-serif mb-10 items-center" >Your Daily Dose of Inspiration and Insight</h1>
          {currentUser ? (<button className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-700 transition w-[200px]">
          <Link to="/search">Discover More</Link>
            
          </button>):( <button className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-700 transition w-[200px]">
          <Link to="/signup">Discover More</Link>
            
          </button>)}
          
        </div>
        
        {/* Right Side: Image */}
        <div 
          className="w-1/2 bg-cover bg-center" 
          style={{ backgroundImage: `url(${Background})` }}
        ></div>
      </div>
    </div>
  );
}

export default Banner;




