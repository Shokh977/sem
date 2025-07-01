import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  Target, 
  BookOpen, 
  Calendar,
  CheckCircle2,
  GraduationCap,
  BarChart,
  MessageCircle,
  FileCheck,
  Star,
  Send,
  X,
  Loader2
} from 'lucide-react';
import axios from '../../config/axios';
import { useAuth } from '../../context/AuthContext';

// Contact Modal Component
function ContactModal({ isOpen, onClose, course }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post('/api/inquiries', {
        ...formData,
        type: 'enrollment',
        courseId: course._id
      });
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setSubmitStatus(null);
        setFormData({ name: '', phone: '', message: '' });
      }, 2000);
    } catch (err) {
      console.error('Failed to submit form:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 max-w-lg w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Kursga yozilish</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {submitStatus === 'success' ? (
          <div className="text-center py-8">
            <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
            <p className="text-gray-300">So'rovingiz yuborildi! Tez orada siz bilan bog'lanamiz.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="+998 90 123 45 67"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Xabar (ixtiyoriy)
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Qo'shimcha ma'lumotlar..."
                rows={3}
                disabled={isSubmitting}
              />
            </div>

            {submitStatus === 'error' && (
              <p className="text-red-400 text-sm">
                Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 rounded-lg text-white font-medium transition-colors"
            >
              {isSubmitting ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <Send size={20} />
                  Yuborish
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

 const CourseDetail = () => {
  const { courseId } = useParams();  // Changed from id to courseId to match the route
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentForm, setCommentForm] = useState({ comment: '', rating: 5 });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    } else {
      setError("Kurs ID'si topilmadi");
      setLoading(false);
    }
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`/api/courses/${courseId}`);
      
      if (!response.data) {
        setError("Kurs topilmadi");
        return;
      }
      
      setCourse(response.data);
    } catch (err) {
      console.error("Error fetching course:", err);
      if (err.response?.status === 404) {
        setError("Kurs topilmadi");
      } else if (err.response?.status === 400) {
        setError("Noto'g'ri kurs ID'si");
      } else {
        setError(err.response?.data?.message || "Kursni yuklashda xatolik yuz berdi");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      // Redirect to login if user is not authenticated
      navigate('/login', { state: { from: `/courses/${courseId}` } });
      return;
    }

    try {
      const response = await axios.post(`/api/courses/${courseId}/enroll`);
      alert(response.data.message);
      fetchCourse(); // Refresh course data
    } catch (err) {
      alert(err.response?.data?.message || 'Kursga yozilishda xatolik');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: `/courses/${courseId}` } });
      return;
    }

    try {
      setSubmitting(true);
      await axios.post(`/api/courses/${courseId}/comments`, commentForm);
      setCommentForm({ comment: '', rating: 5 });
      fetchCourse(); // Refresh course data
    } catch (err) {
      alert('Izoh qo\'shishda xatolik');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
  </div>;

  if (error) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
    {error}
  </div>;

  if (!course) return null;

  return (
    <div className="pt-20 min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Course Info */}
            <div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-gray-300 mb-6">{course.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock size={20} className="text-blue-500" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Users size={20} className="text-blue-500" />
                  <span>{course.studentsCount}+ o'quvchilar</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Target size={20} className="text-blue-500" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <BookOpen size={20} className="text-blue-500" />
                  <span>{course.lessonsCount} darslar</span>
                </div>
              </div>              <div className="flex gap-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors flex items-center gap-2"
                >
                  <GraduationCap size={20} />
                  Kursga yozilish
                </button>
                <button className="px-6 py-3 border border-blue-500 hover:bg-blue-500/10 rounded-xl transition-colors flex items-center gap-2">
                  <MessageCircle size={20} />
                  Savol berish
                </button>
              </div>
            </div>
              {/* Course Image/Video */}
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-800">
              {/* Rating Badge */}
              {course.rating && (
                <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="text-yellow-400" size={16} />
                  <span>{course.rating.toFixed(1)}</span>
                </div>
              )}

              {course.image ? (
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen size={48} className="text-gray-600" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Course Features */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Kurs dasturi</h2>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 size={20} className="text-blue-500 mt-1 shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Learning Outcomes */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Kurs yakunida</h2>
              <div className="bg-gray-800/50 rounded-xl p-6">
                <div className="space-y-4">
                  {course.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Target size={20} className="text-blue-500 mt-1 shrink-0" />
                      <span className="text-gray-300">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info Card */}
            <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                <span className="text-gray-300">Davomiyligi</span>
                <span className="font-semibold">{course.duration}</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                <span className="text-gray-300">Darslar soni</span>
                <span className="font-semibold">{course.lessonsCount} ta</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                <span className="text-gray-300">Jadval</span>
                <span className="font-semibold">{course.schedule}</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                <span className="text-gray-300">O'qituvchi</span>
                <span className="font-semibold">{course.instructor}</span>
              </div>
              <div className="flex items-center justify-between pb-4">
                <span className="text-gray-300">Narxi</span>
                <span className="text-2xl font-bold text-blue-500">{course.price}</span>
              </div>              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors flex items-center justify-center gap-2">
                <GraduationCap size={20} />
                Kursga yozilish
              </button>
            </div>

            {/* Course Stats */}
            <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <BarChart size={20} className="text-blue-500" />
                <span className="font-semibold">Kurs statistikasi</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                <span className="text-gray-300">O'quvchilar</span>
                <span className="font-semibold">{course.studentsCount}+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Reyting</span>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{course.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Rating and Comments Section */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">Izohlar va Baholar</h2>
        
        {/* Rating Statistics */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl font-bold text-white">{course.rating.toFixed(1)}</div>
            <div>
              <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={20} fill={i < Math.round(course.rating)} />
                ))}
              </div>
              <div className="text-gray-400 text-sm">{course.totalRatings} ta baho</div>
            </div>
          </div>
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handleCommentSubmit} className="bg-gray-800/50 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Izoh qoldiring</h3>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Baholang</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setCommentForm(prev => ({ ...prev, rating: num }))}
                  className="focus:outline-none"
                >
                  <Star
                    size={24}
                    className={num <= commentForm.rating ? 'text-yellow-500' : 'text-gray-600'}
                    fill={num <= commentForm.rating ? 'currentColor' : 'none'}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Izohingiz</label>
            <textarea
              value={commentForm.comment}
              onChange={(e) => setCommentForm(prev => ({ ...prev, comment: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Kurs haqida fikringizni yozing..."
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send size={16} />}
            Yuborish
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {course.comments?.map((comment, index) => (
            <div key={index} className="bg-gray-800/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-medium text-white">{comment.user.name}</div>
                  <div className="text-sm text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill={i < comment.rating} />
                  ))}
                </div>
              </div>
              <p className="text-gray-300">{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Course Enrollment Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800/95 backdrop-blur-sm border-t border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-400">Kurs narxi</div>
            <div className="text-2xl font-bold text-white">{course.price?.toLocaleString()} so'm</div>
          </div>          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-medium transition-colors"
          >
            Kursga yozilish
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} course={course} />
    </div>
  )
}
export default CourseDetail;
