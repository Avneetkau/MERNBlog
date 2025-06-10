import React, { useEffect, useState } from 'react';
import axios from '../../axiosInstance'; // ✅ Use custom Axios instance
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';

const Comments = ({ comment, onLike, onEdit, onDelete }) => {
  const [user, setUser] = useState({});
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/user/${comment.userId}`);
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`/api/comment/editComment/${comment._id}`, {
        content: editedContent,
      });
      setIsEditing(false);
      onEdit(comment, editedContent);
    } catch (error) {
      console.error('Error saving comment:', error.message);
    }
  };

  return (
    <div className="flex p-4 border-b text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-15 h-15 rounded-full bg-gray-200"
          src={user.profilePicture || '/default-avatar.png'}
          alt={user.username || 'user'}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user?.username ? `@${user.username}` : 'anonymous user'}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>

        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t border-gray-150 max-w-fit gap-2">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  '!text-blue-500'
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    ' ' +
                    (comment.numberOfLikes === 1 ? 'like' : 'likes')}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      onClick={handleEdit}
                      type="button"
                      className="text-gray-400 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(comment._id)}
                      type="button"
                      className="text-gray-400 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comments;

