import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Bell,
  BellOff,
  CheckCircle2,
  XCircle,
  Loader2,
  Eye,
  EyeOff,
  RefreshCcw,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchBlogs();
  }, [categoryFilter, statusFilter]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/blogs?category=${categoryFilter}&status=${statusFilter}`,
        { withCredentials: true }
      );
      setBlogs(response.data);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/blogs/${id}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      fetchBlogs();
    } catch (err) {
      console.error('Failed to update blog status:', err);
    }
  };

  const handleNotificationToggle = async (id, isNotification) => {
    try {
      await axios.put(
        `http://localhost:5000/api/blogs/${id}/notification`,
        { isNotification: !isNotification },
        { withCredentials: true }
      );
      fetchBlogs();
    } catch (err) {
      console.error('Failed to toggle notification:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Ushbu blogni o'chirmoqchimisiz?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/blogs/${id}`,
          { withCredentials: true }
        );
        fetchBlogs();
      } catch (err) {
        console.error('Failed to delete blog:', err);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Blog boshqaruvi</h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20"
          onClick={() => window.location.href = '/admin/blogs/new'}
        >
          <Plus size={20} />
          Yangi blog
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Barcha kategoriyalar</option>
          <option value="programming">Dasturlash</option>
          <option value="education">Ta'lim</option>
          <option value="technology">Texnologiya</option>
          <option value="other">Boshqa</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Barcha statuslar</option>
          <option value="draft">Qoralama</option>
          <option value="published">Chop etilgan</option>
          <option value="archived">Arxivlangan</option>
        </select>

        <button
          onClick={fetchBlogs}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700"
        >
          <RefreshCcw size={20} />
          Yangilash
        </button>
      </div>

      {/* Blog List */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="grid gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-gray-800/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{blog.title}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleNotificationToggle(blog._id, blog.isNotification)}
                    className={`p-2 rounded-lg ${
                      blog.isNotification
                        ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    title={blog.isNotification ? "Bildirishnomani o'chirish" : "Bildirishnoma qo'shish"}
                  >
                    {blog.isNotification ? <Bell size={20} /> : <BellOff size={20} />}
                  </button>
                  <button
                    onClick={() => window.location.href = `/admin/blogs/edit/${blog._id}`}
                    className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20"
                    title="Tahrirlash"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
                    title="O'chirish"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-sm bg-blue-500/10 text-blue-400">
                  {blog.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  blog.status === 'published'
                    ? 'bg-green-500/10 text-green-400'
                    : blog.status === 'draft'
                    ? 'bg-yellow-500/10 text-yellow-400'
                    : 'bg-gray-500/10 text-gray-400'
                }`}>
                  {blog.status === 'published'
                    ? 'Chop etilgan'
                    : blog.status === 'draft'
                    ? 'Qoralama'
                    : 'Arxivlangan'}
                </span>
                <span className="text-sm text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-gray-300 line-clamp-2 mb-4">{blog.description}</p>

              <div className="flex gap-2">
                {blog.status !== 'published' && (
                  <button
                    onClick={() => handleStatusChange(blog._id, 'published')}
                    className="px-4 py-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20"
                  >
                    Chop etish
                  </button>
                )}
                {blog.status !== 'draft' && (
                  <button
                    onClick={() => handleStatusChange(blog._id, 'draft')}
                    className="px-4 py-2 bg-yellow-500/10 text-yellow-400 rounded-lg hover:bg-yellow-500/20"
                  >
                    Qoralamaga o{"'"}tkazish
                  </button>
                )}
                {blog.status !== 'archived' && (
                  <button
                    onClick={() => handleStatusChange(blog._id, 'archived')}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
                  >
                    Arxivlash
                  </button>
                )}
              </div>
            </div>
          ))}

          {blogs.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <AlertCircle className="w-12 h-12 mx-auto mb-4" />
              <p>Hech qanday blog topilmadi</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
