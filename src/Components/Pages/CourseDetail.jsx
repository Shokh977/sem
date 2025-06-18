import React from 'react';
import { useParams } from 'react-router-dom';
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
  Star 
} from 'lucide-react';

// Mock course data - replace with actual data from your backend
const courseData = {
  topik1: {
    title: "TOPIK 1 Tayyorgarlik Kursi",
    description: "TOPIK 1 darajasi uchun to'liq tayyorgarlik kursi. Grammatika, so'z boyligi va test strategiyalarini o'z ichiga oladi.",
    level: "Boshlang'ich",
    duration: "3 oy",
    lessonsCount: 36,
    studentsCount: 150,
    rating: 4.9,
    features: [
      "Grammatika asoslari",
      "Kundalik muloqot uchun so'z boyligi",
      "TOPIK 1 test namunalari",
      "Audio tinglab tushunish",
      "O'qish ko'nikmalari",
      "Yozma mashqlar"
    ],
    outcomes: [
      "TOPIK 1 imtihonidan 120+ ball olish",
      "Kundalik vaziyatlarda muloqot qila olish",
      "500+ eng ko'p ishlatiladigan so'zlarni o'zlashtirish",
      "Asosiy grammatika qoidalarini bilish"
    ],
    schedule: "Haftada 3 marta (2 soatdan)",
    price: "699,000 so'm/oy",
    instructor: "Shoxrux 쌤",
    image: "/path/to/topik1-image.jpg"
  },
  // Add more courses as needed
};

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = courseData[courseId];

  if (!course) {
    return (
      <div className="pt-20 min-h-screen bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-bold text-center">Kurs topilmadi</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-900 text-white">
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
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors flex items-center gap-2">
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
              </div>
              <button className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors flex items-center justify-center gap-2">
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
    </div>
  );
}
