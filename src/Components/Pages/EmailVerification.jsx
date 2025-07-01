import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { CheckCircle, XCircle, Loader2, Mail, ArrowRight, RefreshCw } from 'lucide-react';

export default function EmailVerification() {
    const { token } = useParams();
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'error'
    const [message, setMessage] = useState('');
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/verify-email/${token}`);
                setStatus('success');
                setMessage(response.data.message);
                
                // Store user data and auto-login
                if (response.data.user && response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    setUser(response.data.user);
                }

                // Countdown for redirect
                const timer = setInterval(() => {
                    setCountdown(prev => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            navigate('/');
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);

                return () => clearInterval(timer);
            } catch (error) {
                setStatus('error');
                setMessage(error.response?.data?.message || 'Tasdiqlashda xatolik yuz berdi');
            }
        };

        verifyEmail();
    }, [token, navigate, setUser]);

    const handleResendVerification = async () => {
        try {
            const email = localStorage.getItem('verificationEmail');
            if (!email) {
                navigate('/signin');
                return;
            }

            await axios.post('http://localhost:5000/api/auth/resend-verification', { email });
            setMessage('Yangi tasdiqlash xati yuborildi. Iltimos, emailingizni tekshiring.');
        } catch (error) {
            setMessage('Tasdiqlash xatini yuborishda xatolik yuz berdi.');
        }
    };

    return (
        <div className="pt-20 min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700">
                {status === 'verifying' && (
                    <div className="text-center">
                        <Loader2 size={48} className="mx-auto mb-4 text-blue-500 animate-spin" />
                        <h2 className="text-2xl font-bold text-white mb-2">Email tekshirilmoqda...</h2>
                        <p className="text-gray-400">Iltimos, kuting</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="text-center">
                        <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
                        <h2 className="text-2xl font-bold text-white mb-2">Email tasdiqlandi!</h2>
                        <p className="text-gray-400">{message}</p>
                        <p className="text-gray-500 mt-4">
                            {countdown} soniyadan so'ng asosiy sahifaga yo'naltirilasiz...
                        </p>
                        <Link 
                            to="/"
                            className="mt-4 inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
                        >
                            Hozir o'tish
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                )}

                {status === 'error' && (
                    <div className="text-center space-y-4">
                        <XCircle size={48} className="mx-auto mb-4 text-red-500" />
                        <h2 className="text-2xl font-bold text-white">Xatolik yuz berdi</h2>
                        <p className="text-gray-400">{message}</p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleResendVerification}
                                className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                            >
                                <RefreshCw size={16} />
                                Qayta yuborish
                            </button>
                            <Link
                                to="/signin"
                                className="inline-flex items-center justify-center gap-2 px-6 py-2 border border-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                            >
                                <Mail size={16} />
                                Boshqa email bilan urinish
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
