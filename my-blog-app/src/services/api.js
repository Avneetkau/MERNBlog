import React , {useEffect} from "react";
import axios from 'axios';


const fetchPosts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/posts');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching posts:', error.message);
  }
};

useEffect(() => {
  fetchPosts();
}, []);
