import React, { useState } from 'react';
import { 
  Book, 
  Clock, 
  Users, 
  Star,
  Search,
  Sparkles,
  BookOpen,
  GraduationCap,
  MessageCircle,
  Filter,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const courses = [
  {
    id: 'topik1',
    title: 'TOPIK 1 Tayyorgarlik',
    level: 'Boshlang\'ich',
    duration: '3 oy',
    students: 120,
    rating: 4.9,
    price: '699,000',
    image: '/course-topik.jpg',
    category: 'TOPIK',
    features: ['Individual darslar', 'Amaliy mashqlar', 'Mock testlar'],
    description: 'TOPIK 1 imtihoniga to\'liq tayyorgarlik kursi. Grammatika, so\'z boyligi va test ishlash strategiyalari.',
    lessons: 36
  },
  {
    id: 'basic-korean',
    title: 'Koreys tili boshlang\'ich',
    level: 'Boshlang\'ich',
    duration: '4 oy',
    students: 200,
    rating: 4.8,
    price: '499,000',
    image: '/course-basic.jpg',
    category: 'General',
    features: ['Guruh darslari', 'Audio materiallar', 'Uy vazifalar'],
    description: 'Koreys tilini noldan o\'rganish uchun ideal kurs. Hangul, talaffuz va asosiy grammatika.',
    lessons: 48
  },
  {
    id: 3,
    title: 'Muloqot darslari',
    level: 'O\'rta',
    duration: '2 oy',
    students: 80,
    rating: 4.9,
    price: '699,000',
    image: '/course-speaking.jpg',
    category: 'Speaking',
    features: ['Jonli muloqot', 'Situatsion dialoglar', 'Talaffuz mashqlari'],
    description: 'Koreyslar bilan erkin muloqot qilishni o\'rganish uchun maxsus kurs.'
  },
  // Add more courses as needed
];

const CourseCard = ({ course }) => (
  <div className="bg-gray-800/50 rounded-2xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300">
    <div className="h-48 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
      <img 
        src={course.image || 'https://placehold.co/400x300/1a365d/ffffff?text=Course+Image'} 
        alt={course.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-4 left-4 z-20">
        <span className="px-3 py-1 bg-blue-500/90 backdrop-blur-sm rounded-full text-sm font-medium">
          {course.category}
        </span>
      </div>
    </div>
    
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
      <p className="text-gray-400 text-sm mb-4">{course.description}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2 text-gray-400">
          <Clock size={16} />
          <span className="text-sm">{course.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Users size={16} />
          <span className="text-sm">{course.students} o'quvchi</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <BookOpen size={16} />
          <span className="text-sm">{course.level}</span>
        </div>
        <div className="flex items-center gap-2 text-yellow-500">
          <Star size={16} className="fill-current" />
          <span className="text-sm">{course.rating}</span>
        </div>
      </div>

      <ul className="space-y-2 mb-6">
        {course.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-400 text-sm">
            <Sparkles size={14} className="text-blue-500" />
            {feature}
          </li>
        ))}
      </ul>      <div className="flex items-center justify-between">
        <div className="text-white">
          <span className="text-sm text-gray-400">Oyiga</span>
          <div className="text-xl font-bold">{course.price} so'm</div>
        </div>
        <Link 
          to={`/courses/${course.id}`}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-medium transition-colors inline-flex items-center gap-2"
        >
          Batafsil
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </div>
);

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Barchasi' },
    { id: 'TOPIK', label: 'TOPIK' },
    { id: 'General', label: 'Umumiy' },
    { id: 'Speaking', label: 'Muloqot' }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-20 min-h-screen bg-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-blue-600/10 to-transparent py-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6">
            <span className="text-blue-500">Bizning</span> kurslar
          </h1>
          <p className="text-gray-400 text-center max-w-2xl mx-auto text-lg">
            Professional koreys tili o'qituvchisidan sifatli va natijali kurslar
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-8">
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Kurslarni qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-4">
            <Filter size={20} className="text-gray-400" />
            <div className="flex gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">Kurslar topilmadi</h3>
            <p className="text-gray-500">Boshqa kalit so'z bilan qidirib ko'ring</p>
          </div>
        )}
      </div>
    </div>
  );
}
