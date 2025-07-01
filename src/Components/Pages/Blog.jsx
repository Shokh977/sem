import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { useAuth } from '../../context/AuthContext';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ChevronRight, 
  Search, 
  TrendingUp,
  Bookmark,
  Share2,
  ThumbsUp,
  MessageCircle,
  Globe,
  Newspaper,
  GraduationCap,
  School,
  Sparkles,
  PenTool,
  Mail,
  ArrowRight,
  Filter,
  Bell
} from 'lucide-react';

const categories = [
  { id: "all", label: "Barchasi", icon: Newspaper },
  { id: "topik", label: "TOPIK", icon: GraduationCap },
  { id: "learning", label: "O'rganish", icon: PenTool },
  { id: "university", label: "Universitet", icon: School },
  { id: "culture", label: "Madaniyat", icon: Globe },
  { id: "tips", label: "Maslahatlar", icon: Sparkles }
];

const NewsCard = ({ post, size = "normal" }) => (
  <article className={`group cursor-pointer ${
    post.isNotification 
      ? 'border-2 border-blue-500/30 shadow-lg shadow-blue-500/10' 
      : ''
    } bg-gray-800/50 rounded-xl p-6 ${
    size === "large" ? "grid md:grid-cols-2 gap-6" : "flex flex-col"
  }`}>
    <div className={`overflow-hidden rounded-xl ${
      size === "large" ? "h-full" : "h-48 md:h-56"
    }`}>
      <img 
        src={post.coverImage || 'https://placehold.co/800x400/1a365d/ffffff?text=News'} 
        alt={post.title}
        className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
      />
    </div>
    
    <div className="flex-1 py-4">
      <div className="flex items-center gap-3 mb-3">
        <span className="px-2.5 py-1 bg-blue-500 text-white rounded-full text-xs font-medium">
          {post.category}
        </span>
        {post.isNotification && (
          <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium flex items-center gap-1">
            <Bell size={12} />
            Muhim
          </span>
        )}
        <span className="text-gray-300 text-sm flex items-center gap-1">
          <Clock size={14} />
          {`${Math.ceil((post.content?.length || 0) / 1000)} min o'qish`}
        </span>
      </div>          <Link to={`/blog/${post._id}`}>
            <h3 className={`${
              size === "large" ? "text-2xl" : "text-lg"
            } font-bold text-white mb-2 group-hover:text-blue-400`}>
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
                  post.onSave?.(post._id);
                }}
                className={`flex items-center gap-1 ${
                  post.isSaved ? 'text-blue-500' : 'text-gray-300'
                } hover:text-blue-500 transition-colors`}
              >
                <Bookmark size={16} className={post.isSaved ? 'fill-current' : ''} />
              </button>
            </div>
      </div>
    </div>
  </article>
);

const Blog = () => {  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [savingPost, setSavingPost] = useState(null);
  const filteredPosts = useMemo(() => {
    if (!Array.isArray(posts)) {
      return [];
    }
    
    return posts
      .filter(post => {
        // Category filter
        if (selectedCategory !== 'all' && post.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
        
        // Search term filter
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          return (
            post.title?.toLowerCase().includes(searchLower) ||
            post.excerpt?.toLowerCase().includes(searchLower) ||
            post.content?.toLowerCase().includes(searchLower) ||
            post.category?.toLowerCase().includes(searchLower) ||
            post.author?.name?.toLowerCase().includes(searchLower)
          );
        }
        
        return true;
      })
      .sort((a, b) => {
        // First sort by notification status
        if (a.isNotification && !b.isNotification) return -1;
        if (!a.isNotification && b.isNotification) return 1;
        
        // Then sort by creation date
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [posts, searchTerm, selectedCategory]);  const handleSave = async (postId) => {
    if (!user) {
      navigate('/signin');
      return;
    }

    try {
      setSavingPost(postId);
      const post = posts.find(p => p._id === postId);
      const isSaved = post?.savedBy?.includes(user._id);

      const response = await axios[isSaved ? 'delete' : 'post'](
        `http://localhost:5000/api/blogs/${postId}/save`,
        {},
        { withCredentials: true }
      );
      
      setPosts(prev => prev.map(p => {
        if (p._id === postId) {
          return {
            ...p,
            savedBy: response.data.isSaved
              ? [...(p.savedBy || []), user._id]
              : (p.savedBy || []).filter(id => id !== user._id)
          };
        }
        return p;
      }));
    } catch (err) {
      console.error('Error saving blog:', err);
    } finally {
      setSavingPost(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = selectedCategory === 'all' 
          ? '/api/blogs'
          : `/api/blogs?category=${selectedCategory}`;
        const response = await axios.get(url);
        const data = response.data || [];
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch blog posts:', err);
        setPosts([]);
        setError(err.message || 'Failed to fetch blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);
  useEffect(() => {
    const fetchTrendingTopics = async () => {
      try {
        const response = await axios.get('/api/blogs/trending-topics');
        setTrendingTopics(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Failed to fetch trending topics:', err);
        // Set some default topics if API fails
        setTrendingTopics([
          "TOPIK 2025",
          "Koreys tili grammatikasi",
          "Koreya universitetlari",
          "O'qish bo'yicha maslahatlar",
          "Stipendiyalar"
        ]);
      }
    };

    fetchTrendingTopics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="text-center text-red-400 py-10">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Qidirish..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <cat.icon size={16} />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Posts */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <NewsCard 
                    key={post._id} 
                    post={post} 
                    size={index === 0 ? "large" : "normal"} 
                  />
                ))
              ) : (
                <div className="text-center py-10 text-gray-400">
                  Bloglar topilmadi
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Trending Topics */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-400" />
                Trenddagi Mavzular
              </h3>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (                  <button
                    key={index}
                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700/50"
                    onClick={() => {
                      setSearchTerm(topic);
                      setSelectedCategory('all'); // Reset category when searching by topic
                    }}
                  >
                    <Tag size={16} />
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Mail size={20} className="text-blue-400" />
                Yangiliklardan xabardor bo'ling
              </h3>
              <p className="text-gray-300 mb-4">
                Eng so'nggi yangiliklarni birinchilardan bo'lib bilib turing
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Email manzilingiz"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900 border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Obuna bo'lish</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Blog;
