import { useState, useEffect } from "react";
import axios from "../../axiosInstance"; // ✅ Centralized axios
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from '../../redux/user/userSlice.js';

const DashSidebar = () => {
  const { currentUser } = useSelector(state => state.user);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  // ✅ Sign Out using axiosInstance
  const handleSignOut = async () => {
    try {
      const { data } = await axios.post('/api/user/signout');
      dispatch(signoutSuccess());
      navigate('/');
    } catch (err) {
      console.error('Sign out error:', err.message);
    }
  };

  return (
    <div className="w-full h-full bg-gray-800 text-white p-4 flex flex-col">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 text-white" />
        <span className="text-lg font-semibold font-serif">Hi, {currentUser?.username}</span>
      </div>
      <ul className="space-y-2">
        {currentUser.isAdmin && (
          <li className="font-serif">
            <Link
              to="/dashboard?tab=dash"
              className={`flex items-center p-3 rounded-lg transition cursor-pointer ${
                activeTab === "dash" ? "bg-gray-600 text-white" : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("dash")}
            >
              <div className="w-5 h-5 mr-2" /> Dashboard
            </Link>
          </li>
        )}
        <li className="font-serif">
          <Link
            to="/dashboard?tab=profile"
            className={`flex items-center p-3 rounded-lg transition cursor-pointer ${
              activeTab === "profile" ? "bg-gray-600 text-white" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <div className="w-5 h-5 mr-2" /> Profile
          </Link>
        </li>
        {currentUser.isAdmin && (
          <li className="font-serif">
            <Link
              to="/dashboard?tab=comments"
              className={`flex items-center p-3 rounded-lg transition cursor-pointer ${
                activeTab === "comments" ? "bg-gray-600 text-white" : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("comments")}
            >
              <div className="w-5 h-5 mr-2" /> Comments
            </Link>
          </li>
        )}
        {currentUser.isAdmin && (
          <li className="font-serif">
            <Link
              to="/dashboard?tab=posts"
              className={`flex items-center p-3 rounded-lg transition cursor-pointer ${
                activeTab === "posts" ? "bg-gray-600 text-white" : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("posts")}
            >
              <div className="w-5 h-5 mr-2" /> Posts
            </Link>
          </li>
        )}
        {currentUser.isAdmin && (
          <li className="font-serif">
            <Link
              to="/dashboard?tab=users"
              className={`flex items-center p-3 rounded-lg transition cursor-pointer ${
                activeTab === "users" ? "bg-gray-600 text-white" : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("users")}
            >
              <div className="w-5 h-5 mr-2" /> Users
            </Link>
          </li>
        )}
        <li
          className={`flex font-serif items-center p-3 rounded-lg transition cursor-pointer ${
            activeTab === "signout" ? "bg-gray-600 text-white" : "hover:bg-gray-700"
          }`}
          onClick={() => {
            setActiveTab("signout");
            handleSignOut();
          }}
        >
          <div className="w-5 h-5 mr-2" /> Sign Out
        </li>
      </ul>
    </div>
  );
};

export default DashSidebar;
