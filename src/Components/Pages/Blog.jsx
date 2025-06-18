import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ChevronRight, 
  Search, 
  TrendingUp,
  Bookmark,
  Share2,
  ThumbsUp,
  MessageCircle,
  Globe,
  Newspaper,
  GraduationCap,
  School,
  Sparkles,
  PenTool,
  Mail,
  ArrowRight,
  Filter
} from 'lucide-react';

// Sample blog data (later we can fetch this from an API)
const blogPosts = [
  {
    id: 1,
    title: "TOPIK imtihoniga tayyorgarlik bo'yicha muhim maslahatlar",
    excerpt: "TOPIK imtihonida yuqori ball olish uchun qanday tayyorgarlik ko'rish kerak? Bugun biz eng muhim maslahatlarni ulashamiz...",
    category: "TOPIK",
    author: "Shoxrux 쌤",
    date: "2025-06-18",
    readTime: "5 min",
    image: "/blog/topik-tips.jpg",
    tags: ["TOPIK", "Imtihon", "Maslahatlar"],
    views: 1250,
    likes: 89,
    comments: 23
  },
  {
    id: 2,
    title: "Koreys tilini o'rganishning eng samarali usullari",
    excerpt: "Koreys tilini mustaqil o'rganish uchun foydali materiallar va samarali metodlar haqida batafsil ma'lumot...",
    category: "O'rganish",
    author: "Shoxrux 쌤",
    date: "2025-06-17",
    readTime: "7 min",
    image: "/blog/korean-study.jpg",
    tags: ["Koreys tili", "O'rganish", "Metodika"],
    views: 980,
    likes: 76,
    comments: 15
  },
  // Add more blog posts...
];

const trendingTopics = [
  "TOPIK 2025 Yangiliklari",
  "Koreya Universitetlari",
  "Online Ta'lim",
  "Grammar Tips",
  "Speaking Practice"
];

const categories = [
  { id: "all", label: "Barchasi", icon: Newspaper },
  { id: "topik", label: "TOPIK", icon: GraduationCap },
  { id: "learning", label: "O'rganish", icon: PenTool },
  { id: "university", label: "Universitet", icon: School },
  { id: "culture", label: "Madaniyat", icon: Globe },
  { id: "tips", label: "Maslahatlar", icon: Sparkles }
];

const NewsCard = ({ post, size = "normal" }) => (
  <article className={`group cursor-pointer ${
    size === "large" ? "grid md:grid-cols-2 gap-6" : "flex flex-col"
  }`}>
    <div className={`overflow-hidden rounded-xl ${
      size === "large" ? "h-full" : "h-48 md:h-56"
    }`}>
      <img 
        src={post.image || 'https://placehold.co/800x400/1a365d/ffffff?text=News'} 
        alt={post.title}
        className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
      />
    </div>
    
    <div className="flex-1 py-4">
      <div className="flex items-center gap-3 mb-3">
        <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-medium">
          {post.category}
        </span>
        <span className="text-gray-400 text-sm flex items-center gap-1">
          <Clock size={14} />
          {post.readTime}
        </span>
      </div>

      <h3 className={`${
        size === "large" ? "text-2xl md:text-3xl" : "text-lg"
      } font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors`}>
        {post.title}
      </h3>

      <p className="text-gray-400 mb-4 line-clamp-2">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <ThumbsUp size={14} />
            {post.likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle size={14} />
            {post.comments}
          </span>
        </div>
        <Link 
          to={`/blog/${post.id}`}
          className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
        >
          Batafsil
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  </article>
);

const NewsletterSignup = () => (
  <div className="bg-blue-500/10 rounded-xl p-6">
    <h3 className="font-bold mb-2 flex items-center gap-2">
      <Mail size={20} className="text-blue-500" />
      Yangiliklardan xabardor bo'ling
    </h3>
    <p className="text-gray-400 text-sm mb-4">
      Eng so'nggi maqolalar va yangiliklar to'g'ridan-to'g'ri emailingizga boradi
    </p>
    <form className="space-y-3">
      <input
        type="email"
        placeholder="Email manzilingiz"
        className="w-full px-4 py-2.5 bg-gray-800/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        Obuna bo'lish
        <ArrowRight size={16} />
      </button>
    </form>
  </div>
);

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const mainStory = blogPosts[0];
  const otherStories = blogPosts.slice(1);

  const filteredStories = otherStories
    .filter(post => {
      if (selectedCategory !== 'all') {
        return post.category.toLowerCase() === selectedCategory;
      }
      return true;
    })
    .filter(post => {
      if (searchTerm) {
        return post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'popular') return b.views - a.views;
      return 0;
    });

  return (
    <div className="pt-20 min-h-screen bg-gray-900 text-white">
      {/* Search Header */}
      <div className="sticky top-0 z-20 bg-gray-900/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6">
          <div className="py-4 space-y-4">
            {/* Search and Categories */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Maqolalarni qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-800/50 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                {categories.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedCategory(id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-4">
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="bg-gray-800/50 text-gray-400 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Barcha vaqt</option>
                  <option value="today">Bugun</option>
                  <option value="week">Shu hafta</option>
                  <option value="month">Shu oy</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800/50 text-gray-400 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Eng yangi</option>
                  <option value="popular">Eng mashhur</option>
                </select>
              </div>
              
              <div className="text-gray-400">
                {filteredStories.length} ta maqola topildi
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[1fr,300px] gap-12">
          {/* Main Content */}
          <div className="space-y-12">
            {/* Featured Story */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Asosiy Yangilik</h2>
              <NewsCard post={mainStory} size="large" />
            </div>

            {/* Latest Stories */}
            <div>
              <h2 className="text-2xl font-bold mb-6">So'nggi Maqolalar</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {filteredStories.map(post => (
                  <NewsCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Newsletter Signup */}
            <NewsletterSignup />
            
            {/* Trending Topics */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-500" />
                Trend Mavzular
              </h3>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
