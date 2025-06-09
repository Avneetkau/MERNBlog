import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getStorage, uploadBytesResumable} from "firebase/storage"
import { app } from "../../Firebase/Firebase.js";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getDownloadURL, ref } from "firebase/storage";
import { useNavigate , useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const UpdatePost = () => {
const [file, setFile] = useState(null);
const [imageUploadProgress, setImageUploadProgress] = useState(null);
const [imageUploadError,setImageUploadError] = useState(null);
const [formData,setFormData] = useState({});
const [publishError, setPublishError] = useState(null);

 const { postId } = useParams();
 const navigate=useNavigate();
 const  { currentUser } = useSelector((state) => state.user);
//console.log(formData); if we wan to see form data on console


useEffect(() => {
    try{
        const fetchPost = async () => {
            const res = await fetch(`https://mern-blog-one-rho.vercel.app/api/post/getposts?postId=${postId}`);
            const data = await res.json();
            if(!res.ok){
                console.log(data.message);
                setPublishError(data.message);
                return;
            }
            if(res.ok){
               setPublishError(null);
               setFormData(data.posts[0]);
            }
        };
        fetchPost();
    }catch(error){
        console.log(error.message);
    }
}, [postId]);
const handleUploadImage = async (e)=>{
  e.preventDefault();

  try{
   if(!file) {
    setImageUploadError('Plese select an image');
    return;
   }
   setImageUploadError(null);
   const storage = getStorage(app);
   const fileName=new Date().getTime() + "-" + file.name;
   const storageRef =ref(storage,fileName);
   const uploadTask = uploadBytesResumable(storageRef, file);
   uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress =
       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       setImageUploadProgress(progress.toFixed(0));
    },
    (error) => {
      setImageUploadError('Image upload Failed');
      setImageUploadProgress(null);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageUploadProgress(null);
        setImageUploadError(null);
        setFormData({...formData, image:downloadURL});
      });
    }
   );

  }catch(error){
    setImageUploadError('Image upload Failed');
    setImageUploadProgress(null);
    console.log(error);
  }
}

const handleSubmit = async (e) =>{
      e.preventDefault();
      try{
        const res = await fetch(`https://mern-blog-one-rho.vercel.app/api/post/updatepost/${formData._id}/${currentUser._id}`,
          {
            method : 'PUT',
            headers : {
              'Content-Type' : 'application/json',

            },
            body: JSON.stringify(formData),
          }
        );
        const data = await res.json();
        if(!res.ok) {
          setPublishError(data.message);
          return;
        }
        if(res.ok){
          setPublishError(null);
          navigate(`/post/${data.slug}`);
        }
        
      }
      catch(error){
        setPublishError('Something went wrong');
      }
}
   
  return (
    <div className = "p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update a Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <input
             type="text" 
             placeholder ="Title" 
             id="title" 
             className="border-2 border-gray-400 w-full rounded p-2 flex-1" 
             onChange = { (e)=> setFormData({...formData, title : e.target.value })} value={formData.title} required/>

            <select className="flex p-2 border-2 border-gray-400 rounded"
            onChange= { (e) => setFormData({...formData, category : e.target.value})}  value={formData.category}>
                <option value="uncatagorized">Select a category</option>
                <option value="javascript">Javascript</option>
                <option value="reactjs">React js</option>
                <option value="nextjs">Next js</option>
           </select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
  <input
    type="file"
    accept="image/*"
    className="block w-full text-sm text-gray-700
               file:bg-black file:text-white
               file:py-2 file:px-4
               file:rounded-md file:border-0
               file:font-semibold
               file:cursor-pointer
               bg-white rounded-md"
    onChange={ (e) =>setFile(e.target.files[0])}           
  />

  <button
    type="button"
    className="bg-blue-600 text-white font-semibold w-[150px] px-2 py-2 rounded-md h-[44px] flex items-center"
    onClick= { handleUploadImage }
    disabled = {imageUploadProgress}
  >
   {imageUploadProgress ? (
    <div className='w-10 h-10'>
      <CircularProgressbar value= {imageUploadProgress} text = {`${imageUploadProgress || 0 }%`} />
    </div>
   ) :(
    'Upload Image'
   )}
   
  </button>
</div>
      {imageUploadError && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <span className="block sm:inline">{imageUploadError}</span>
  </div>
)}
{ formData.image && (
  <img
  src= {formData.image}
  alt='upload'
  className="w-full h-72 object-cover"/>
)}
      <ReactQuill theme="snow" value={formData.content}
      placeholder="write description here"
       className="h-72 mb-12"
       onChange ={ (value) =>{ setFormData({...formData, content : value});
       }}
       required />

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-200">
      Update Post
      </button>

      {publishError && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <span className="block sm:inline">{publishError}</span>
  </div>
)}
      </form>
    </div>
  );
}

export default UpdatePost;