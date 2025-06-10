import { useSelector } from 'react-redux';
import axios from '../../axiosinstance'; 
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DashPost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`/api/post/getPosts?userId=${currentUser._id}`);
        setUserPosts(data.posts);
        if (data.posts.length < 9) setShowMore(false);
      } catch (err) {
        console.error('Fetch error:', err.message);
      }
    };

    if (currentUser?.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const { data } = await axios.get(`/api/post/getPosts?userId=${currentUser._id}&startIndex=${startIndex}`);
      setUserPosts((prev) => [...prev, ...data.posts]);
      if (data.posts.length < 9) setShowMore(false);
    } catch (err) {
      console.error('Show more error:', err.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const { data } = await axios.delete(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`);
      setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
    } catch (err) {
      console.error('Delete error:', err.message);
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      {currentUser?.isAdmin && userPosts.length > 0 ? (
        <div>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-400">
              <tr>
                <th className="py-3 px-4 text-left font-semibold font-serif">DATE UPDATED</th>
                <th className="py-3 px-4 text-left font-semibold font-serif">IMAGE</th>
                <th className="py-3 px-4 text-left font-semibold font-serif">TITLE</th>
                <th className="py-3 px-4 text-left font-semibold font-serif">CATEGORY</th>
                <th className="py-3 px-4 text-left font-semibold font-serif">EDIT</th>
                <th className="py-3 px-4 text-left font-semibold font-serif">DELETE</th>
              </tr>
            </thead>
            <tbody>
              {userPosts.map((post) => (
                <tr key={post._id} className="border-t hover:bg-gray-200 transition-colors">
                  <td className="py-3 px-6">{new Date(post.updatedAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 font-medium">
                    <Link to={`/post/${post.slug}`}>
                      <img src={post.image} alt={post.title} className="h-16 w-16 object-cover rounded" />
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  </td>
                  <td className="py-3 px-4">{post.category}</td>
                  <td className="py-3 px-4 space-x-2">
                    <Link to={`/update-post/${post._id}`}>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showMore && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleShowMore}
                className="w-full px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-900"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>No posts available</p>
      )}

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
                onClick={handleDeletePost}
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
};

export default DashPost;

