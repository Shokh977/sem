import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Image, Send, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function BlogForm({ onSuccess }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    coverImage: '',
    isNotification: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/blogs', {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }, {
        withCredentials: true
      });

      if (onSuccess) {
        onSuccess(response.data);
      }
      navigate('/blog');
    } catch (error) {
      console.error('Error creating blog:', error);
      setError(error.response?.data?.message || 'Blog yaratishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Show image preview when URL is entered
    if (name === 'coverImage' && value) {
      setImagePreview(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg flex items-center gap-2 text-red-500">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Sarlavha
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
          placeholder="Blog sarlavhasini kiriting"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Qisqa mazmuni
        </label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          required
          rows="2"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
          placeholder="Blog haqida qisqacha ma'lumot"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Asosiy matn
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows="10"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
          placeholder="Blog matnini kiriting..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Teglar (vergul bilan ajrating)
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
          placeholder="misol: koreys tili, grammatika, o'rganish"
        />
      </div>

      {/* Cover Image URL Input */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Muqova rasmi (URL)
        </label>
        <div className="space-y-4">
          <input
            type="url"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
            placeholder="Rasm URL manzilini kiriting"
          />
          {imagePreview && (
            <div className="relative group">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
                onError={() => setImagePreview('')}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview('');
                    setFormData(prev => ({ ...prev, coverImage: '' }));
                  }}
                  className="text-white hover:text-red-500 transition-colors"
                >
                  O'chirish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="isNotification"
          id="isNotification"
          checked={formData.isNotification}
          onChange={handleChange}
          className="w-4 h-4 text-blue-500 border-gray-700 rounded focus:ring-blue-500 bg-gray-800"
        />
        <label htmlFor="isNotification" className="ml-2 text-sm text-gray-300">
          Bildirishnoma sifatida ko'rsatish
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 rounded-lg text-white font-medium transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Yuklanmoqda...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Yuborish
            </>
          )}
        </button>
      </div>
    </form>
  );
}
