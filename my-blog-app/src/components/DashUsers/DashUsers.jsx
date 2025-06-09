import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import  { FaCheck, FaTimes } from 'react-icons/fa';

const DashUsers = () => {

    const { currentUser } = useSelector((state) => state.user);
    const [ users, setUsers] = useState([]);
    const [ showMore, setShowMore ] = useState(true);
    const [ showModal, setShowModal] = useState(false);
    const [ userIdToDelete, setUserIdToDelete ] = useState('');
  
    useEffect( () => {
        const fetchUsers = async () =>{
            try{
                const res = await fetch(`https://mern-blog-one-rho.vercel.app/api/user/getusers`);
                const data = await res.json();
                //console.log(data);

                if(res.ok){
                    setUsers(data.users);
                    if(data.users.length < 9){
                        setShowMore(false);
                    }
                }
        }catch(error){
            console.log(error.message);
        }};
        if(currentUser.isAdmin){ fetchUsers() };
        }, [currentUser._id] );
      

        const handleShowMore = async () => {
            const startIndex = users.length;
            try{
              const res=await fetch(`https://mern-blog-one-rho.vercel.app/api/user/getusers?startIndex=${startIndex}`);
                const data= await res.json();
                if(res.ok){
                    setUsers((prev) => [...prev, ...data.users]);
                    if(data.users.length < 9){
                        setShowMore(false);
                    }
                }
            }catch(error){
                console.log(error.message);
            }
        }

        const handleDeleteUser = async () => {
           try{
              const res = await fetch(`https://mern-blog-one-rho.vercel.app/api/user/delete/${userIdToDelete}`,{
                method : 'DELETE',
              });
              const data = await res.json();
              if(res.ok){
                  setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
                  setShowModal(false);
              }else{
                console.log(data.message);
              }

           }catch(error){
            console.log(error.message);
           }
} ;
  return (
  
    <div className="overflow-x-auto p-4">
      {currentUser.isAdmin && users.length > 0 ? (
        
       <div>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
        <thead className="bg-gray-400">
            <tr>
              <th className="py-3 px-4 text-left font-semibold font-serif">DATE CREATED</th>
              <th className="py-3 px-4 text-left font-semibold font-serif">USER IMAGE</th>
              <th className="py-3 px-4 text-left font-semibold font-serif">USERNAME</th>
              <th className="py-3 px-4 text-left font-semibold font-serif">EMAIL</th>
              <th className="py-3 px-4 text-left font-semibold font-serif">ADMIN</th>
              <th className="py-3 px-4 text-left font-semibold font-serif">DELETE</th>
            </tr>
          </thead>
           <tbody>
          {users.map((user) =>(
            <tr key={user._id} className="border-t hover:bg-gray-200 transition-colors">
            <td className="py-3 px-6">{new Date(user.createdAt).toLocaleDateString()}</td>

                  <td className="py-3 px-4 font-medium">
                    <img src={user.profilePicture} alt={user.username} className="h-15 w-15 rounded-full object-cover bg-gray-500cd" />
                  </td>

                  <td className="py-3 px-4 font-serif">
                  {user.username}
                  </td>

                  <td className="py-3 px-4 font-serif">{user.email}</td>

                  <td className='py-3 px-4 '>{user.isAdmin ? (<FaCheck className="text-green-500"/>) : (<FaTimes className="text-red-500"/>)}</td>

                  

                    <td>
                    <button  onClick={ ()=>{ setShowModal(true);
              setUserIdToDelete(user._id)}} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer">Delete</button>
                  </td>

                </tr>
          ))}
          </tbody>
        </table>
        {showMore && (
                        <div className="flex justify-center mt-4 ">
                            <button onClick= { handleShowMore }className=" w-full px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-900">
                                Show More
                            </button>
                        </div>
                    )}
                </div>
     
            ) : ( <p> No posts available </p>)
      } 

      {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative">
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
      >
        &times;
      </button>
      <h2 className="text-xl font-semibold mb-4 text-red-600">Are you sure?</h2>
      <p className="text-gray-700 mb-6">
        This action cannot be undone. Your post will be permanently deleted.
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteUser}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-red-700"
        >
          Confirm Delete
        </button>
      </div>
    </div>
  </div>
)}
                 
    </div>
    
    
  );
}

export default DashUsers;


{/*import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const DashUsers = () => {

    const { currentUser } = useSelector((state) => state.user);
    const [ users, setUsers] = useState([]);
    const [ showMore, setShowMore ] = useState(true);
    const [ showModal, setShowModal] = useState(false);
    const [ userIdToDelete, setUserIdToDelete ] = useState('');
  
    useEffect( () => {
        const fetchUsers = async () =>{
          console.log(users);
            try{
                const res = await fetch(`/api/user/getusers`);
                const data = await res.json();
                //console.log(data);

                if(res.ok){
                    setUsers(data.users);
                    if(data.users.length < 9){
                        setShowMore(false);
                    }
                }
        }catch(error){
            console.log(error.message);
        }};
        if(currentUser.isAdmin){ fetchUsers()};
        }, [currentUser._id] );
      

        const handleShowMore = async () => {
            const startIndex = users.length;
            try{
              const res=await fetch(`/api/user/getusers?startIndex=${startIndex}`);
                const data= await res.json();
                if(res.ok){
                    setUsers((prev) => [...prev, ...data.users]);
                    if(data.users.length < 9){
                        setShowMore(false);
                    }
                }
            }catch(error){
                console.log(error.message);
            }
        }
        const handleDeleteUser = async () => {
              try{
                const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
                    method : 'DELETE',
                });
                const data = await res.json();
                if(res.ok){
                    setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
                    setShowModal(false);

                }else{
                    console.log(data.message);
                }
              } catch(error){
                console.log(error.message);
              }   
        }

        
  return (
  
    <div className="overflow-x-auto p-4">
      {currentUser.isAdmin && users.length > 0 ? (
        
       <div>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
        <thead className="bg-gray-400">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">DATE CREATED</th>
              <th className="py-3 px-4 text-left font-semibold">USER IMAGE</th>
              <th className="py-3 px-4 text-left font-semibold">USERNAME</th>
              <th className="py-3 px-4 text-left font-semibold">EMAIL</th>
              <th className="py-3 px-4 text-left font-semibold">ADMIN</th>
              <th className="py-3 px-4 text-left font-semibold">DELETE</th>
            </tr>
          </thead>
           <tbody>
          {users.map((user) =>(
            <tr key={user._id} className="border-t hover:bg-gray-200 transition-colors">
            <td className="py-3 px-6">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 font-medium">
                  
                    <img src={user.profilePicture} alt={user.username} className="h-16 w-16 object-cover rounded-full" />
                   
                  </td>
                  <td className="py-3 px-4">
                 
                  {user.username}
                 </td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.isAdmin ? < FaCheck className = "text-green-500"/> : <FaTimes className = "text-red-500"/>}</td>
                  
                    <td>
                    <button  onClick={ ()=>{ setShowModal(true);
              setUserIdToDelete(user._id)}} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer">Delete</button>
                  </td>
                </tr>
          ))}
          </tbody>
        </table>
        {showMore && (
                        <div className="flex justify-center mt-4 ">
                            <button onClick= { handleShowMore }className=" w-full px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-900">
                                Show More
                            </button>
                        </div>
                    )}
                </div>
     
            ) : ( <p> No posts available </p>)
      } 

      {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative">
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
      >
        &times;
      </button>
      <h2 className="text-xl font-semibold mb-4 text-red-600">Are you sure?</h2>
      <p className="text-gray-700 mb-6">
        This action cannot be undone. The user will be permanently deleted.
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteUser}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-red-700"
        >
          Confirm Delete
        </button>
      </div>
    </div>
  </div>
)}
                 
    </div>
    
    
  );
}

export default DashUsers;*/}
