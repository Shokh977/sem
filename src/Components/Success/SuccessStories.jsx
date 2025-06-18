import React from 'react';
import { Trophy, Star, GraduationCap } from 'lucide-react';

const successStories = [
  {
    id: 1,
    name: "Aziza Karimova",
    achievement: "TOPIK Level 6",
    score: "190/200",
    story: "3 oylik kursdan so'ng TOPIK 6 darajasini qo'lga kiritdim!",
    image: "/students/student1.jpg",
    date: "2025-05",
  },
  {
    id: 2,
    name: "Jamshid Toshmatov",
    achievement: "Janubiy Koreya Universiteti",
    score: "To'liq grant",
    story: "Seoul Milliy Universitetidan to'liq grant yutib oldim.",
    image: "/students/student2.jpg",
    date: "2025-04",
  },
  {
    id: 3,
    name: "Nilufar Rahimova",
    achievement: "TOPIK Level 5",
    score: "178/200",
    story: "2 oyda TOPIK 5 darajasiga erishdim. Rahmat ustoz!",
    image: "/students/student3.jpg",
    date: "2025-06",
  }
];

const SuccessCard = ({ story }) => (
  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-[1.02]">
    <div className="flex items-start gap-4">
      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-500/30">
        <img
          src={story.image || 'https://placehold.co/100x100/1a365d/ffffff?text=👤'}
          alt={story.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-1">{story.name}</h3>
        <div className="flex items-center gap-2 text-blue-400 mb-2">
          <Trophy size={16} className="text-yellow-500" />
          <span className="font-medium">{story.achievement}</span>
          <Star size={16} className="text-yellow-500 ml-2" />
          <span className="text-green-400">{story.score}</span>
        </div>
        <p className="text-gray-300 text-sm">{story.story}</p>
        <div className="mt-2 text-xs text-gray-400">
          {story.date}
        </div>
      </div>
    </div>
  </div>
);

export default function SuccessStories() {
  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          <span className="text-blue-500">Muvaffaqiyatli</span> O'quvchilar
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          O'quvchilarimizning erishgan yutuqlari va ularning muvaffaqiyat tarixi
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {successStories.map(story => (
          <SuccessCard key={story.id} story={story} />
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-8">
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-medium transition-colors">
          <GraduationCap size={20} />
          Ko'proq natijalar
        </button>
      </div>
    </div>
  );
}
