import React, { useEffect, useState } from 'react';
import Image from "../../assets/bannerImage.avif";
import PostCard from '../PostCard/PostCard';
import axios from '../../axiosinstance';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

const BlogHome = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get('/api/post/getPosts?limit=3');
        setPosts(data.posts);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    
    fetchPosts();
  }, []);

  return (
    <div className="text-center w-full mb-10 mt-16 px-22">
      {posts && posts.length > 0 && (
        <div className="mx-auto gap-2">
          <h2 className="text-5xl mb-4 font-serif">Latest Blogs</h2>
          <p className="text-lg text-gray-600 mb-6 font-serif">
            Dive Into Stories, Discover New Worlds
          </p>
          <div className="flex flex-wrap gap-4 mx-auto">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button className="text-center text-sm bg-red-500 text-white hover:bg-red-900">
              <Link to="/search">View All Posts</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogHome;
