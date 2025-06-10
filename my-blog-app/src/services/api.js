import React, { useEffect } from "react";
import axios from "axios";

const MyComponent = () => {
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/posts");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Check the console for fetched posts</h1>
    </div>
  );
};

export default MyComponent;

