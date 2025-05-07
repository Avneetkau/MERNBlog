import React from 'react';
import { Link } from 'react-router-dom';
import AboutImage from "../../assets/backgroundabout.jpg";  // Replace with your image path

const AboutUs = () => {
  return (
    <div>
    <div 
      className="relative w-full h-[500px] bg-cover bg-center" 
      style={{ backgroundImage: `url(${AboutImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative flex flex-col items-center justify-center w-full h-full text-white p-6">
        {/* Center Image */}
        <img 
          src={AboutImage} 
          alt="About Us" 
          className="w-32 h-32 rounded-full border-4 border-white mb-4"
        />

        {/* Description */}
        <p className="text-center text-lg font-medium mb-4 max-w-xl  font-serif">
          Welcome to my website! I am passionate Full Stack Developer providing the best services and experiences for the users. 
          My journey started with a single vision: to make a difference. I believe in creativity, dedication, and constant growth. 
        </p>

        {/* Read More Button */}
        <button className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-700 transition font-serif">
        <Link to="/knowmore">Read More</Link>
         
        </button>
      </div>
    </div>
    </div>
  );
}

export default AboutUs;
