import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { useSelector } from "react-redux";
import { CircularProgressbar } from 'react-circular-progressbar';// for progress bar
import 'react-circular-progressbar/dist/styles.css';// style.css for progress bar
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import { app } from "../../Firebase/Firebase.js";
import { updateStart,updateSuccess,updateFailure } from '../../redux/user/userSlice.js';
import { deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../../redux/user/userSlice.js';
import { signoutSuccess } from '../../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


const DashProfile = () => {
  const {currentUser,error, loading } = useSelector( state =>state.user);
  const [ imageFile, setImageFile ] = useState(null); //state for profile image
  const [ imageFileUrl, setImageFileUrl] = useState(null); //for new imageFile Url
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [ imageFileUploadError, setImageFileUploadError] = useState(null);
  //const [ imageFileLoading, setImageFileLoading ]= useState(false);
  const [sizeError, setSizeError] = useState(null);  //State for size error of file
  const [formData, setFormData] = useState({});//for updation data
  const [showModal,setShowModal] = useState(false);
  const dispatch = useDispatch();
  const filePickerRef = useRef();//add this file ref to input

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
     //setImageFile(file);
     //setImageFileUrl(URL.createObjectURL(file));
      // Reset error if file is valid
     
        if (file.size > 2 * 1024 * 1024) {
          setSizeError("❌ File size must be less than 2MB!"); // Show alert
          setImageFile(null); // Reset image file
          return;
        }
  
        setSizeError(null); // Reset error if file is valid
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
      }
  };
  console.log(formData);
  useEffect(() =>{
    if (imageFile){
      uploadImage();
    }
  },[imageFile]);

  const uploadImage = async () =>{
     
    setImageFileUploadError(null);
     const storage = getStorage(app);
     const fileName =new Date().getTime() + imageFile.name;
     const storageRef = ref( storage, fileName);
     const uploadTask = uploadBytesResumable(storageRef, imageFile);

     uploadTask.on(
      'state_changed',
      (snapshot) => { //snapshot is used to check file byte by byte
         const progress =
         (snapshot.bytesTransferred / snapshot.totalBytes) * 100 ;
         setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
            setImageFileUploadError(' Could not upload Image (File must be less than 2MB');
            setImageFileUploadProgress(null);
            setImageFile(null);
            setImageFileUrl(null);
         
      },
      
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
          setImageFileUrl(downloadURL);
          setFormData({...formData, profilePicture:downloadURL});
        
        });
      }
     );
     
   
};

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id] : e.target.value});
};

//For Submit
const handleSubmit = async (e) =>{
  e.preventDefault();
  if(Object.keys(formData).length === 0){
    return;
  }
  
  try{
     dispatch(updateStart());
     const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method : 'PUT',
      headers:{
        'Content-Type' : 'application/json',
      },
      credentials: 'include',
      body:JSON.stringify(formData),
     });
     const data = await res.json();
     console.log('🚨 Backend response:', data);
     if(!res.ok){
      dispatch(updateFailure(data.message));
     }
     else{
      dispatch(updateSuccess(data));
     }
  } catch(error){
        dispatch(updateFailure(error.message));
  }
};

const handleDeleteUser = async () =>{
      setShowModal(false);
      try{
       dispatch(deleteUserStart());
       const res = await fetch(`/api/user/delete/${currentUser._id}`,
        { method:'DELETE',
          credentials: 'include',
        }
       );
       const data = await res.json();
       console.log(data);
       if(!res.ok){
        dispatch(deleteUserFailure(data.message));
       }
       else {
        dispatch(deleteUserSuccess(data));
       }
      }catch(error){
          dispatch(deleteUserFailure(error.message));
      }
};
  
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
    <div className="flex flex-col items-center  h-full w-full ">
      <h1 className="text-3xl font-bold mb-6 font-serif">Profile</h1>

      <form className="flex flex-col items-center w-full max-w-sm space-y-4" onSubmit={handleSubmit}>

      <input type="file" accept="image/*" onChange ={ handleImageChange } ref={filePickerRef} hidden/>
      <div className=" relative w-32 h-32 self-center flex-col cursor-pointer shadow-md overflow-hidden rounded-full" onClick ={() => 
      filePickerRef.current.click()}>

      {imageFileUploadProgress && (
        <CircularProgressbar value ={imageFileUploadProgress || 0 } text={`${imageFileUploadProgress}%`}
        strokeWidth={5}  styles={{
          root:{
            width : '100%',
            height : '100%',
            position : 'absolute',
            top :0,
            left:0,
          },
          path : {
            stroke : `rgba(62, 152, 199 , ${imageFileUploadProgress / 100 })`,
          },
        }}/>
      )}
        <img src={imageFileUrl || currentUser.profilePicture} alt="user" className={`rounded-full w-full h-full border-8 border-[lightgrey] object-cover
        ${imageFileUploadProgress && imageFileUploadProgress < 100  && 'opacity-60'}`}/>
        </div>

              {/* 🚨 Show Error Message If File is Too Large */}
              {sizeError && <div className="text-red-500 bg-red-100 px-4 py-2 rounded-md">{sizeError} </div>}

        <input type="text"
         id="username" 
        className="w-full p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-serif"
        defaultValue={currentUser.username} onChange={handleChange}/>

        <input type="email"
         id="email" 
         className="w-full p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-serif"
         defaultValue={currentUser.email} onChange={handleChange} />

        <input type="password"
         id="password"
          className="w-full p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-serif"
          placeholder="password" onChange={handleChange}/>

          <button type="submit" className="w-full bg-red-500 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition duration-300" disabled={loading }>
         { loading ? "Loading... ": "Update"}
          </button>
          { currentUser.isAdmin && (
            <Link to = { '/create-post'}>
            <button type="button" className="w-[380px] bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition duration-300">
              Create a Post
            </button>
            </Link>
          )}
      </form>
     <div className="text-red-500 flex justify-between mt-5 max-w-sm w-full">
      <span className="cursor-pointer" onClick = { ()=>setShowModal(true) } >Delete Account?</span>
      <span className="cursor-pointer" onClick ={ handleSignOut}>Sign Out</span>
     </div> 
     {error && <div className="text-red-500 bg-red-100 px-4 py-2 rounded-md">{error} </div>}
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
        This action cannot be undone. Your account will be permanently deleted.
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

export default DashProfile;
