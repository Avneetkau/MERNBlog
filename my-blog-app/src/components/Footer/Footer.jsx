import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-6  font-serif">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
          
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">MyLogo</h2>
            <p className="text-gray-400 mt-2">Your go-to platform for amazing experiences.</p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-center">
            <a href="/" className="hover:text-gray-400 font-serif">Home</a>
            <a href="/about" className="hover:text-gray-400 font-serif">About</a>
            <a href="/services" className="hover:text-gray-400 font-serif">Services</a>
            <a href="/contact" className="hover:text-gray-400 font-serif">Contact</a>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6 justify-center">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 13h-2v4h2v-4zm0-6h-2V7c0-1.1.9-2 2-2h2v3h-2v1zm-1-2h-1V9h1v1z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                <path d="M23 3a10.1 10.1 0 0 1-2.9.8A4.9 4.9 0 0 0 22.4 1a9.9 9.9 0 0 1-3.1 1.2A4.9 4.9 0 0 0 16.5 2c-3.4 0-5.5 2.9-5.5 5.5 0 .4 0 .8.1 1.1C6.7 8.6 3.6 6.3 2 3.1a5.5 5.5 0 0 0-.7 2.8c0 1.9 1 3.5 2.5 4.5-1 0-2.1-.3-3-1v.1c0 2.7 1.9 5 4.5 5.5a5.4 5.4 0 0 1-2.4.1c.7 2.2 2.7 3.8 5.1 3.8 6.1 0 9.4-5.1 9.4-9.5 0-.1 0-.2-.1-.3A6.7 6.7 0 0 0 23 3z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 2c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6zm0 10c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm6-10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm1 2h-.6c-.5 0-.8-.4-.8-.8 0-.4.3-.8.8-.8h.6c.4 0 .8.3.8.8 0 .4-.4.8-.8.8zm-7 2c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 4c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="text-center text-gray-400 mt-8 font-serif">
          <p>&copy; {new Date().getFullYear()} MyWebsite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
