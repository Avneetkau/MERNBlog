import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../DashSidebar/DashSidebar';
import DashProfile from '../DashProfile/DashProfile';
import DashPost from '../DashPost/DashPost';
import DashUsers from '../DashUsers/DashUsers';
import DashComments from '../DashComments/DashComments';
import DashboardComp from '../DashboardComp/DashboardComp';


const Dashboard = () => {
    const  location = useLocation();
    const [tab,setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if(tabFromUrl){
            setTab(tabFromUrl);
        }

    },[location.search]);
  return (
    <div className="min-h-screen flex ">
     <div className = "md:w-56 w-full bg-gray-800"><DashSidebar/></div>
     <div className="w-full">

     { tab == 'profile' && <DashProfile/>}

      { tab == 'posts' && <DashPost/>}

       { tab == 'users' && <DashUsers/>}
       
       { tab == 'comments' && <DashComments/>}

       { tab == 'dash' && <DashboardComp/> }

       </div>
    

    </div>
  );
}

export default Dashboard;

