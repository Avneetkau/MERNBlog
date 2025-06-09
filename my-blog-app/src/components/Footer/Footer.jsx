import React from 'react';
import linkedln from "../../assets/linkedln.png";
import github from "../../assets/github.png";
import instagram from "../../assets/instagram.jpg";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-6  font-serif">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
          
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">MERNBlog</h2>
            <p className="text-gray-400 mt-2">Your go-to platform for amazing experiences.</p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-center">
            <a href="/" className="hover:text-gray-400 font-serif">Home</a>
            <a href="/knowmore" className="hover:text-gray-400 font-serif">About</a>
            <a href="/motto" className="hover:text-gray-400 font-serif">Services</a>
            <a href="/contactus" className="hover:text-gray-400 font-serif">Contact</a>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6 justify-center">
            <a href="https://www.linkedin.com/in/avneet-kaur-271953225/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <img src={linkedln} alt="linkeln" className="h-10 w-10 bg-gray-800 p-1 rounded-full"/>
            </a>
            <a href="https://github.com/Avneetkau" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
               <img src={github} alt="github" className="h-10 w-10 bg-gray-800 p-1 rounded-full"/>
            </a>
            <a href="https://www.instagram.com/avneetbagga05/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <img src={instagram} alt="instagram" className="h-10 w-11 bg-gray-800 p-1 rounded-full" />
            </a>
          </div>
        </div>

        <div className="text-center text-gray-400 mt-8 font-serif">
          <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
