import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Share2,
  MessageCircle,
  ThumbsUp,
  Bookmark,
  Facebook,
  Twitter,
  Send,
  Link as LinkIcon,
  Loader2,
  Mail,
  UserCircle2,
  ArrowRight
} from 'lucide-react';

function BlogDetail() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likeLoading, setLikeLoading] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/blogs/${blogId}`, {
          withCredentials: true
        });
        if (!response.data) {
          throw new Error('Blog not found');
        }
        setPost(response.data);
        
        // Check if the current user has liked and saved the post
        if (user) {
          setIsLiked(response.data.likes.includes(user._id));
          setIsSaved(response.data.savedBy?.includes(user._id));
        }
        
        // Fetch comments
        const commentsResponse = await axios.get(`http://localhost:5000/api/blogs/${blogId}/comments`, {
          withCredentials: true
        });
        setComments(commentsResponse.data);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId, user]);

  const handleSave = async () => {
    if (!user) {
      navigate('/signin');
      return;
    }

    try {
      setSaveLoading(true);
      const response = await axios[isSaved ? 'delete' : 'post'](
        `http://localhost:5000/api/blogs/${blogId}/save`,
        {},
        { withCredentials: true }
      );
      
      setIsSaved(response.data.isSaved);
      setPost(prev => ({
        ...prev,
        savedBy: response.data.isSaved
          ? [...(prev.savedBy || []), user._id]
          : (prev.savedBy || []).filter(id => id !== user._id)
      }));
    } catch (err) {
      console.error('Error saving blog:', err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate('/signin');
      return;
    }

    try {
      setLikeLoading(true);
      const response = await axios.post(`http://localhost:5000/api/blogs/${blogId}/like`, {}, {
        withCredentials: true
      });
      
      setIsLiked(response.data.isLiked);
      setPost(prev => ({
        ...prev,
        likes: Array.isArray(prev.likes) 
          ? (response.data.isLiked 
              ? [...prev.likes, user._id]
              : prev.likes.filter(id => id !== user._id))
          : [user._id]
      }));
    } catch (err) {
      console.error('Error liking post:', err);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/signin');
      return;
    }

    if (!commentContent.trim()) return;

    try {
      setCommentLoading(true);
      const response = await axios.post(`http://localhost:5000/api/blogs/${blogId}/comment`, 
        { content: commentContent },
        { withCredentials: true }
      );
      
      setComments(prev => [...prev, response.data]);
      setCommentContent('');
    } catch (err) {
      console.error('Error posting comment:', err);
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-20 min-h-screen bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-bold text-center">Maqola topilmadi</h1>
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/blog')}
              className="text-blue-400 hover:text-blue-300"
            >
              Bloglar ro'yxatiga qaytish
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Category and Date */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-blue-500 rounded-full text-sm font-medium">
              {post.category || 'Uncategorized'}
            </span>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {Math.ceil((post.content?.length || 0) / 1000)} min o'qish
              </span>
              <span className="flex items-center gap-1">
                <User size={14} />
                {post.author?.name || 'Anonymous'}
              </span>
            </div>
          </div>
          {/* Title */}
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-2 mb-8">
              <Tag size={16} className="text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="text-sm text-gray-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6">
        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full rounded-xl"
            />
          </div>
        )}
        {/* Main Content */}
        <div 
          className="prose prose-lg prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Engagement Section */}
        <div className="flex items-center space-x-6 my-8 border-t border-b border-gray-800 py-4">
          <button 
            onClick={handleLike}
            disabled={likeLoading}
            className={`flex items-center space-x-2 ${
              isLiked ? 'text-blue-500' : 'text-gray-600'
            } hover:text-blue-500 transition-colors`}
          >
            <ThumbsUp className={`h-5 w-5 ${likeLoading ? 'animate-pulse' : ''}`} />
            <span>{post?.likes?.length || 0} Likes</span>
          </button>
          
          <button 
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
            onClick={() => document.getElementById('comment-input')?.focus()}
          >
            <MessageCircle className="h-5 w-5" />
            <span>{comments.length} Comments</span>
          </button>

          <button 
            onClick={() => handleSave()}
            disabled={!user || saveLoading}
            className={`flex items-center space-x-2 ${
              isSaved ? 'text-blue-500' : 'text-gray-600'
            } ${!user || saveLoading ? 'opacity-50 cursor-not-allowed' : ''} hover:text-blue-500 transition-colors`}
          >
            <Bookmark className={`h-5 w-5 ${saveLoading ? 'animate-pulse' : ''} ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? "Saqlangan" : "Saqlab qo'yish"}</span>
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-6">Izohlar</h3>
          
          {/* Comment Form */}
          {user ? (
            <form onSubmit={handleComment} className="mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                    {user.profilePicture ? (
                      <img
                        src={`http://localhost:5000${user.profilePicture}`}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-500">
                        <UserCircle2 size={24} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-grow">
                  <textarea
                    id="comment-input"
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Izohingizni yozing..."
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    rows="3"
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={commentLoading || !commentContent.trim()}
                      className={`px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2
                        ${commentLoading || !commentContent.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {commentLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Yuklanmoqda...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Yuborish
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="mb-8 p-6 bg-gray-800 rounded-xl text-center">
              <p className="text-gray-300 mb-4">
                Izoh qoldirish uchun avval tizimga kiring
              </p>
              <button
                onClick={() => navigate('/signin')}
                className="inline-flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <User className="h-4 w-4" />
                Kirish
              </button>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment._id} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                    {comment.author?.profilePicture ? (
                      <img
                        src={`http://localhost:5000${comment.author.profilePicture}`}
                        alt={comment.author.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-500">
                        <UserCircle2 size={24} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{comment.author?.name}</div>
                      <span className="text-sm text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-300">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}

            {comments.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                Hozircha izohlar yo'q. Birinchi bo'lib izoh qoldiring!
              </div>
            )}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Mail className="text-blue-400" />
            Yangiliklar xabarnomasi
          </h3>
          <p className="text-gray-300 mb-6">
            Eng so'nggi maqolalar va yangiliklar to'g'ridan-to'g'ri emailingizga boradi
          </p>
          <form className="flex gap-4">
            <input
              type="email"
              placeholder="Email manzilingiz"
              className="flex-grow px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <span>Obuna bo'lish</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
