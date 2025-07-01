import React, { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function ContactModal({ isOpen, onClose, type }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    university: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name || !formData.phone) {
      setError("Iltimos, ism va telefon raqamingizni kiriting");
      setIsSubmitting(false);
      return;
    }

    try {
      // Send to backend API
      await axios.post('http://localhost:5000/api/inquiries', {
        ...formData,
        type
      }, {
        withCredentials: true
      });
      
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({ name: '', phone: '', university: '', message: '' });
      }, 2000);
    } catch (err) {
      setError("Xatolik yuz berdi. Iltimos qayta urinib ko'ring");
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    setError('');
  };

  const title = type === 'trial' 
    ? "Bepul sinov darsiga yozilish"
    : "Konsultatsiya olish";
  
  const description = type === 'trial'
    ? "Sinov darsida ishtirok etish uchun ma'lumotlaringizni qoldiring"
    : "Koreada o'qish bo'yicha bepul konsultatsiya olish uchun ma'lumotlaringizni qoldiring";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-gray-800 rounded-xl w-full max-w-lg p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-400 mb-6">{description}</p>        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
              Muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.
            </div>
          )}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Ismingiz
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="To'liq ismingiz"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
              Telefon raqamingiz
            </label>
            <input              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="+998 90 123 45 67"
              required
              disabled={isSubmitting}
            />
          </div>

          {type === 'consultation' && (
            <div>
              <label htmlFor="university" className="block text-sm font-medium text-gray-300 mb-1">
                Qiziqqan universitetingiz
              </label>
              <input              type="text"
              id="university"
              value={formData.university}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="Universitet nomi"
              disabled={isSubmitting}
            />
            </div>
          )}

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              Xabaringiz
            </label>
            <textarea              id="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder={type === 'trial' 
                ? "Qo'shimcha savol va istaklar" 
                : "O'qish bo'yicha savollaringiz"}
              disabled={isSubmitting}
            ></textarea>
          </div>          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 bg-blue-500 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Yuborilmoqda...
              </>
            ) : (
              <>
                <Send size={20} />
                Yuborish
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
