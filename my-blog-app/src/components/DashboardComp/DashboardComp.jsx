import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup
} from 'react-icons/hi';
import { Button, Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from 'flowbite-react';
import { Link } from 'react-router-dom';

const DashboardComp = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);

  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/user/getusers?limit=5');
        const data = res.data;
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
        setLastMonthUsers(data.lastMonthUsers);
      } catch (error) {
        console.log('Error fetching users:', error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/post/getposts?limit=5');
        const data = res.data;
        setPosts(data.posts);
        setTotalPosts(data.totalPosts);
        setLastMonthPosts(data.lastMonthPosts);
      } catch (error) {
        console.log('Error fetching posts:', error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get('/api/comment/getcomments?limit=5');
        const data = res.data;
        setComments(data.comments);
        setTotalComments(data.totalComments);
        setLastMonthComments(data.lastMonthComments);
      } catch (error) {
        console.log('Error fetching comments:', error.message);
      }
    };

    if (currentUser?.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        {/* Users Card */}
        <div className="flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase font-serif">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp /> {lastMonthUsers}
            </span>
            <div className="text-gray-500 font-serif">Last Month</div>
          </div>
        </div>

        {/* Comments Card */}
        <div className="flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase font-serif">Total Comments</h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp /> {lastMonthComments}
            </span>
            <div className="text-gray-500 font-serif">Last Month</div>
          </div>
        </div>

        {/* Posts Card */}
        <div className="flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase font-serif">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp /> {lastMonthPosts}
            </span>
            <div className="text-gray-500 font-serif">Last Month</div>
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        {/* Users Table */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2 font-serif">Recent Users</h1>
            <Button className="border border-red-500 bg-white hover:bg-red-500 hover:text-white text-black">
              <Link to="/dashboard?tab=users">See All</Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>User Image</TableHeadCell>
              <TableHeadCell>Username</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {users.map((user) => (
                <TableRow key={user._id} className="bg-white">
                  <TableCell>
                    <img
                      src={user.profilePicture}
                      alt="user"
                      className="w-10 h-10 rounded-full bg-gray-500"
                    />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Comments Table */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2 font-serif">Recent Comments</h1>
            <Button className="border border-red-500 bg-white hover:bg-red-500 hover:text-white text-black">
              <Link to="/dashboard?tab=comments">See All</Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>Comment Content</TableHeadCell>
              <TableHeadCell>Likes</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {comments.map((comment) => (
                <TableRow key={comment._id} className="bg-white">
                  <TableCell className="w-96">
                    <p className="line-clamp-2">{comment.content}</p>
                  </TableCell>
                  <TableCell>{comment.numberOfLikes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Posts Table */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2 font-serif">Recent Posts</h1>
            <Button className="border border-red-500 bg-white hover:bg-red-500 hover:text-white text-black">
              <Link to="/dashboard?tab=posts">See All</Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>Post Image</TableHeadCell>
              <TableHeadCell>Post Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {posts.map((post) => (
                <TableRow key={post._id} className="bg-white">
                  <TableCell>
                    <img
                      src={post.image}
                      alt="post"
                      className="w-14 h-10 rounded-md bg-gray-500"
                    />
                  </TableCell>
                  <TableCell className="w-96">{post.title}</TableCell>
                  <TableCell className="w-5">{post.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;

