import React, { useEffect, useState } from 'react';
import axios from '../../axiosinstance'; 
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup
} from 'react-icons/hi';
import {
  Button,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell
} from 'flowbite-react';
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
        const { data } = await axios.get('/api/user/getusers?limit=5');
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
        setLastMonthUsers(data.lastMonthUsers);
      } catch (err) {
        console.error('Error fetching users:', err.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const { data } = await axios.get('/api/post/getposts?limit=5');
        setPosts(data.posts);
        setTotalPosts(data.totalPosts);
        setLastMonthPosts(data.lastMonthPosts);
      } catch (err) {
        console.error('Error fetching posts:', err.message);
      }
    };

    const fetchComments = async () => {
      try {
        const { data } = await axios.get('/api/comment/getcomments?limit=5');
        setComments(data.comments);
        setTotalComments(data.totalComments);
        setLastMonthComments(data.lastMonthComments);
      } catch (err) {
        console.error('Error fetching comments:', err.message);
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
        {/* Total Users */}
        <StatCard
          title="Total Users"
          count={totalUsers}
          lastMonth={lastMonthUsers}
          Icon={HiOutlineUserGroup}
          color="bg-teal-600"
        />

        {/* Total Comments */}
        <StatCard
          title="Total Comments"
          count={totalComments}
          lastMonth={lastMonthComments}
          Icon={HiAnnotation}
          color="bg-indigo-600"
        />

        {/* Total Posts */}
        <StatCard
          title="Total Posts"
          count={totalPosts}
          lastMonth={lastMonthPosts}
          Icon={HiDocumentText}
          color="bg-lime-600"
        />
      </div>

      {/* Tables */}
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <EntityTable title="Recent Users" link="/dashboard?tab=users">
          <TableHead>
            <TableHeadCell>User Image</TableHeadCell>
            <TableHeadCell>Username</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <img src={user.profilePicture} alt="user" className="w-10 h-10 rounded-full bg-gray-500" />
                </TableCell>
                <TableCell>{user.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </EntityTable>

        <EntityTable title="Recent Comments" link="/dashboard?tab=comments">
          <TableHead>
            <TableHeadCell>Comment Content</TableHeadCell>
            <TableHeadCell>Likes</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {comments.map((comment) => (
              <TableRow key={comment._id}>
                <TableCell className="w-96">
                  <p className="line-clamp-2">{comment.content}</p>
                </TableCell>
                <TableCell>{comment.numberOfLikes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </EntityTable>

        <EntityTable title="Recent Posts" link="/dashboard?tab=posts">
          <TableHead>
            <TableHeadCell>Post Image</TableHeadCell>
            <TableHeadCell>Post Title</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {posts.map((post) => (
              <TableRow key={post._id}>
                <TableCell>
                  <img src={post.image} alt="post" className="w-14 h-10 rounded-md bg-gray-500" />
                </TableCell>
                <TableCell className="w-96">{post.title}</TableCell>
                <TableCell className="w-5">{post.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </EntityTable>
      </div>
    </div>
  );
};

// Sub-components for better structure
const StatCard = ({ title, count, lastMonth, Icon, color }) => (
  <div className="flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md">
    <div className="flex justify-between">
      <div>
        <h3 className="text-gray-500 text-md uppercase font-serif">{title}</h3>
        <p className="text-2xl">{count}</p>
      </div>
      <Icon className={`${color} text-white rounded-full text-5xl p-3 shadow-lg`} />
    </div>
    <div className="flex gap-2 text-sm">
      <span className="text-green-500 flex items-center">
        <HiArrowNarrowUp /> {lastMonth}
      </span>
      <div className="text-gray-500 font-serif">Last Month</div>
    </div>
  </div>
);

const EntityTable = ({ title, link, children }) => (
  <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md">
    <div className="flex justify-between p-3 text-sm font-semibold">
      <h1 className="text-center p-2 font-serif">{title}</h1>
      <Button className="border border-red-500 bg-white hover:bg-red-500 hover:text-white text-black">
        <Link to={link}>See All</Link>
      </Button>
    </div>
    <Table hoverable>{children}</Table>
  </div>
);

export default DashboardComp;

