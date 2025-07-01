import React, { useState, useEffect } from 'react';
import axios from '../../config/axios';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  Clock,
  Tag,
  ThumbsUp,
  MessageCircle,
  Bookmark,
  Search,
  Loader2,
} from 'lucide-react';

const NewsCard = ({ post }) => (
  <article className="group bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800/70 transition-colors">
    <div className="overflow-hidden rounded-xl h-48 md:h-56">
      <img 
        src={post.coverImage || 'https://placehold.co/800x400/1a365d/ffffff?text=Blog'}
        alt={post.title}
        className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
      />
    </div>
    
    <div className="flex-1 pt-4">
      <div className="flex items-center gap-3 mb-3">
        <span className="px-2.5 py-1 bg-blue-500 text-white rounded-full text-xs font-medium">
          {post.category}
        </span>
        <span className="text-gray-300 text-sm flex items-center gap-1">
          <Clock size={14} />
          {post.readTime || `${Math.ceil((post.content?.length || 0) / 1000)} min o'qish`}
        </span>
      </div>

      <Link to={`/blog/${post._id}`}>
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400">
          {post.title}
        </h3>
      </Link>

      <p className="text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">{post.author?.name}</span>
        </div>
        <div className="flex items-center gap-4 text-gray-300">
          <span className="flex items-center gap-1">
            <ThumbsUp size={16} />
            {post.likes?.length || 0}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle size={16} />
            {post.comments?.length || 0}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              post.onUnsave?.(post._id);
            }}
            className="flex items-center gap-1 text-blue-500 hover:text-blue-400"
          >
            <Bookmark size={16} />
          </button>
        </div>
      </div>
    </div>
  </article>
);

export default function SavedBlogs() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSavedBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/blogs/saved', {
        withCredentials: true
      });
      setPosts(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Failed to fetch saved blogs:', err);
      setError(err.message || 'Failed to fetch saved blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedBlogs();
  }, []);

  const handleUnsave = async (blogId) => {
    try {
      await axios.delete(`/api/blogs/${blogId}/save`, {
        withCredentials: true
      });
      // Refresh saved blogs list
      fetchSavedBlogs();
    } catch (err) {
      console.error('Failed to unsave blog:', err);
    }
  };

  const filteredPosts = posts.filter(post => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      post.title?.toLowerCase().includes(searchLower) ||
      post.excerpt?.toLowerCase().includes(searchLower) ||
      post.content?.toLowerCase().includes(searchLower) ||
      post.category?.toLowerCase().includes(searchLower) ||
      post.author?.name?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="flex justify-center items-center py-20">
          <Loader2 size={40} className="animate-spin text-blue-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-red-400 py-10">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <Bookmark size={28} className="text-blue-500" />
            Saqlangan Bloglar
          </h1>
          <p className="text-gray-400">Siz saqlab qo'ygan maqolalar</p>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <NewsCard
                key={post._id}
                post={{
                  ...post,
                  onUnsave: handleUnsave
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-3 bg-blue-500/10 rounded-xl mb-4">
              <Bookmark size={40} className="text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Saqlangan bloglar yo'q</h3>
            <p className="text-gray-400 mb-6">
              Hozircha hech qanday blog saqlanmagan. Bloglarni keyinroq o'qish uchun ularni saqlab qo'yishingiz mumkin.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors"
            >
              Bloglarni ko'rish
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
