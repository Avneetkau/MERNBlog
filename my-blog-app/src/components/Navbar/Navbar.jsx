import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.jpg";
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../../redux/user/userSlice.js';
import { TextInput } from 'flowbite-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  // ✅ Corrected Sign-out logic
  const handleSignOut = async () => {
    try {
      const res = await axios.post('/api/user/signout');
      dispatch(signoutSuccess());
      navigate("/");
    } catch (error) {
      console.log("Signout failed:", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-4 font-serif">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-15 w-auto" />
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Search..."
            className="w-[500px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {/* Nav Links */}
        <div className="flex items-center space-x-8 text-black text-lg">
          <Link to="/" className="hover:text-gray-300 font-serif">Home</Link>
          <Link to="/motto" className="hover:text-gray-300 font-serif">Our Motto</Link>
          <Link to="/contactus" className="hover:text-gray-300 font-serif">Contact Us</Link>

          {currentUser ? (
            <div
              className="relative"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <img
                src={currentUser.profilePicture}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
              />
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  <ul className="py-2 text-gray-700">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-serif">{currentUser.username}</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-serif">{currentUser.email}</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Link to="/dashboard?tab=profile">Profile</Link>
                    </li>
                    <li
                      className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer font-serif"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signup"
              className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-700 transition duration-300"
            >
              Sign-in
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
