import React, { useState, useEffect } from 'react';
import axios from '../../config/axios';
import {
    Settings,
    Save,
    PlusCircle,
    MinusCircle,
    Upload,
    Trash2,
    AlertCircle,
    Loader2
} from 'lucide-react';

export default function AboutManagement() {    const [formData, setFormData] = useState({
        mainTitle: '',
        mainDescription: '',
        mainImage: '',
        stats: [],
        features: [],
        team: []
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAboutContent();
    }, []);

    const fetchAboutContent = async () => {
        try {
            const response = await axios.get('/api/about');
            if (response.data) {
                // Ensure all arrays exist even if they're not in the response
                const data = {
                    ...formData,
                    ...response.data,
                    stats: response.data.stats || [],
                    features: response.data.features || [],
                    team: response.data.team || []
                };
                setFormData(data);
            }
            setError(null);
        } catch (err) {
            setError('Kontentni yuklashda xatolik yuz berdi');
            console.error('Error fetching about content:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.put('/api/about', formData);
            setError(null);
        } catch (err) {
            setError('Ma\'lumotlarni saqlashda xatolik yuz berdi');
            console.error('Error updating about content:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleStatChange = (index, field, value) => {
        const newStats = [...formData.stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setFormData({ ...formData, stats: newStats });
    };

    const handleFeatureChange = (index, field, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        setFormData({ ...formData, features: newFeatures });
    };

    const handleTeamMemberChange = (index, field, value) => {
        const newTeam = [...formData.team];
        if (field.startsWith('social.')) {
            const socialField = field.split('.')[1];
            newTeam[index] = {
                ...newTeam[index],
                social: {
                    ...newTeam[index].social,
                    [socialField]: value
                }
            };
        } else {
            newTeam[index] = { ...newTeam[index], [field]: value };
        }
        setFormData({ ...formData, team: newTeam });
    };

    const addStat = () => {
        setFormData({
            ...formData,
            stats: [...formData.stats, { count: '', label: '', icon: '' }]
        });
    };

    const removeStat = (index) => {
        const newStats = formData.stats.filter((_, i) => i !== index);
        setFormData({ ...formData, stats: newStats });
    };

    const addFeature = () => {
        setFormData({
            ...formData,
            features: [...formData.features, { title: '', description: '', icon: '' }]
        });
    };

    const removeFeature = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    const addTeamMember = () => {
        setFormData({
            ...formData,
            team: [...formData.team, {
                name: '',
                role: '',
                image: '',
                bio: '',
                social: {
                    facebook: '',
                    twitter: '',
                    instagram: '',
                    linkedin: '',
                    telegram: ''
                }
            }]
        });
    };

    const removeTeamMember = async (index, memberId) => {
        if (memberId) {
            try {
                await axios.delete(`/api/about/team/${memberId}`);
            } catch (err) {
                setError('Jamoa a\'zosini o\'chirishda xatolik yuz berdi');
                return;
            }
        }
        const newTeam = formData.team.filter((_, i) => i !== index);
        setFormData({ ...formData, team: newTeam });
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
                    <Settings className="w-8 h-8 text-blue-500" />
                    <h1 className="text-2xl font-bold text-white">Biz haqimizda sahifasi</h1>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-500/10 text-red-400 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <p>{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Main Content Section */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Asosiy ma'lumotlar</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Sarlavha
                            </label>
                            <input
                                type="text"
                                value={formData.mainTitle}
                                onChange={(e) => setFormData({ ...formData, mainTitle: e.target.value })}
                                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Sarlavhani kiriting"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Tavsif
                            </label>
                            <textarea
                                value={formData.mainDescription}
                                onChange={(e) => setFormData({ ...formData, mainDescription: e.target.value })}
                                rows="4"
                                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Tavsifni kiriting"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Rasm URL
                            </label>
                            <input
                                type="text"
                                value={formData.mainImage}
                                onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
                                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Rasm URL"
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-white">Statistika</h2>
                        <button
                            type="button"
                            onClick={addStat}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20"
                        >
                            <PlusCircle size={20} />
                            Qo'shish
                        </button>
                    </div>
                    <div className="space-y-4">
                        {formData.stats.map((stat, index) => (
                            <div key={index} className="flex gap-4 items-start">
                                <div className="flex-1 space-y-4">
                                    <input
                                        type="text"
                                        value={stat.count}
                                        onChange={(e) => handleStatChange(index, 'count', e.target.value)}
                                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Raqam"
                                    />
                                    <input
                                        type="text"
                                        value={stat.label}
                                        onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nom"
                                    />
                                    <input
                                        type="text"
                                        value={stat.icon}
                                        onChange={(e) => handleStatChange(index, 'icon', e.target.value)}
                                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Ikonka"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeStat(index)}
                                    className="text-red-400 hover:text-red-300"
                                >
                                    <MinusCircle size={24} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-white">Xususiyatlar</h2>
                        <button
                            type="button"
                            onClick={addFeature}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20"
                        >
                            <PlusCircle size={20} />
                            Qo'shish
                        </button>
                    </div>
                    <div className="space-y-4">
                        {formData.features.map((feature, index) => (
                            <div key={index} className="flex gap-4 items-start">
                                <div className="flex-1 space-y-4">
                                    <input
                                        type="text"
                                        value={feature.title}
                                        onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Sarlavha"
                                    />
                                    <textarea
                                        value={feature.description}
                                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Tavsif"
                                        rows="2"
                                    />
                                    <input
                                        type="text"
                                        value={feature.icon}
                                        onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Ikonka"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeFeature(index)}
                                    className="text-red-400 hover:text-red-300"
                                >
                                    <MinusCircle size={24} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-white">Jamoa</h2>
                        <button
                            type="button"
                            onClick={addTeamMember}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20"
                        >
                            <PlusCircle size={20} />
                            Qo'shish
                        </button>
                    </div>
                    <div className="space-y-6">
                        {formData.team.map((member, index) => (
                            <div key={index} className="bg-gray-700 rounded-lg p-4 space-y-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-medium text-white mb-2">
                                        {member.name || 'Yangi a\'zo'}
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() => removeTeamMember(index, member._id)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        value={member.name}
                                        onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                                        className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Ism"
                                    />
                                    <input
                                        type="text"
                                        value={member.role}
                                        onChange={(e) => handleTeamMemberChange(index, 'role', e.target.value)}
                                        className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Lavozim"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        value={member.image}
                                        onChange={(e) => handleTeamMemberChange(index, 'image', e.target.value)}
                                        className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Rasm URL"
                                    />
                                </div>
                                <div>
                                    <textarea
                                        value={member.bio}
                                        onChange={(e) => handleTeamMemberChange(index, 'bio', e.target.value)}
                                        className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Biografiya"
                                        rows="2"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <input
                                        type="text"
                                        value={member.social?.facebook}
                                        onChange={(e) => handleTeamMemberChange(index, 'social.facebook', e.target.value)}
                                        className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Facebook"
                                    />
                                    <input
                                        type="text"
                                        value={member.social?.twitter}
                                        onChange={(e) => handleTeamMemberChange(index, 'social.twitter', e.target.value)}
                                        className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Twitter"
                                    />
                                    <input
                                        type="text"
                                        value={member.social?.instagram}
                                        onChange={(e) => handleTeamMemberChange(index, 'social.instagram', e.target.value)}
                                        className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Instagram"
                                    />
                                    <input
                                        type="text"
                                        value={member.social?.linkedin}
                                        onChange={(e) => handleTeamMemberChange(index, 'social.linkedin', e.target.value)}
                                        className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="LinkedIn"
                                    />
                                    <input
                                        type="text"
                                        value={member.social?.telegram}
                                        onChange={(e) => handleTeamMemberChange(index, 'social.telegram', e.target.value)}
                                        className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Telegram"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white ${
                            saving
                                ? 'bg-blue-500/50 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Saqlanmoqda...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Saqlash
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
