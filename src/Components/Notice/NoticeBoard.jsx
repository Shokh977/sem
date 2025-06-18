import React, { useState } from 'react';
import { Clock, Pin, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample notices (later we'll fetch from an API/backend)
const initialNotices = [
  {
    id: 1,
    title: "Yangi TOPIK kursi boshlanmoqda!",
    content: "25-iyundan boshlab yangi TOPIK kursi ochiladi. Joylar cheklangan! Ro'yxatdan o'tish uchun shoshiling.",
    date: "2025-06-17",
    isPinned: true,
    type: "course",
    link: "/courses"
  },
  {
    id: 2,
    title: "O'quvchimiz katta yutuqqa erishdi!",
    content: "Nilufar Rahimova TOPIK imtihonidan 178 ball to'plab, Level 5 darajasini qo'lga kiritdi!",
    date: "2025-06-16",
    isPinned: true,
    type: "update",
    link: "/#success"
  },
  {
    id: 3,
    title: "Yozgi chegirmalar boshlandi",
    content: "Barcha kurslarga 30% chegirma. Faqat iyun oyi davomida! Batafsil ma'lumot blog sahifamizda.",
    date: "2025-06-15",
    isPinned: false,
    type: "promotion",
    link: "/blog"
  },
  {
    id: 4,
    title: "Online guruh darslari",
    content: "Zoom orqali guruh darslari boshlanmoqda. Qulay vaqt va hamyonbop narxlar.",
    date: "2025-06-14",
    isPinned: false,
    type: "event",
    link: "/courses"
  },
  {
    id: 5,
    title: "Seoul Universiteti granti!",
    content: "O'quvchimiz Jamshid Toshmatov Seoul Milliy Universitetidan to'liq grant yutib oldi!",
    date: "2025-06-13",
    isPinned: false,
    type: "update",
    link: "/#success"
  }
];


const NoticeItem = ({ notice, onClose }) => {
  const typeColors = {
    course: "bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20",
    update: "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20",
    promotion: "bg-purple-500/10 text-purple-500 border-purple-500/20 hover:bg-purple-500/20",
    event: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20",
    blog: "bg-pink-500/10 text-pink-500 border-pink-500/20 hover:bg-pink-500/20",
    default: "bg-gray-500/10 text-gray-500 border-gray-500/20 hover:bg-gray-500/20"
  };

  const typeIcons = {
    course: "🎓",
    update: "🔄",
    promotion: "🎉",
    event: "📅",
    blog: "📝",
    default: "📢"
  };

  const colorClass = typeColors[notice.type] || typeColors.default;
  const icon = typeIcons[notice.type] || typeIcons.default;

  return (
    <Link 
      to={notice.link} 
      className={`group block relative p-4 rounded-lg border ${colorClass} animate-fadeIn transition-all duration-300 hover:scale-[1.01] hover:shadow-lg`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 text-xl group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold group-hover:text-current transition-colors">
                {notice.title}
                {notice.isPinned && (
                  <Pin size={14} className="inline-block ml-2 transform -rotate-45" />
                )}
              </h3>
            </div>
            <p className="text-sm mt-1 text-gray-300 group-hover:text-current/80 transition-colors">
              {notice.content}
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
              <Clock size={12} />
              {new Date(notice.date).toLocaleDateString('uz-UZ')}
            </div>
          </div>
        </div>
        <button 
          onClick={(e) => {
            e.preventDefault(); 
            onClose(notice.id);
          }}
          className="text-gray-400 hover:text-gray-200 transition-colors absolute top-4 right-4 opacity-0 group-hover:opacity-100"
          aria-label="Close notice"
        >
          <X size={16} />
        </button>
      </div>
    </Link>
  );
};

export default function NoticeBoard() {
  const [notices, setNotices] = useState(initialNotices);
  const [closedNotices, setClosedNotices] = useState(new Set());
  const [selectedType, setSelectedType] = useState('all');

  const handleCloseNotice = (id) => {
    setClosedNotices(prev => new Set([...prev, id]));
  };

  const noticeTypes = [
    { id: 'all', label: 'Barchasi', emoji: '📢' },
    { id: 'course', label: 'Kurslar', emoji: '🎓' },
    { id: 'event', label: 'Tadbirlar', emoji: '📅' },
    { id: 'promotion', label: 'Aksiyalar', emoji: '🎉' },
    { id: 'blog', label: 'Blog', emoji: '📝' },
    { id: 'update', label: "Yangiliklar", emoji: '🔄' }
  ];

  const visibleNotices = notices.filter(notice => {
    const isNotClosed = !closedNotices.has(notice.id);
    const matchesType = selectedType === 'all' || notice.type === selectedType;
    return isNotClosed && matchesType;
  }).sort((a, b) => {
    // Sort by pinned status first, then by date
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date) - new Date(a.date);
  });

  if (visibleNotices.length === 0 && selectedType === 'all') return null;

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          <span className="text-blue-500">So'nggi</span> Yangiliklar
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Kurslar, tadbirlar va boshqa muhim yangiliklardan xabardor bo'lib turing
        </p>
      </div>

      {/* Notice Type Filter */}
      <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2">
        {noticeTypes.map(type => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedType === type.id
                ? 'bg-blue-500 text-white scale-105'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <span className="mr-2">{type.emoji}</span>
            {type.label}
          </button>
        ))}
      </div>

      {/* Notices */}
      <div className="space-y-4">
        {visibleNotices.map(notice => (
          <NoticeItem 
            key={notice.id} 
            notice={notice} 
            onClose={handleCloseNotice}
          />
        ))}
      </div>

      {/* Empty State */}
      {visibleNotices.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-gray-400 mb-2">
            Bu turkumda hozircha e'lonlar yo'q
          </h3>
          <p className="text-gray-500">
            Boshqa turkumni tanlang yoki keyinroq qaytib keling
          </p>
        </div>
      )}
    </div>
  );
}
