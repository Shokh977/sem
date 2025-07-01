import React, { useState, useEffect } from 'react';
import {
    Users,
    PlusCircle,
    Trash2,
    Save,
    Star,
    Loader2,
    AlertCircle,
    Link as LinkIcon
} from 'lucide-react';
import axios from '../../config/axios';

export default function SuccessManagement() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [newStudent, setNewStudent] = useState({
        name: '',
        image: '',
        company: '',
        position: '',
        review: '',
        featured: false,
        social: {
            linkedin: '',
            github: '',
            telegram: '',
            instagram: ''
        }
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('/api/success');
            setStudents(response.data);
            setError(null);
        } catch (err) {
            setError("O'quvchilar ro'yxatini yuklashda xatolik");
            console.error('Error fetching success students:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const response = await axios.post('/api/success', newStudent);
            setStudents([...students, response.data]);
            setNewStudent({
                name: '',
                image: '',
                company: '',
                position: '',
                review: '',
                featured: false,
                social: {
                    linkedin: '',
                    github: '',
                    telegram: '',
                    instagram: ''
                }
            });
            setError(null);
        } catch (err) {
            setError("O'quvchi qo'shishda xatolik");
            console.error('Error adding success student:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleUpdateStudent = async (id, updatedData) => {
        setSaving(true);
        try {
            const response = await axios.put(`/api/success/${id}`, updatedData);
            setStudents(students.map(student => 
                student._id === id ? response.data : student
            ));
            setError(null);
        } catch (err) {
            setError("O'quvchi ma'lumotlarini yangilashda xatolik");
            console.error('Error updating success student:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteStudent = async (id) => {
        if (!window.confirm("Rostdan ham bu o'quvchini o'chirmoqchimisiz?")) {
            return;
        }
        try {
            await axios.delete(`/api/success/${id}`);
            setStudents(students.filter(student => student._id !== id));
            setError(null);
        } catch (err) {
            setError("O'quvchini o'chirishda xatolik");
            console.error('Error deleting success student:', err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-blue-500" />
                    <h1 className="text-2xl font-bold text-white">Muvaffaqiyatli o'quvchilar</h1>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-500/10 text-red-400 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <p>{error}</p>
                </div>
            )}

            {/* Add New Student Form */}
            <form onSubmit={handleAddStudent} className="bg-gray-800 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Yangi o'quvchi qo'shish</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        value={newStudent.name}
                        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                        className="bg-gray-700 text-white rounded-lg px-4 py-2"
                        placeholder="Ism"
                        required
                    />
                    <input
                        type="text"
                        value={newStudent.image}
                        onChange={(e) => setNewStudent({ ...newStudent, image: e.target.value })}
                        className="bg-gray-700 text-white rounded-lg px-4 py-2"
                        placeholder="Rasm URL"
                        required
                    />
                    <input
                        type="text"
                        value={newStudent.company}
                        onChange={(e) => setNewStudent({ ...newStudent, company: e.target.value })}
                        className="bg-gray-700 text-white rounded-lg px-4 py-2"
                        placeholder="Kompaniya"
                        required
                    />
                    <input
                        type="text"
                        value={newStudent.position}
                        onChange={(e) => setNewStudent({ ...newStudent, position: e.target.value })}
                        className="bg-gray-700 text-white rounded-lg px-4 py-2"
                        placeholder="Lavozim"
                        required
                    />
                </div>
                <textarea
                    value={newStudent.review}
                    onChange={(e) => setNewStudent({ ...newStudent, review: e.target.value })}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 mt-4"
                    placeholder="Fikr-mulohaza"
                    rows="3"
                    required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    <input
                        type="text"
                        value={newStudent.social.linkedin}
                        onChange={(e) => setNewStudent({
                            ...newStudent,
                            social: { ...newStudent.social, linkedin: e.target.value }
                        })}
                        className="bg-gray-700 text-white rounded-lg px-4 py-2"
                        placeholder="LinkedIn URL"
                    />
                    <input
                        type="text"
                        value={newStudent.social.github}
                        onChange={(e) => setNewStudent({
                            ...newStudent,
                            social: { ...newStudent.social, github: e.target.value }
                        })}
                        className="bg-gray-700 text-white rounded-lg px-4 py-2"
                        placeholder="GitHub URL"
                    />
                    <input
                        type="text"
                        value={newStudent.social.telegram}
                        onChange={(e) => setNewStudent({
                            ...newStudent,
                            social: { ...newStudent.social, telegram: e.target.value }
                        })}
                        className="bg-gray-700 text-white rounded-lg px-4 py-2"
                        placeholder="Telegram URL"
                    />
                    <input
                        type="text"
                        value={newStudent.social.instagram}
                        onChange={(e) => setNewStudent({
                            ...newStudent,
                            social: { ...newStudent.social, instagram: e.target.value }
                        })}
                        className="bg-gray-700 text-white rounded-lg px-4 py-2"
                        placeholder="Instagram URL"
                    />
                </div>
                <div className="flex items-center gap-2 mt-4">
                    <input
                        type="checkbox"
                        id="featured"
                        checked={newStudent.featured}
                        onChange={(e) => setNewStudent({ ...newStudent, featured: e.target.checked })}
                        className="w-4 h-4 bg-gray-700 rounded"
                    />
                    <label htmlFor="featured" className="text-gray-300">Featured</label>
                </div>
                <button
                    type="submit"
                    disabled={saving}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                    {saving ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saqlanmoqda...
                        </>
                    ) : (
                        <>
                            <PlusCircle className="w-4 h-4" />
                            Qo'shish
                        </>
                    )}
                </button>
            </form>

            {/* Students List */}
            <div className="space-y-4">
                {students.map((student) => (
                    <div key={student._id} className="bg-gray-800 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-white">{student.name}</h3>
                                <p className="text-gray-400">{student.position} at {student.company}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                {student.featured && (
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                )}
                                <button
                                    onClick={() => handleDeleteStudent(student._id)}
                                    className="text-red-400 hover:text-red-300"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="aspect-video rounded-lg overflow-hidden mb-4">
                            <img
                                src={student.image}
                                alt={student.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="text-gray-300 mb-4">{student.review}</p>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(student.social).map(([platform, url]) => (
                                url && (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full flex items-center gap-2 hover:bg-gray-600"
                                    >
                                        <LinkIcon className="w-4 h-4" />
                                        {platform}
                                    </a>
                                )
                            ))}
                        </div>
                        <div className="mt-4">
                            <label className="flex items-center gap-2 text-gray-300">
                                <input
                                    type="checkbox"
                                    checked={student.featured}
                                    onChange={(e) => handleUpdateStudent(student._id, {
                                        ...student,
                                        featured: e.target.checked
                                    })}
                                    className="w-4 h-4 bg-gray-700 rounded"
                                />
                                Featured
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
