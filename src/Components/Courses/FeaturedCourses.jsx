import React, { useState, useEffect } from 'react';
import { Book, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from '../../config/axios';

const CourseCard = ({ course }) => {
  // Function to truncate description
  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="bg-gray-800/50 rounded-2xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300">
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
        <img 
          src={course.image || 'https://placehold.co/400x300/1a365d/ffffff?text=Course+Image'} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
        {course.level && (
          <div className="absolute bottom-4 left-4 z-20">
            <span className="px-3 py-1 bg-blue-500/90 backdrop-blur-sm rounded-full text-sm font-medium">
              {course.level}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
        <p className="text-gray-400 text-sm mb-4">
          {truncateDescription(course.description)}
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-400">
            <Clock size={16} className="text-blue-500" />
            <span className="text-sm">{course.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Book size={16} className="text-blue-500" />
            <span className="text-sm">{course.lessonsCount} darslar</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Users size={16} className="text-blue-500" />
            <span className="text-sm">{course.studentsCount}+ talaba</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Star size={16} className="text-yellow-500" />
            <span className="text-sm">{course.rating}</span>
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-400 text-sm">Narxi</span>
              <div className="text-xl font-bold text-blue-500">
                {course.price}
              </div>
            </div>
            <Link
              to={`/courses/${course._id}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors"
            >
              Batafsil
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FeaturedCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses/featured');
        setCourses(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Kurslarni yuklashda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-800/50 rounded-2xl h-[400px]"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center text-red-400">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <section id="courses" className="py-16 bg-gradient-to-b from-gray-800/50 to-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-blue-500">Mashxur</span> Kurslar
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Eng ko'p talab qilinadigan va yuqori natija ko'rsatgan kurslarimiz bilan tanishing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800/80 backdrop-blur border-2 border-blue-500/50 hover:border-blue-500 rounded-full text-blue-400 hover:text-blue-300 font-bold text-lg transition-all transform hover:scale-105"
          >
            Barcha kurslar
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
