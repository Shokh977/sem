import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  BookOpen, 
  Star, 
  Clock, 
  Settings, 
  Camera, 
  Edit, 
  Save, 
  X, 
  Loader2,
  Check,
  AlertCircle
} from 'lucide-react';
import axios from '../../config/axios';

export default function Portfolio() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(user?.name || '');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setName(user?.name || '');
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch saved blogs
      const blogsRes = await axios.get('/api/blogs/saved');
      setSavedBlogs(blogsRes.data);

      // Fetch user messages
      const messagesRes = await axios.get('/api/inquiries/user');
      setMessages(messagesRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Ma\'lumotlarni yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Rasm hajmi 5MB dan kichik bo'lishi kerak");
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setError('Faqat rasm fayllarini yuklash mumkin');
        return;
      }

      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const formData = new FormData();
      if (name !== user.name) {
        formData.append('name', name);
      }
      if (image) {
        formData.append('profilePicture', image);
      }

      const response = await axios.put('/api/profile/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        updateUser({
          ...user,
          name: response.data.data.name,
          profilePicture: response.data.data.profilePicture
        });
        setSuccessMessage('Profil muvaffaqiyatli yangilandi');
        setIsEditing(false);
        setImage(null);
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
          setImagePreview(null);
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Profilni yangilashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(user?.name || '');
    setImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 p-4 bg-red-900/50 border border-red-500 rounded-lg flex items-center gap-2 text-red-200">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 bg-green-900/50 border border-green-500 rounded-lg flex items-center gap-2 text-green-200">
            <Check size={20} />
            {successMessage}
          </div>
        )}

        {/* Main Content Area */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 md:p-8 border-b border-gray-700">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Profile Image */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <img
                    src={imagePreview || user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.name}&background=1e3a8a&color=fff`}
                    alt={user?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer">
                    <Camera className="w-8 h-8 text-white" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="space-y-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-700 text-white text-2xl font-bold px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
                      placeholder="Ismingizni kiriting"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
                  )}
                  <p className="text-gray-400">{user?.email}</p>
                  {user?.role === 'admin' && (
                    <div className="inline-flex items-center bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                      <Settings size={16} className="mr-2" />
                      Admin
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 rounded-lg text-white font-medium transition-colors"
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        ) : (
                          <Save className="w-5 h-5 mr-2" />
                        )}
                        Saqlash
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={loading}
                        className="inline-flex items-center px-4 py-2 border border-gray-600 hover:border-gray-500 rounded-lg text-gray-300 font-medium transition-colors"
                      >
                        <X className="w-5 h-5 mr-2" />
                        Bekor qilish
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors"
                    >
                      <Edit className="w-5 h-5 mr-2" />
                      Profilni tahrirlash
                    </button>
                  )}
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="inline-flex items-center px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg text-blue-400 font-medium transition-colors"
                    >
                      <Settings className="w-5 h-5 mr-2" />
                      Admin panel
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-700">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <User className="w-5 h-5 inline-block mr-2" />
                Profil
              </button>
              <button
                onClick={() => setActiveTab('blogs')}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'blogs'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <BookOpen className="w-5 h-5 inline-block mr-2" />
                Saqlangan Bloglar
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'messages'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <MessageCircle className="w-5 h-5 inline-block mr-2" />
                Xabarlar
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              </div>
            ) : (
              <>
                {/* Saved Blogs Tab */}
                {activeTab === 'blogs' && (
                  <div className="space-y-6">
                    {savedBlogs.length === 0 ? (
                      <div className="text-center py-12">
                        <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-400 mb-2">Saqlangan bloglar yo'q</h3>
                        <p className="text-gray-500">Hozircha hech qanday blog saqlanmagan</p>
                      </div>
                    ) : (
                      savedBlogs.map(blog => (
                        <div key={blog._id} className="bg-gray-800/30 rounded-xl p-4 hover:bg-gray-800/50 transition-colors">
                          <div className="flex gap-4">
                            {blog.coverImage && (
                              <img
                                src={blog.coverImage}
                                alt={blog.title}
                                className="w-24 h-24 object-cover rounded-lg shrink-0"
                              />
                            )}
                            <div className="flex-1">
                              <Link
                                to={`/blog/${blog._id}`}
                                className="text-xl font-semibold text-white hover:text-blue-400 transition-colors"
                              >
                                {blog.title}
                              </Link>
                              <p className="text-gray-400 mt-2 line-clamp-2">{blog.excerpt}</p>
                              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {new Date(blog.createdAt).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="w-4 h-4" />
                                  {blog.likes} likes
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Messages Tab */}
                {activeTab === 'messages' && (
                  <div className="space-y-6">
                    {messages.length === 0 ? (
                      <div className="text-center py-12">
                        <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-400 mb-2">Xabarlar yo'q</h3>
                        <p className="text-gray-500">Hozircha hech qanday xabar yo'q</p>
                      </div>
                    ) : (
                      messages.map(message => (
                        <div key={message._id} className="bg-gray-800/30 rounded-xl p-4 hover:bg-gray-800/50 transition-colors">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg font-semibold text-white">
                              {message.type === 'trial' ? 'Sinov darsi' : 'Konsultatsiya'}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs ${
                              message.status === 'pending'
                                ? 'bg-yellow-500/20 text-yellow-300'
                                : message.status === 'approved'
                                ? 'bg-green-500/20 text-green-300'
                                : 'bg-red-500/20 text-red-300'
                            }`}>
                              {message.status === 'pending'
                                ? 'Kutilmoqda'
                                : message.status === 'approved'
                                ? 'Tasdiqlandi'
                                : 'Rad etildi'}
                            </span>
                          </div>
                          <p className="text-gray-300">{message.message}</p>
                          <div className="mt-3 text-sm text-gray-500 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {new Date(message.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
