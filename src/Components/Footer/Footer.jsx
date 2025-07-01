import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../config/axios';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Send as Telegram, 
  MessageCircle as TikTok,
  Youtube,
  Clock,
  GraduationCap,
  Loader2
} from 'lucide-react';

const FooterSection = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-bold text-white">{title}</h3>
    {children}
  </div>
);

const FooterLink = ({ href, children, external }) => {
  const className = "text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2";
  
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
};

export default function Footer() {
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-white inline-block">
              Shoxrux <span className="text-blue-500">쌤</span>
            </Link>
            <p className="text-gray-400">
              Professional koreys tili o'qituvchisi va TOPIK mutaxassisi. Online va offline darslar.
            </p>
            <div className="flex space-x-4">
              <FooterLink href="https://instagram.com/shoxrux_korean" external>
                <Instagram size={20} className="text-pink-500" />
              </FooterLink>
              <FooterLink href="https://t.me/shoxrux_korean" external>
                <Telegram size={20} className="text-blue-400" />
              </FooterLink>
              <FooterLink href="https://tiktok.com/@shoxrux_teacher" external>
                <TikTok size={20} className="text-purple-400" />
              </FooterLink>
              <FooterLink href="https://youtube.com/@shoxrux_korean" external>
                <Youtube size={20} className="text-red-500" />
              </FooterLink>
            </div>
          </div>

          {/* Quick Links */}
          <FooterSection title="Tezkor havolalar">
            <ul className="space-y-2">              <li>
                <FooterLink href="/">
                  <GraduationCap size={18} />
                  Asosiy
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/courses">Barcha kurslar</FooterLink>
              </li>
              <li>
                <FooterLink href="/xizmatlar">Xizmatlar</FooterLink>
              </li>
              <li>
                <FooterLink href="/about">Biz haqimizda</FooterLink>
              </li>
              <li>
                <FooterLink href="/signin">Kirish</FooterLink>
              </li>
            </ul>
          </FooterSection>

          {/* Contact Info */}
          <FooterSection title="Bog'lanish">
            <ul className="space-y-2">
              <li>
                <FooterLink href="tel:+998901234567" external>
                  <Phone size={18} />
                  +8210-5726-1777
                </FooterLink>
              </li>
              <li>
                <FooterLink href="mailto:uphill7165@gmail.com" external>
                  <Mail size={18} />
                  uphill7165@gmail.com
                </FooterLink>
              </li>
              <li>
                <FooterLink href="#" external>
                  <MapPin size={18} />
                  Chuncheon, South Korea
                </FooterLink>
              </li>
              <li>
                <FooterLink href="#" external>
                  <Clock size={18} />
                  Dush-Shan: 9:00 - 18:00 (Koreya vaqtida)
                </FooterLink>
              </li>
            </ul>
          </FooterSection>

          {/* Newsletter */}
          <FooterSection title="Yangiliklardan xabardor bo'ling">
            <p className="text-gray-400">
              Yangiliklar va maxsus takliflar uchun obuna bo'ling
            </p>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const email = e.target.email.value;
              
              // Basic email validation
              if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setSubscriptionStatus({ error: true, message: "Noto'g'ri email manzil" });
                return;
              }

              setIsLoading(true);
              try {
                const response = await axios.post('/api/subscribers/subscribe', { email });
                setSubscriptionStatus({ 
                  error: false, 
                  message: "Muvaffaqiyatli obuna bo'ldingiz!" 
                });
                e.target.reset();
              } catch (error) {
                setSubscriptionStatus({ 
                  error: true, 
                  message: error.response?.data?.message || "Xatolik yuz berdi" 
                });
              } finally {
                setIsLoading(false);
              }
            }} className="mt-4 space-y-3">
              <input
                type="email"
                name="email"
                placeholder="Email manzilingiz"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500 text-white"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Obuna bo'lish"
                )}
              </button>
              {subscriptionStatus && (
                <p className={`text-sm ${subscriptionStatus.error ? 'text-red-400' : 'text-green-400'}`}>
                  {subscriptionStatus.message}
                </p>
              )}
            </form>
          </FooterSection>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Shoxrux 쌤. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
}
