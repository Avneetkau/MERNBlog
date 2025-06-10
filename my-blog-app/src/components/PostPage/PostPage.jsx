import { Button, Spinner } from 'flowbite-react';
import axios from '../../axiosInstance'; // ✅ Centralized Axios
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../CallToAction/CallToAction';
import CommentSection from '../CommentSection/CommentSection';
import PostCard from '../PostCard/PostCard';

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/post/getposts?slug=${postSlug}`);

        if (data?.posts?.length > 0) {
          setPost(data.posts[0]);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching post:', err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const { data } = await axios.get(`/api/post/getposts?limit=3`);
        setRecentPosts(data.posts || []);
      } catch (err) {
        console.error('Error fetching recent posts:', err.message);
      }
    };

    fetchRecentPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-xl">Post not found or something went wrong.</p>
      </div>
    );
  }

  return (
    <div className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post.title}
      </h1>

      <Link to={`/search?category=${post.category}`} className="self-center mt-5">
        <Button color="gray" pill size="xs">
          {post.category}
        </Button>
      </Link>

      <img
        src={post.image}
        alt={post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />

      <div className="flex justify-between p-3 border-b border-slate-600 mx-auto w-full max-w-2xl">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {(post.content.length / 1000).toFixed(0)} min read
        </span>
      </div>

      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>

      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>

      <CommentSection postId={post._id} />

      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-3xl mt-5 font-serif">Recent Articles</h1>
        <div className="flex flex-row p-5 justify-center mt-5 gap-2 flex-wrap">
          {recentPosts.map((recentPost) => (
            <PostCard key={recentPost._id} post={recentPost} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;


