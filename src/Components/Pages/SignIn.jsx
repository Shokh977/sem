import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LogIn, 
  Mail, 
  Lock,
  Key,
  UserCircle2,
  Shield,
  Fingerprint,
  KeyRound,
  UserCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';

const FloatingIcon = ({ Icon, className }) => (
  <div className={`absolute animate-float opacity-15 ${className}`}>
    <Icon size={40} strokeWidth={1.25} />
  </div>
);

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        // TODO: Implement actual authentication
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        console.log('Form submitted:', formData);
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ submit: 'Tizimga kirishda xatolik yuz berdi' });
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
      <FloatingIcon Icon={Key} className="top-[15%] left-[15%]" />
      <FloatingIcon Icon={UserCircle2} className="top-[25%] right-[10%]" />
      <FloatingIcon Icon={Shield} className="bottom-[20%] left-[10%]" />
      <FloatingIcon Icon={Fingerprint} className="top-[40%] left-[25%]" />
      <FloatingIcon Icon={KeyRound} className="bottom-[30%] right-[15%]" />
      <FloatingIcon Icon={UserCircle} className="top-[35%] right-[25%]" />

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 relative">
        {/* Decorative circle behind the content */}
        <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full transform -translate-y-1/4"></div>

        <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-blue-500/10 rounded-xl mb-4">
              <LogIn size={40} className="text-blue-500" />
            </div>
            <h1 className="text-3xl font-bold text-white">Tizimga kirish</h1>
            <p className="text-gray-400 mt-2">O'z profilingizga kirish uchun ma'lumotlaringizni kiriting</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  Kirish...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Kirish
                </>
              )}
            </button>

            <div className="mt-6 text-center text-gray-400">
              Hisobingiz yo'qmi?{' '}
              <Link to="/signup" className="text-blue-500 hover:text-blue-400 font-medium inline-flex items-center gap-1">
                Ro'yxatdan o'tish
                <ArrowRight size={16} />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
