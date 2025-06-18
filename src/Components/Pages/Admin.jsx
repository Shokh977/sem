import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, School, MessageSquare, CheckCircle2, XCircle } from 'lucide-react';

export default function Admin() {
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'trial', or 'consultation'

  useEffect(() => {
    // Load submissions from localStorage
    const loadSubmissions = () => {
      const stored = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      setSubmissions(stored.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    };

    loadSubmissions();
    // Set up an interval to check for new submissions
    const interval = setInterval(loadSubmissions, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredSubmissions = submissions.filter(sub => 
    filter === 'all' ? true : sub.type === filter
  );

  const handleStatusChange = (index, newStatus) => {
    const updatedSubmissions = [...submissions];
    updatedSubmissions[index].status = newStatus;
    setSubmissions(updatedSubmissions);
    localStorage.setItem('contactSubmissions', JSON.stringify(updatedSubmissions));
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Hammasi
          </button>
          <button
            onClick={() => setFilter('trial')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'trial' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Sinov darsi
          </button>
          <button
            onClick={() => setFilter('consultation')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'consultation' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Konsultatsiya
          </button>
        </div>

        {/* Submissions Grid */}
        <div className="grid gap-6">
          {filteredSubmissions.map((submission, index) => (
            <div 
              key={submission.timestamp} 
              className="bg-gray-800 rounded-xl p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    submission.type === 'trial' 
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {submission.type === 'trial' ? 'Sinov darsi' : 'Konsultatsiya'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    submission.status === 'new' 
                      ? 'bg-yellow-500/10 text-yellow-400'
                      : submission.status === 'completed'
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}>
                    {submission.status === 'new' ? 'Yangi' : submission.status === 'completed' ? 'Bajarildi' : 'Rad etildi'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusChange(index, 'completed')}
                    className="p-2 hover:bg-green-500/10 rounded-lg text-green-400"
                    title="Bajarildi"
                  >
                    <CheckCircle2 size={20} />
                  </button>
                  <button
                    onClick={() => handleStatusChange(index, 'rejected')}
                    className="p-2 hover:bg-red-500/10 rounded-lg text-red-400"
                    title="Rad etish"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <User size={16} />
                    <span className="text-white">{submission.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Phone size={16} />
                    <span className="text-white">{submission.phone}</span>
                  </div>
                  {submission.university && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <School size={16} />
                      <span className="text-white">{submission.university}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={16} />
                    <span>{new Date(submission.timestamp).toLocaleDateString('uz-UZ')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock size={16} />
                    <span>{new Date(submission.timestamp).toLocaleTimeString('uz-UZ')}</span>
                  </div>
                </div>
              </div>

              {submission.message && (
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex items-start gap-2 text-gray-400">
                    <MessageSquare size={16} className="mt-1" />
                    <p className="text-white">{submission.message}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredSubmissions.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              So'rovlar topilmadi
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
