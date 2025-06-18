import React, { useState } from 'react';
import { 
  FileText, 
  School, 
  BookOpenCheck, 
  Building2, 
  Plane, 
  Headphones,
  GraduationCap,
  CheckCircle,
  BookOpen,
  Users,
  Target,
  Clock
} from 'lucide-react';
import ContactModal from '../Modal/ContactModal';

const ServiceCard = ({ icon: Icon, title, description }) => (
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

const teachingServices = [
  {
    icon: BookOpen,
    title: "Boshlang'ich kursi",
    description: "Koreys tilini noldan o'rganish uchun maxsus ishlab chiqilgan kurs."
  },
  {
    icon: Target,
    title: "TOPIK imtihoniga tayyorlov",
    description: "TOPIK imtihonidan yuqori natija olish uchun maxsus kurs."
  },
  {
    icon: Users,
    title: "Guruh darslari",
    description: "Hamkorlikda va do'stona muhitda o'rganish uchun guruh darslari."
  },
  {
    icon: Clock,
    title: "Individual darslar",
    description: "Sizning vaqtingiz va talablaringizga moslashtirilgan individual darslar."
  },
  {
    icon: CheckCircle,
    title: "Sertifikat olish",
    description: "Kurs yakunida rasmiy sertifikat berish va uni tasdiqlash."
  },
  {
    icon: GraduationCap,
    title: "Professional o'qitish",
    description: "Tajribali o'qituvchilar tomonidan zamonaviy metodikada dars berish."
  }
];

export default function Xizmatlar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('trial'); // 'trial' or 'consultation'

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-900 text-white">
          {/* Consulting Services Section */}
      <div className="py-16 bg-gradient-to-b from-transparent to-gray-800/50">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <h2 className="text-3xl font-bold mb-4 text-center">
            <span className="text-blue-500">Koreada o'qish</span> bo'yicha yordam
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Koreaning nufuzli universitetlarida o'qishingiz uchun to'g'ridan-to'g'ri ko'maklashamiz
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultingServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-gray-300 mb-6">
              Koreada o'qish bo'yicha bepul konsultatsiya olish uchun bog'laning
            </p>            <button
              onClick={() => openModal('consultation')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-medium transition-colors"
            >
              <School size={20} />
              Konsultatsiya olish
            </button>
          </div>
        </div>
      </div>
      {/* Teaching Services Section */}
      <div className="py-16 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <h2 className="text-3xl font-bold mb-4 text-center">
            <span className="text-blue-500">O'quv</span> xizmatlarimiz
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Professional o'qituvchilar jamoasi bilan koreys tilini o'rganishning eng samarali usullari
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachingServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-gray-300 mb-6">
              Bepul sinov darsiga yoziling va o'z imkoniyatlaringizni kashf eting
            </p>            <button
              onClick={() => openModal('trial')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-medium transition-colors"
            >
              <BookOpen size={20} />
              Sinov darsiga yozilish
            </button>
          </div>
        </div>
      </div>

        {/* Contact Modal */}
      <ContactModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
      />
    </div>
  );
}
