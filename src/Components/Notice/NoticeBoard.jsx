import React, { useState, useEffect, useMemo } from 'react';
import { Bell, ChevronRight, Clock, Pin, X } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NoticeBoard = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [closedNotices, setClosedNotices] = useState(() => {
    const saved = localStorage.getItem('closedNotices');
    return new Set(saved ? JSON.parse(saved) : []);
  });
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Save closed notices to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('closedNotices', JSON.stringify([...closedNotices]));
  }, [closedNotices]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs/notifications', {
        withCredentials: true
      });
      const data = response.data || [];
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotice = (id) => {
    setClosedNotices(prev => new Set([...prev, id]));
  };

  const filteredNotifications = useMemo(() => {
    if (!Array.isArray(notifications)) {
      return [];
    }
    return notifications
      .filter(notice => {
        const isNotClosed = !closedNotices.has(notice._id);
        const matchesType = selectedType === 'all' || 
                          (selectedType === 'blog' && notice.isNotification);
        return isNotClosed && matchesType;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [notifications, closedNotices, selectedType]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Only show the component if there are notifications
  if (filteredNotifications.length === 0) return null;

  return (
    <div className="bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            <span className="text-blue-500">Muhim</span> Xabarlar
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Eng so'nggi yangiliklar va e'lonlardan xabardor bo'lib turing
          </p>
        </div>

        {/* Notifications */}
        <div className="space-y-4">
          {filteredNotifications.map((notice) => (
            <Link
              key={notice._id}
              to={`/blog/${notice._id}`}
              className="block bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800 transition-colors relative group"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-1 bg-blue-500 text-white rounded-full text-xs font-medium">
                  {notice.category}
                </span>
                <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium flex items-center gap-1">
                  <Bell size={12} />
                  Muhim
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {notice.title}
              </h3>
              
              <p className="text-gray-300 mb-4 line-clamp-2">
                {notice.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <img
                    src={notice.author?.profilePicture || "/default-avatar.png"}
                    alt={notice.author?.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{notice.author?.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {new Date(notice.createdAt).toLocaleDateString()}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCloseNotice(notice._id);
                }}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Close notification"
              >
                <X size={16} />
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
