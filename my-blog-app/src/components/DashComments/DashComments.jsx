import { useSelector } from 'react-redux';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comment/getcomments`);
        const data = res.data;

        if (res.status === 200) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser?.isAdmin) {
      fetchComments();
    }
  }, [currentUser?.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await axios.get(`/api/comment/getcomments?startIndex=${startIndex}`);
      const data = res.data;
      if (res.status === 200) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await axios.delete(`/api/comment/deleteComment/${commentIdToDelete}`, {
  withCredentials: true});
      const data = res.data;

      if (res.status === 200) {
        setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      {currentUser?.isAdmin && comments.length > 0 ? (
        <div>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-400">
              <tr>
                <th className="py-3 px-4 text-left font-semibold font-serif">DATE CREATED</th>
                <th className="py-3 px-4 text-left font-semibold font-serif">COMMENT CONTENT</th>
                <th className="py-3 px-4 text-left font-semibold font-serif">NUMBER OF LIKES</th>
                <th className="py-3 px-4 text-left font-semibold font-serif">POSTId</th>
                <th className="py-3 px-4 text-left font-semibold font-serif">USERId</th>
                <th className="py-3 px-4 text-left font-semibold font-serif">DELETE</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment._id} className="border-t hover:bg-gray-200 transition-colors">
                  <td className="py-3 px-6">{new Date(comment.updatedAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 font-medium font-serif">{comment.content}</td>
                  <td className="py-3 px-4">{comment.numberOfLikes}</td>
                  <td className="py-3 px-4">{comment.postId}</td>
                  <td className="py-3 px-4">{comment.userId}</td>
                  <td>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
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
                className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>No comments available</p>
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
              This action cannot be undone. Your comment will be permanently deleted.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteComment}
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

export default DashComments;
