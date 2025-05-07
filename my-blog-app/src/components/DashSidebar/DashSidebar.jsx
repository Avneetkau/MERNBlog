import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { signoutSuccess } from '../../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';


const DashSidebar = () => {
  const { currentUser } = useSelector(state => state.user);
  const location = useLocation(); // Get current route with query params
  const [activeTab, setActiveTab] = useState("profile");
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  //sign out 
  const handleSignOut = async () =>{
    try{ 
      const res= await fetch('/api/user/signout',
        {
          method : 'POST',
        }
      );
      const data =await res.json();
      if(!res.ok){
        console.log(data.message)
      }else{
        dispatch(signoutSuccess());
      }
    } catch(error){
      console.log(error.message);
    }
  }
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
      <div className="w-5 h-5 mr-2 font-serif" /> Dashboard
    </Link>
    
  </li>
)}
        <li className="font-serif">
          <Link to ="/dashboard?tab=profile" className={`flex items-center p-3 rounded-lg transition cursor-pointer ${
            activeTab === "profile" ? "bg-gray-600 text-white" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("profile")}
        >
        
          <div className="w-5 h-5 mr-2 font-serif" /> Profile
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
      <div className="w-5 h-5 mr-2 font-serif" /> Comments
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
      <div className="w-5 h-5 mr-2 font-serif" /> Posts
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
      <div className="w-5 h-5 mr-2 font-serif" /> Users
    </Link>
    
  </li>
)}
        <li
          className={`flex  font-serif items-center p-3 rounded-lg transition cursor-pointer ${
            activeTab === "signout" ? "bg-gray-600 text-white" : "hover:bg-gray-700"
          }`}
          onClick={() => {
    setActiveTab("signout");
    handleSignOut();
  }}
        >
          <div className="w-5 h-5 mr-2 font-serif" /> Sign Out
        </li>
      </ul>
    </div>
  );
};

export default DashSidebar;
