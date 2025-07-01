import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Save,
    Loader2,
    ArrowLeft,
    Plus,
    X,
    ImageIcon,
    AlertCircle
} from 'lucide-react';
import axios from '../../config/axios';

export default function CourseEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [course, setCourse] = useState({
        title: '',
        description: '',
        category: 'other',
        price: '',
        duration: '',
        level: '',
        features: [''],
        outcomes: [''],
        image: '',
        lessonsCount: '',
        status: 'draft'
    });

    useEffect(() => {
        if (id) {
            fetchCourse();
        }
    }, [id]);

    const fetchCourse = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/courses/${id}`);
            setCourse(response.data);
        } catch (err) {
            setError('Kursni yuklashda xatolik');
            console.error('Error fetching course:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            if (id) {
                await axios.put(`/api/courses/${id}`, course);
            } else {
                await axios.post('/api/courses', course);
            }
            navigate('/admin/courses');
        } catch (err) {
            setError(err.response?.data?.message || 'Kursni saqlashda xatolik');
            console.error('Error saving course:', err);
            setSaving(false);
        }
    };

    const handleArrayInput = (field, index, value) => {
        setCourse(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };

    const addArrayItem = (field) => {
        setCourse(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const removeArrayItem = (field, index) => {
        setCourse(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 pt-20 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white pt-20">
            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate('/admin/courses')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white"
                    >
                        <ArrowLeft size={20} />
                        Orqaga
                    </button>
                    <h1 className="text-2xl font-bold">{id ? 'Kursni tahrirlash' : 'Yangi kurs'}</h1>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg flex items-center gap-2 text-red-500">
                        <AlertCircle size={20} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="bg-gray-800 rounded-xl p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Kurs nomi
                            </label>
                            <input
                                type="text"
                                value={course.title}
                                onChange={e => setCourse(prev => ({ ...prev, title: e.target.value }))}
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Tavsif
                            </label>
                            <textarea
                                value={course.description}
                                onChange={e => setCourse(prev => ({ ...prev, description: e.target.value }))}
                                rows="4"
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Kategoriya
                                </label>
                                <select
                                    value={course.category}
                                    onChange={e => setCourse(prev => ({ ...prev, category: e.target.value }))}
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="beginner">Boshlang'ich</option>
                                    <option value="intermediate">O'rta</option>
                                    <option value="advanced">Yuqori</option>
                                    <option value="topik">TOPIK</option>
                                    <option value="speaking">Muloqot</option>
                                    <option value="writing">Yozish</option>
                                    <option value="other">Boshqa</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Narxi (so'm)
                                </label>
                                <input
                                    type="number"
                                    value={course.price}
                                    onChange={e => setCourse(prev => ({ ...prev, price: e.target.value }))}
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Davomiyligi
                                </label>
                                <input
                                    type="text"
                                    value={course.duration}
                                    onChange={e => setCourse(prev => ({ ...prev, duration: e.target.value }))}
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Misol: 3 oy"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Daraja
                                </label>
                                <input
                                    type="text"
                                    value={course.level}
                                    onChange={e => setCourse(prev => ({ ...prev, level: e.target.value }))}
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Misol: Beginner"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Darslar soni
                                </label>
                                <input
                                    type="number"
                                    value={course.lessonsCount}
                                    onChange={e => setCourse(prev => ({ ...prev, lessonsCount: e.target.value }))}
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Status
                                </label>
                                <select
                                    value={course.status}
                                    onChange={e => setCourse(prev => ({ ...prev, status: e.target.value }))}
                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="draft">Qoralama</option>
                                    <option value="active">Faol</option>
                                    <option value="archived">Arxivlangan</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Rasm URL
                            </label>
                            <input
                                type="url"
                                value={course.image}
                                onChange={e => setCourse(prev => ({ ...prev, image: e.target.value }))}
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://example.com/image.jpg"
                            />
                            {course.image && (
                                <div className="mt-2 relative w-48">
                                    <img
                                        src={course.image}
                                        alt="Preview"
                                        className="w-full h-32 object-cover rounded-lg"
                                        onError={(e) => e.target.src = 'https://placehold.co/300x200?text=Rasm+topilmadi'}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setCourse(prev => ({ ...prev, image: '' }))}
                                        className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/75"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Features */}
                    <div className="bg-gray-800 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-medium text-gray-300">
                                Kurs xususiyatlari
                            </label>
                            <button
                                type="button"
                                onClick={() => addArrayItem('features')}
                                className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {course.features.map((feature, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={e => handleArrayInput('features', index, e.target.value)}
                                        className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Kurs xususiyati"
                                    />
                                    {course.features.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem('features', index)}
                                            className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg"
                                        >
                                            <X size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Outcomes */}
                    <div className="bg-gray-800 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-medium text-gray-300">
                                Kurs yakunidagi natijalar
                            </label>
                            <button
                                type="button"
                                onClick={() => addArrayItem('outcomes')}
                                className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {course.outcomes.map((outcome, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={outcome}
                                        onChange={e => handleArrayInput('outcomes', index, e.target.value)}
                                        className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Kurs natijasi"
                                    />
                                    {course.outcomes.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem('outcomes', index)}
                                            className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg"
                                        >
                                            <X size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 rounded-lg text-white font-medium transition-colors"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Saqlanmoqda...
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    Saqlash
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
