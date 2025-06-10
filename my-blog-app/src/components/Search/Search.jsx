import { Button, Select, TextInput } from 'flowbite-react';
import axios from '../../axiosinstance'; 
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../PostCard/PostCard';

const Search = () => {
  const [sideBarData, setSideBarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm') || '';
    const sortFromUrl = urlParams.get('sort') || 'desc';
    const categoryFromUrl = urlParams.get('category') || 'uncategorized';

    setSideBarData({
      searchTerm: searchTermFromUrl,
      sort: sortFromUrl,
      category: categoryFromUrl,
    });

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const searchQuery = urlParams.toString();
        const { data } = await axios.get(`/api/post/getPosts?${searchQuery}`);
        setPosts(data.posts);
        setShowMore(data.posts.length === 9);
      } catch (err) {
        console.error('Error fetching posts:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSideBarData(prev => ({
      ...prev,
      [id]: value || (id === 'sort' ? 'desc' : id === 'category' ? 'uncategorized' : ''),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    if (sideBarData.searchTerm) urlParams.set('searchTerm', sideBarData.searchTerm);
    if (sideBarData.sort) urlParams.set('sort', sideBarData.sort);
    if (sideBarData.category) urlParams.set('category', sideBarData.category);

    navigate(`/search?${urlParams.toString()}`);
  };

  const handleShowMore = async () => {
    try {
      const startIndex = posts.length;
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('startIndex', startIndex);
      const searchQuery = urlParams.toString();

      const { data } = await axios.get(`/api/post/getPosts?${searchQuery}`);
      setPosts(prev => [...prev, ...data.posts]);
      setShowMore(data.posts.length === 9);
    } catch (err) {
      console.error('Error loading more posts:', err.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold" htmlFor="searchTerm">
              Search Term:
            </label>
            <TextInput
              placeholder="search..."
              id="searchTerm"
              type="text"
              value={sideBarData.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 items-center">
            <label className="whitespace-nowrap font-semibold" htmlFor="sort">
              Sort by:
            </label>
            <Select
              onChange={handleChange}
              value={sideBarData.sort}
              id="sort"
              className="w-[120px]"
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>

          <div className="flex gap-2 items-center">
            <label className="whitespace-nowrap font-semibold" htmlFor="category">
              Category:
            </label>
            <Select
              className="bg-white w-[150px]"
              onChange={handleChange}
              value={sideBarData.category}
              id="category"
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">Javascript</option>
            </Select>
          </div>

          <Button type="submit" className="bg-red-500 hover:bg-red-700 text-white">
            Search
          </Button>
        </form>
      </div>

      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
          Posts Result:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No Posts found</p>
          )}

          {loading && <p className="text-xl text-gray-500">Loading...</p>}

          {!loading &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}

          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-white hover:bg-red-700 bg-red-500 text-lg p-2 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;

