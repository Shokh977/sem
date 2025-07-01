import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Plus,
    Pencil,
    Trash2,
    Eye,
    EyeOff,
    Loader2,
    CheckCircle2,
    Clock,
    Users,
    GraduationCap,
    Image as ImageIcon
} from 'lucide-react';
import axios from '../../config/axios';

export default function CourseManagement() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/courses');
            setCourses(response.data);
        } catch (err) {
            setError('Kurslarni yuklashda xatolik yuz berdi');
            console.error('Error fetching courses:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Haqiqatan ham bu kursni o\'chirmoqchimisiz?')) return;

        try {
            await axios.delete(`/api/courses/${id}`);
            fetchCourses();
        } catch (err) {
            console.error('Error deleting course:', err);
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await axios.put(`/api/courses/${id}`, { status });
            fetchCourses();
        } catch (err) {
            console.error('Error updating course status:', err);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-8">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Kurslar</h2>
                <button
                    onClick={() => navigate('/admin/courses/new')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors"
                >
                    <Plus size={20} />
                    Yangi kurs
                </button>
            </div>

            {/* Course List */}
            <div className="grid gap-6">
                {courses.map(course => (
                    <div key={course._id} className="bg-gray-800 rounded-xl overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            {/* Course Image */}
                            <div className="md:w-48 h-48 md:h-auto relative">
                                {course.image ? (
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                        <ImageIcon size={32} className="text-gray-500" />
                                    </div>
                                )}
                                <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
                                    course.status === 'active' ? 'bg-green-500/20 text-green-300' :
                                    course.status === 'draft' ? 'bg-yellow-500/20 text-yellow-300' :
                                    'bg-gray-500/20 text-gray-300'
                                }`}>
                                    {course.status === 'active' ? 'Faol' :
                                     course.status === 'draft' ? 'Qoralama' :
                                     'Arxivlangan'}
                                </div>
                            </div>

                            {/* Course Info */}
                            <div className="flex-1 p-6">
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {course.title}
                                </h3>
                                <p className="text-gray-400 mb-4 line-clamp-2">
                                    {course.description}
                                </p>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Clock size={16} />
                                        <span className="text-sm">{course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Users size={16} />
                                        <span className="text-sm">{course.studentsCount} ta o'quvchi</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <GraduationCap size={16} />
                                        <span className="text-sm">{course.level}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <span className="text-sm">{course.price.toLocaleString()} so'm</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleStatusChange(course._id, 
                                            course.status === 'active' ? 'draft' : 'active'
                                        )}
                                        className={`p-2 rounded-lg ${
                                            course.status === 'active'
                                                ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                                                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                        }`}
                                        title={course.status === 'active' ? 'Faol' : 'Qoralama'}
                                    >
                                        {course.status === 'active' ? <Eye size={20} /> : <EyeOff size={20} />}
                                    </button>
                                    <button
                                        onClick={() => navigate(`/admin/courses/edit/${course._id}`)}
                                        className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg"
                                        title="Tahrirlash"
                                    >
                                        <Pencil size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(course._id)}
                                        className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg"
                                        title="O'chirish"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {courses.length === 0 && (
                    <div className="text-center py-12">
                        <GraduationCap size={48} className="mx-auto text-gray-600 mb-4" />
                        <h3 className="text-xl font-medium text-gray-400 mb-2">Kurslar yo'q</h3>
                        <p className="text-gray-500">Yangi kurs yaratish uchun yuqoridagi tugmani bosing</p>
                    </div>
                )}
            </div>
        </div>
    );
}
