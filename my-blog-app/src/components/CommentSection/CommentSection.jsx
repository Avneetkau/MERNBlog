import { Alert, Button, Textarea } from 'flowbite-react';
import axios from '../../axiosinstance'; 
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comments from '../Comments/Comments';

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      setCommentError('Comment exceeds 200 characters');
      return;
    }

    try {
      const { data } = await axios.post('/api/comment/create', {
        content: comment,
        postId,
        userId: currentUser._id,
      });

      setComment('');
      setCommentError(null);
      setComments([data, ...comments]);
    } catch (error) {
      setCommentError(error.response?.data?.message || 'Failed to add comment');
      console.log('Comment creation error:', error);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await axios.get(`/api/comment/getPostComment/${postId}`);
        setComments(data);
      } catch (error) {
        console.log('Get comments error:', error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }

      const { data } = await axios.put(`/api/comment/likeComment/${commentId}`);

      setComments(
        comments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                likes: data.likes,
                numberOfLikes: data.likes.length,
              }
            : comment
        )
      );
    } catch (error) {
      console.log('Like error:', error.message);
    }
  };

  const handleEdit = (comment, editedComment) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedComment } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }

      await axios.delete(`/api/comment/deleteComment/${commentId}`);

      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.log('Delete error:', error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-2 mb-3">
          <p>Signed in as:</p>
          <img
            className="h-10 w-10 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt="profile"
          />
          <Link
            to={'/dashboard?tab=profile'}
            className="text-xs text-blue-500 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-teal-500 my-5 flex gap-1">
          <p>You must be logged in to comment</p>
          <Link className="text-blue-500 hover:underline" to={'/sign-in'}>
            Sign in
          </Link>
        </div>
      )}

      {currentUser && (
        <form onSubmit={handleSubmit} className="border border-red-300 rounded-md p-3">
          <Textarea
            placeholder="Add a comment....."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-sm">{200 - comment.length} characters remaining</p>
            <Button className="bg-red-500 hover:bg-red-700" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}

      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comments
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
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
                onClick={() => handleDelete(commentToDelete)}
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

export default CommentSection;

//https://docs.google.com/forms/d/e/1FAIpQLScnIBjruhkNgZ5XTusRpxheOYpjFG_JCuYAcGVINhYQ2WhS7Q/viewform
//expertia ai
//https://boomi.com/boomi-jobs/?gh_jid=5483182004&gh_src=047aa44c4us
//