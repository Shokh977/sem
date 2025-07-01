import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UserPlus,
  Mail, 
  Lock,
  User,
  Shield,
  Star,
  UserCheck,
  BookOpen,
  GraduationCap,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';
import axios from 'axios';

const FloatingIcon = ({ Icon, className }) => (
  <div className={`absolute animate-float opacity-15 ${className}`}>
    <Icon size={40} strokeWidth={1.25} />
  </div>
);

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = "Ismingizni kiritish majburiy";
    } else if (formData.name.length < 2) {
      newErrors.name = "Ism kamida 2 ta harfdan iborat bo'lishi kerak";
    }
    
    if (!formData.email) {
      newErrors.email = "Email kiritish majburiy";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Noto'g'ri email format";
    }
    
    if (!formData.password) {
      newErrors.password = "Parol kiritish majburiy";
    } else if (formData.password.length < 6) {
      newErrors.password = "Parol kamida 6 ta belgidan iborat bo'lishi kerak";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Parolni tasdiqlash majburiy";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Parollar mos kelmadi";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Remove confirmPassword before sending to server
        const { confirmPassword, ...signupData } = formData;
        
        const response = await axios.post('http://localhost:5000/api/auth/register', signupData);
        
        setVerificationSent(true);
        setTimeout(() => {
          navigate('/signin');
        }, 5000);
      } catch (error) {
        console.error('Registration error:', error);
        setErrors({ 
          submit: error.response?.data?.message || "Ro'yxatdan o'tishda xatolik yuz berdi" 
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Floating Icons */}
      <FloatingIcon Icon={Star} className="top-[15%] left-[15%]" />
      <FloatingIcon Icon={UserCheck} className="top-[25%] right-[10%]" />
      <FloatingIcon Icon={Shield} className="bottom-[20%] left-[10%]" />
      <FloatingIcon Icon={BookOpen} className="top-[40%] left-[25%]" />
      <FloatingIcon Icon={GraduationCap} className="bottom-[30%] right-[15%]" />
      <FloatingIcon Icon={User} className="top-[35%] right-[25%]" />

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 relative">
        {/* Decorative circle behind the content */}
        <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full transform -translate-y-1/4"></div>

        <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700">
          {verificationSent ? (
            <div className="text-center">
              <div className="inline-block p-3 bg-green-500/10 rounded-xl mb-4">
                <Mail size={40} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Emailingizni tasdiqlang</h2>
              <p className="text-gray-300 mb-4">
                Tasdiqlash havolasi emailingizga yuborildi. Iltimos, ro'yxatdan o'tishni yakunlash uchun emailingizni tekshiring.
              </p>
              <p className="text-gray-400 text-sm">
                5 soniyadan so'ng kirish sahifasiga yo'naltirilasiz...
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="inline-block p-3 bg-blue-500/10 rounded-xl mb-4">
                  <UserPlus size={40} className="text-blue-500" />
                </div>
                <h1 className="text-3xl font-bold text-white">Ro'yxatdan o'tish</h1>
                <p className="text-gray-400 mt-2">Yangi hisob yaratish uchun ma'lumotlaringizni kiriting</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">Ismingiz</label>
                  <div className="relative">
                    <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 bg-gray-700/50 border ${
                        errors.name ? 'border-red-500' : 'border-gray-600'
                      } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                      placeholder="Ismingizni kiriting"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 bg-gray-700/50 border ${
                        errors.email ? 'border-red-500' : 'border-gray-600'
                      } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                      placeholder="example@mail.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">Parol</label>
                  <div className="relative">
                    <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-12 py-2.5 bg-gray-700/50 border ${
                        errors.password ? 'border-red-500' : 'border-gray-600'
                      } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                      placeholder="********"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1.5">Parolni tasdiqlang</label>
                  <div className="relative">
                    <Shield size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-12 py-2.5 bg-gray-700/50 border ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                      } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                      placeholder="********"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {errors.submit && (
                  <div className="bg-red-500/10 border border-red-500 rounded-lg p-3">
                    <p className="text-sm text-red-500">{errors.submit}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-medium transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Ro'yxatdan o'tilmoqda...
                    </>
                  ) : (
                    <>
                      <UserPlus size={20} />
                      Ro'yxatdan o'tish
                    </>
                  )}
                </button>

                <div className="mt-6 text-center text-gray-400">
                  Hisobingiz bormi?{' '}
                  <Link to="/signin" className="text-blue-500 hover:text-blue-400 font-medium inline-flex items-center gap-1">
                    Kirish
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
