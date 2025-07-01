import React from 'react';
import { 
  Globe2, 
  GraduationCap, 
  BookOpen, 
  Users, 
  Clock,
  Star,
  Calendar,
  School,
  Award,
  Building,
  Youtube,
  Instagram,
  Send,
  MessageCircle,
  CheckCircle2,
  Plane,
  FileText,
  Headphones,
  Building2,
  BookOpenCheck
} from 'lucide-react';
import justItImage from '../../assets/justit.jpg';

const ExperienceCard = ({ year, title, description }) => (
  <div className="relative pl-8 pb-12 group">
    <div className="absolute left-0 top-0 w-1 h-full bg-blue-500/20 group-last:hidden"></div>
    <div className="absolute left-[-6px] top-2 w-3 h-3 rounded-full bg-blue-500 border-2 border-gray-900"></div>
    <div className="text-blue-400 font-semibold mb-1 flex items-center gap-2">
      <Calendar size={16} />
      {year}
    </div>
    <h3 className="text-xl text-white font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const StatCard = ({ icon: Icon, value, label }) => (
  <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 text-center">
    <div className="text-blue-400 mb-3 flex justify-center">
      <Icon size={32} />
    </div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-gray-400 text-sm">{label}</div>
  </div>
);

const EducationCard = ({ icon: Icon, year, degree, school, location, description }) => (
  <div className="bg-gray-800/30 backdrop-blur rounded-xl p-6 hover:bg-gray-800/50 transition-colors group">
    <div className="text-blue-500 mb-4">
      <Icon size={28} className="group-hover:scale-110 transition-transform" />
    </div>
    <div className="text-blue-400 text-sm mb-2 flex items-center gap-2">
      <Calendar size={14} />
      {year}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{degree}</h3>
    <div className="text-gray-400 mb-1 flex items-center gap-2">
      <Building size={14} />
      {school}
    </div>
    <div className="text-gray-500 mb-3 text-sm flex items-center gap-2">
      <Globe2 size={14} />
      {location}
    </div>
    {description && (
      <p className="text-gray-400 text-sm">{description}</p>
    )}
  </div>
);

const SocialLink = ({ icon: Icon, label, username, link, bgColor }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center gap-4 p-4 rounded-xl ${bgColor} hover:scale-105 transition-all group backdrop-blur-sm`}
  >
    <div className="p-3 bg-white/10 rounded-lg">
      <Icon size={24} className="text-white group-hover:scale-110 transition-transform" />
    </div>
    <div>
      <div className="text-white font-semibold">{label}</div>
      <div className="text-white/70 text-sm">{username}</div>
    </div>
  </a>
);

const ConsultingService = ({ icon: Icon, title, description }) => (
  <div className="bg-gray-800/30 backdrop-blur p-6 rounded-xl hover:bg-gray-800/50 transition-all duration-300 group">
    <div className="text-blue-500 mb-4">
      <Icon size={28} className="group-hover:scale-110 transition-transform" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const consultingServices = [
  {
    icon: FileText,
    title: "Hujjatlar tayyorlash",
    description: "Universitet uchun kerakli barcha hujjatlarni to'g'ri tayyorlashda yordam beramiz."
  },
  {
    icon: School,
    title: "Universitet tanlash",
    description: "Sizning maqsad va imkoniyatlaringizga mos universitetlarni tanlab beramiz."
  },
  {
    icon: BookOpenCheck,
    title: "TOPIK tayyorgarlik",
    description: "Universitet uchun zarur bo'lgan TOPIK darajasiga tayyorgarlik ko'rishda yordam beramiz."
  },
  {
    icon: Building2,
    title: "Yotoqxona masalalari",
    description: "Universitet yotoqxonasi yoki boshqa turar-joy topishda ko'maklashamiz."
  },
  {
    icon: Plane,
    title: "Koreaga jo'nash",
    description: "Viza olish, aviabilet va boshqa safar hujjatlarini tayyorlashda yordam beramiz."
  },
  {
    icon: Headphones,
    title: "24/7 qo'llab-quvvatlash",
    description: "Koreaga borgandan so'ng ham doimiy maslahat va yordam berib boramiz."
  }
];

export default function About() {
  return (
    <div className="pt-20 min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}      <div className="relative overflow-hidden bg-gradient-to-b from-blue-600/10 to-transparent py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Profile Image */}
            <div className="w-64 h-64 relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl"></div>
              <img
                src={justItImage}
                alt="Shoxrux Teacher"
                className="w-full h-full object-cover rounded-full border-4 border-blue-500/50 relative z-10"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Shoxrux <span className="text-blue-500">쌤</span>
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                Koreys tili o'qituvchisi & TOPIK mutaxassisi
              </p>              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="/signup"
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors inline-flex items-center gap-2"
                >
                  <MessageCircle size={18} />
                  Aloqa qilish
                </a>
                <a
                  href="/assets/cv_shoxrux.pdf"
                  download
                  className="px-6 py-2 border border-blue-500 hover:bg-blue-500/10 rounded-full transition-colors inline-flex items-center gap-2"
                >
                  <FileText size={18} />
                  CV yuklash
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-b from-transparent to-gray-800/50">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard icon={Users} value="100+" label="O'quvchilar" />
            <StatCard icon={Star} value="90%" label="Ijobiy natijalar" />
            <StatCard icon={Clock} value="7+" label="Yillik tajriba" />
            <StatCard icon={Globe2} value="10+" label="Online kurslar" />
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="py-16 bg-gradient-to-b from-gray-800/50 to-transparent">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <h2 className="text-3xl font-bold mb-4 text-center">
            <span className="text-blue-500">Ta'lim</span> olgan joylarim
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Koreys tili va o'qitish metodikasi bo'yicha olgan ta'limim
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EducationCard 
              icon={School}
              year="2018 - 2019"
              degree="Koreys Tili va Madaniyati"
              school="Chonnam National University"
              location="Yeosu, South Korea"
              description="Koreys tilini va Koreya madaniyatini o'rganish bo'yicha 1 yillik kurs"
            />
            
            <EducationCard 
              icon={GraduationCap}
              year="2019 - 2023"
              degree="Bizines boshqaruv"
              school="Chonnam National University"
              location="Gwangju, South Korea"
              description="Business va boshqaruv"
            />
            
            <EducationCard 
              icon={Award}
              year="2025 - ongoing"
              degree="Xalqaro savdo va iqtisodiyot"
              school="Kangwon National University"
              location="Chuncheon, South Korea"
              description="Xalqaro savdo va iqtisodiyot bo'yicha magistratura"
            />
          </div>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="text-blue-500">Tajriba</span> va yutuqlar
          </h2>
          <div className="max-w-3xl mx-auto">
            <ExperienceCard 
              year="2020 - Hozir"
              title="TOPIK o'qituvchisi"
              description="100+ o'quvchilarga TOPIK imtihoniga tayyorgarlik ko'rishda yordam berdim. O'quvchilarning 90% muvaffaqiyatli natija ko'rsatdi."
            />
            <ExperienceCard 
              year="2018 - 2020"
              title="Koreys tili o'qituvchisi"
              description="Chonnam milliy universitetida o'qish davomida chet ellik talabalarga koreys tilini o'rgatish bo'yicha tajriba ortirdim."
            />
            <ExperienceCard 
              year="2022"
              title="TOPIK Level 5"
              description="Koreys tili bilish darajasi bo'yicha yuqori natija (TOPIK 5) qo'lga kiritildi."
            />
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="py-16 bg-gradient-to-b from-gray-800/50 to-transparent">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="text-blue-500">Bilim</span> va ko'nikmalar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Language Skills */}
            <div className="bg-gray-800/30 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Globe2 className="text-blue-500" />
                Til bilish darajasi
              </h3>
              <div className="space-y-4">  
                <div>
                  <div className="flex justify-between mb-1">
                    <span>O'zbek tili</span>
                    <span className="text-blue-500">Native</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full w-full bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Koreys tili</span>
                    <span className="text-blue-500">TOPIK 5</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full w-[95%] bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                 <div>
                  <div className="flex justify-between mb-1">
                    <span>Ingliz tili</span>
                    <span className="text-blue-500"> Upper Intermediate </span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full w-[95%] bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                            </div>
            </div>

            {/* Teaching Skills */}
            <div className="bg-gray-800/30 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="text-blue-500" />
                O'qitish metodikasi
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  TOPIK imtihoniga tayyorlash
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Muloqot va so'zlashuv darslari
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Grammar va Writing
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Individual va guruh darslari
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>      {/* Skills Section continues... */}

      {/* Social Media Section */}
      <div className="py-16 bg-gradient-to-b from-transparent to-gray-800/50">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <h2 className="text-3xl font-bold mb-4 text-center">
            <span className="text-blue-500">Ijtimoiy</span> tarmoqlar
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Bizning ijtimoiy tarmoqlardagi sahifalarimizga a'zo bo'ling va yangiliklar, foydali ma'lumotlarni birinchilardan bo'lib bilib turing
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SocialLink 
              icon={MessageCircle}
              label="TikTok"
              username="@shoxrux쌤"
              link="https://www.tiktok.com/@shoxrux쌤?is_from_webapp=1&sender_device=pc"
              bgColor="bg-gradient-to-r from-pink-500 to-purple-600"
            />
            
            <SocialLink 
              icon={Send}
              label="Telegram"
              username="shoxruxsem"
              link="https://t.me/shoxruxsem"
              bgColor="bg-gradient-to-r from-blue-500 to-blue-600"
            />
            
            <SocialLink 
              icon={Instagram}
              label="Instagram"
              username="@shoxruxsem"
              link="https://www.instagram.com/shoxruxsem?igsh=NHVsam5oM3F4NDM5"
              bgColor="bg-gradient-to-r from-pink-600 to-orange-500"
            />
            
            <SocialLink 
              icon={Youtube}
              label="YouTube"
              username="Shoxrux 쌤"
              link="www.youtube.com/@shoxrux쌤"
              bgColor="bg-gradient-to-r from-red-600 to-red-700"
            />
          </div>      {/* Community Stats */}
      {/* <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="bg-gray-800/30 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-500 mb-1">50K+</div>
              <div className="text-gray-400">TikTok followers</div>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-500 mb-1">25K+</div>
              <div className="text-gray-400">Telegram a'zolar</div>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-500 mb-1">15K+</div>
              <div className="text-gray-400">Instagram followers</div>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-500 mb-1">10K+</div>
              <div className="text-gray-400">YouTube obunachi</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
