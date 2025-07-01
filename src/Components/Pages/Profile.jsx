import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Camera, Loader2, User, Check } from 'lucide-react';
import axios from '../../config/axios';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const formData = new FormData();
      if (name !== user.name) {
        formData.append('name', name);
      }
      if (image) {
        formData.append('profilePicture', image);
      }      const response = await axios.put('/api/profile/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        updateUser(response.data.user);
        setSuccessMessage("Profil muvaffaqiyatli yangilandi");
        // Clear the image preview and file
        setImage(null);
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
          setImagePreview(null);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Profilni yangilashda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Profil sozlamalari</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700">
                  <img
                    src={imagePreview || user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.name}`}
                    alt={user?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <label
                  htmlFor="profilePicture"
                  className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
                >
                  <Camera size={20} className="text-white" />
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-gray-400">
                Ruxsat etilgan formatlar: JPG, PNG. Maksimal hajm: 5MB
              </p>
            </div>

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">
                Ismingiz
              </label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Ismingizni kiriting"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500 rounded-lg p-3">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-500/10 border border-green-500 rounded-lg p-3 flex items-center gap-2">
                <Check size={20} className="text-green-500" />
                <p className="text-sm text-green-500">{successMessage}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || (!image && name === user?.name)}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-medium transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Yuklanmoqda...
                </>
              ) : (
                'Saqlash'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
