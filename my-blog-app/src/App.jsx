/*import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import BlogHome from './components/BlogHome/BlogHome';
import AboutUs from './components/AboutUs/AboutUs';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', author: '' });
  const [editingBlog, setEditingBlog] = useState(null);

  // Fetch blogs from backend
  useEffect(() => {
    fetch('http://localhost:3000/api/blogs')
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  // Handle input change for new blog
  const handleChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  // Handle blog submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      });
      if (response.ok) {
        const blog = await response.json();
        setBlogs([...blogs, blog]);
        setNewBlog({ title: '', content: '', author: '' });
      }
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  // Handle blog deletion
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/blogs/${id}`, {
        method: 'DELETE',
      });
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  // Handle blog update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/blogs/${editingBlog._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBlog),
      });
      if (response.ok) {
        const updatedBlog = await response.json();
        setBlogs(blogs.map(blog => (blog._id === updatedBlog._id ? updatedBlog : blog)));
        setEditingBlog(null);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <Banner />
      <BlogHome blogs={blogs} onDelete={handleDelete} onEdit={setEditingBlog} />
      {editingBlog ? (
        <form onSubmit={handleUpdate}>
          <input type="text" name="title" placeholder="Title" value={editingBlog.title} onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })} required />
          <textarea name="content" placeholder="Content" value={editingBlog.content} onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })} required />
          <input type="text" name="author" placeholder="Author" value={editingBlog.author} onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })} required />
          <button type="submit">Update Blog</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" value={newBlog.title} onChange={handleChange} required />
          <textarea name="content" placeholder="Content" value={newBlog.content} onChange={handleChange} required />
          <input type="text" name="author" placeholder="Author" value={newBlog.author} onChange={handleChange} required />
          <button type="submit">Create Blog</button>
        </form>
      )}
      <AboutUs />
      <Footer />
    </div>
  );
}

export default App;*/


import React  from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import KnowMore from './components/KnowMore/KnowMore';

import './App.css';
import SignUpPop from './components/SignUpPop/SignUpPop';
import SignIn from './components/SignIn/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AdminPrivateRoute from './components/PrivateRoute/AdminPrivateRoute';
import CreatePost from './components/CreatePost/CreatePost';
import UpdatePost from './components/UpdatePost/UpdatePost';
import PostPage from './components/PostPage/PostPage';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Search from './components/Search/Search';
import Motto from './components/Motto/Motto';
import ContactUs from './components/ContactUs/ContactUs';

function App() {
  

  return (
    <BrowserRouter className="App">
    <ScrollToTop/>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path = "/signup" element = { <SignUpPop/>}/>
      <Route path = "/signin" element = { <SignIn/>}/>
      <Route path = "/search" element = { <Search/>}/>
      <Route path = "/knowmore" element = { <KnowMore/>}/>
      <Route path = "/motto" element = { <Motto/>}/>
      <Route path = "/contactus" element = { <ContactUs/>}/>


      <Route element = { <PrivateRoute/>}>
      <Route path ="/dashboard" element = { <Dashboard/>}/> 
      </Route>

      <Route element = { <AdminPrivateRoute/>}>
      <Route path ="/create-post" element = { <CreatePost/>}/> 
      <Route path ="/update-post/:postId" element = { <UpdatePost/>}/> 
      </Route>
      <Route path = "/post/:postSlug" element = { <PostPage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;


