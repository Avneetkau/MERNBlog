import React, { useEffect, useState } from 'react';
import Image from "../../assets/bannerImage.avif";
import PostCard from '../PostCard/PostCard';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
  

{/*const Card = ({ image, topic, visitors }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-6 font-serif">
      <img src={image} alt="Card image" className="w-full h-48 object-cover rounded-md" />
      <h3 className="text-xl font-semibold mt-4">{topic}</h3>
      <hr className="my-4 border-gray-300" />
      
      <div className="flex justify-between items-center">
        {/* Visitor count *
        <span className="text-gray-600">Visitors: {visitors}</span>
        
        {/* Favorite Heart *
        <button onClick={toggleFavorite} className="text-red-500">
          {isFavorite ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};*/}

const BlogHome = () => {
  const [posts,setPosts] = useState([]);
  useEffect(() =>{
    const fetchPosts = async () =>{
      const res= await fetch(`/api/post/getPosts?limit=3`);
      const data = await res.json();
      setPosts(data.posts);

    } ;fetchPosts();
  },[])
  return (
    <div className="text-center w-full mb-10 mt-16 px-22">
     { posts && posts.length > 0 && (
      <div className="  mx-auto gap-2 ">
      <h2 className="text-5xl  mb-4 font-serif">Latest Blogs</h2>
      <p className="text-lg text-gray-600 mb-6 font-serif">Dive Into Stories, Discover New Worlds</p>
      <div className="flex flex-wrap gap-4 mx-auto">
        {posts.map((post) =>(
          <PostCard key={post._id} post={post}/>
        ))}
      </div>
        <div className="flex justify-center mt-10">
      <Button className="text-center text-sm bg-red-500 text-white hover:bg-red-900" >
      <Link to={"/search"} > View All Posts</Link>
      </Button>
      </div>
      </div>
      )}
     
    </div>
  );
};

export default BlogHome;
