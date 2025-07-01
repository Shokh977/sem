import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/tinymce';
import 'tinymce/themes/silver';
import 'tinymce/icons/default';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';
import { 
  Save,
  ArrowLeft,
  Bell,
  BellOff,
  Image as ImageIcon,
  Loader2 
} from 'lucide-react';

export default function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'other',
    tags: [],
    coverImage: '',
    isNotification: false,
    status: 'draft'
  });

  useEffect(() => {
    if (id) {
      fetchBlog();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/blogs/${id}`,
        { withCredentials: true }
      );
      setBlog(response.data);
    } catch (err) {
      console.error('Failed to fetch blog:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (id) {
        await axios.put(
          `http://localhost:5000/api/blogs/${id}`,
          blog,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          'http://localhost:5000/api/blogs',
          blog,
          { withCredentials: true }
        );
      }
      navigate('/admin');
    } catch (err) {
      console.error('Failed to save blog:', err);
      setSaving(false);
    }
  };

  const handleContentChange = (content) => {
    setBlog(prev => ({
      ...prev,
      content,
      // Generate excerpt from content if it's a new blog
      excerpt: !id ? content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : prev.excerpt
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/upload',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setBlog(prev => ({
        ...prev,
        coverImage: response.data.url
      }));
    } catch (err) {
      console.error('Failed to upload image:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <ArrowLeft size={20} />
            Orqaga
          </button>
          <h1 className="text-2xl font-bold">{id ? 'Blogni tahrirlash' : 'Yangi blog'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-gray-800 rounded-xl p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sarlavha
              </label>
              <input
                type="text"
                value={blog.title}
                onChange={e => setBlog(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Kategoriya
              </label>
              <select
                value={blog.category}
                onChange={e => setBlog(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="topik">TOPIK</option>
                <option value="learning">O'rganish</option>
                <option value="university">Universitet</option>
                <option value="culture">Madaniyat</option>
                <option value="tips">Maslahatlar</option>
                <option value="other">Boshqa</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Teglar (vergul bilan ajrating)
              </label>
              <input
                type="text"
                value={blog.tags.join(', ')}
                onChange={e => setBlog(prev => ({ 
                  ...prev, 
                  tags: e.target.value.split(',').map(tag => tag.trim()) 
                }))}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Muqova rasmi
              </label>
              <div className="space-y-4">
                {/* Image URL Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    URL orqali
                  </label>
                  <input
                    type="url"
                    value={blog.coverImage}
                    onChange={e => setBlog(prev => ({ ...prev, coverImage: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Rasm URL manzilini kiriting"
                  />
                </div>

                <div className="text-center text-gray-400">- yoki -</div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Faylni yuklash
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex-1">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      <div className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-400 hover:bg-gray-800 cursor-pointer flex items-center justify-center gap-2">
                        <ImageIcon size={20} />
                        Rasm tanlash
                      </div>
                    </label>
                  </div>
                </div>

                {/* Image Preview */}
                {blog.coverImage && (
                  <div className="relative group">
                    <img
                      src={blog.coverImage}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => e.target.src = 'https://placehold.co/600x400?text=Rasm+topilmadi'}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setBlog(prev => ({ ...prev, coverImage: '' }))}
                        className="text-white hover:text-red-500 transition-colors"
                      >
                        Rasmni o'chirish
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Qisqa mazmuni
              </label>
              <textarea
                value={blog.excerpt}
                onChange={e => setBlog(prev => ({ ...prev, excerpt: e.target.value }))}
                rows="3"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex items-center justify-between border-t border-gray-700 pt-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setBlog(prev => ({ ...prev, isNotification: !prev.isNotification }))}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    blog.isNotification
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-gray-900 text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {blog.isNotification ? <Bell size={20} /> : <BellOff size={20} />}
                  {blog.isNotification ? 'Bildirishnoma' : 'Oddiy post'}
                </button>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 rounded-lg text-white font-medium transition-colors"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saqlanmoqda...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Saqlash
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Editor */}
          <div className="bg-gray-800 rounded-xl p-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Kontent
            </label>            <Editor
              value={blog.content}
              onEditorChange={handleContentChange}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 14px; }',
                base_url: '/tinymce',
                suffix: '.min'
              }}
            />
          </div>

          {/* Publishing Options */}
          <div className="bg-gray-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="notification"
                  checked={blog.isNotification}
                  onChange={e => setBlog(prev => ({ ...prev, isNotification: e.target.checked }))}
                  className="w-4 h-4 text-blue-500 border-gray-700 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                />
                <label htmlFor="notification" className="text-sm font-medium text-gray-300">
                  Bildirishnoma sifatida ko'rsatish
                </label>
              </div>
              {blog.isNotification ? (
                <Bell size={20} className="text-blue-400" />
              ) : (
                <BellOff size={20} className="text-gray-400" />
              )}
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setBlog(prev => ({ ...prev, status: 'draft' }))}
                className={`px-4 py-2 rounded-lg ${
                  blog.status === 'draft'
                    ? 'bg-yellow-500/10 text-yellow-400'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Qoralama
              </button>
              <button
                type="submit"
                onClick={() => setBlog(prev => ({ ...prev, status: 'published' }))}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  blog.status === 'published'
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save size={20} />
                )}
                Chop etish
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
