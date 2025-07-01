import React, { useState, useEffect } from 'react';
import { Trophy, Star, GraduationCap, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from '../../config/axios';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const SuccessCard = ({ story }) => (
  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-[1.02]">
    <div className="flex items-start gap-4 h-full">
      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-500/30">
        <img
          src={story.image || 'https://placehold.co/100x100/1a365d/ffffff?text=👤'}
          alt={story.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-bold text-white mb-1">{story.name}</h3>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-blue-400">
            <Trophy size={16} className="text-yellow-500" />
            <span className="font-medium">{story.position}</span>
            <span className="text-gray-400">|</span>
            <span className="text-blue-400">{story.company}</span>
          </div>
          {story.social && Object.keys(story.social).length > 0 && (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              {story.social.linkedin && (
                <a href={story.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  LinkedIn
                </a>
              )}
              {story.social.github && (
                <a href={story.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  GitHub
                </a>
              )}
              {story.social.telegram && (
                <a href={story.social.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  Telegram
                </a>
              )}
              {story.social.instagram && (
                <a href={story.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  Instagram
                </a>
              )}
            </div>
          )}
        </div>
        <p className="text-gray-300 text-sm mt-2 flex-grow">{truncateText(story.review, 150)}</p>
        <div className="mt-2 text-xs text-gray-400">
          {new Date(story.createdAt).toLocaleDateString('uz-UZ')}
        </div>
      </div>
    </div>
  </div>
);

export default function SuccessStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/success/featured');
      setStories(response.data.slice(0, 3)); // Only get first 3 stories
      setError(null);
    } catch (err) {
      console.error('Error fetching success stories:', err);
      setError('Muvaffaqiyatli o\'quvchilar ma\'lumotlarini yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12">
        <div className="text-center text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl text-gray-50 font-bold mb-4">
          <span className="text-blue-500">Muvaffaqiyatli</span> O'quvchilar
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          O'quvchilarimizning erishgan yutuqlari va ularning muvaffaqiyat tarixi
        </p>
      </div>

      {stories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map(story => (
            <SuccessCard key={story._id} story={story} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400">
          Hozircha muvaffaqiyatli o'quvchilar ma'lumotlari mavjud emas
        </div>
      )}      {/* View More Button */}
      {stories.length > 0 && (
        <div className="text-center mt-8">
          <Link 
            to="/success-stories"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-medium transition-colors"
          >
            <GraduationCap size={20} />
            Ko'proq natijalar
          </Link>
        </div>
      )}
    </div>
  );
}
