import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  PenTool, 
  Languages, 
  Brain, 
  ScrollText, 
  LightbulbIcon, 
  BookOpenCheck,
  Trophy
} from 'lucide-react';

const FloatingIcon = ({ Icon, className }) => (
  <div className={`absolute animate-float opacity-15 ${className}`}>
    <Icon size={40} strokeWidth={1.25} />
  </div>
);

export default function Hero() {
  const navigate = useNavigate();

  const scrollToCourses = () => {
    const coursesSection = document.getElementById('courses');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/courses');
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-blue-100 min-h-screen flex flex-col justify-center px-8 sm:px-12 lg:px-24 relative overflow-hidden">
      {/* Floating Icons with wider positioning */}
      <FloatingIcon Icon={GraduationCap} className="top-[10%] left-[5%]" />
      <FloatingIcon Icon={BookOpen} className="top-[20%] right-[8%]" />
      <FloatingIcon Icon={PenTool} className="bottom-[15%] left-[12%]" />
      <FloatingIcon Icon={Languages} className="top-[40%] right-[15%]" />
      <FloatingIcon Icon={Brain} className="bottom-[30%] right-[7%]" />
      <FloatingIcon Icon={ScrollText} className="top-[60%] left-[8%]" />
      <FloatingIcon Icon={LightbulbIcon} className="bottom-[20%] right-[20%]" />
      <FloatingIcon Icon={BookOpenCheck} className="top-[25%] left-[18%]" />
      <FloatingIcon Icon={Trophy} className="bottom-[40%] left-[15%]" />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto text-center relative">
        {/* Decorative circle behind the content */}
        <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full transform -translate-y-1/4"></div>

        <div className="relative">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Til o'rganish biz bilan onson!
          </h1>
          
          <p className="text-blue-300 text-xl sm:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
            TOPIK kerakmi? <span className="text-blue-400 font-semibold">Koreys Tilida</span> erkin gapirishni hohlaysizmi? 
            <span className="block mt-2 text-blue-400 font-semibold">Bizda</span> siz uchun eng yaxshi kurslar mavjud.
          </p>          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={scrollToCourses}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full text-white font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
            >
              Kurs haqida
            </button>
            <Link
              to="/signup"
              className="px-8 py-4 bg-gray-800/80 backdrop-blur border-2 border-blue-500/50 hover:border-blue-500 rounded-full text-blue-400 hover:text-blue-300 font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              Ro'yxatdan o'tish
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
