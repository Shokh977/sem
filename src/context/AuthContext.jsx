import React,{ createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', 
                { email, password },
                { withCredentials: true }
            );
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Login failed';
        }
    };    const logout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout', {}, 
                { withCredentials: true }
            );
        } catch (error) {
            console.error('Logout error:', error);
            // Continue with local logout even if server request fails
        } finally {
            // Always clear local state
            setUser(null);
            localStorage.removeItem('user');
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', 
                userData,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Registration failed';
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthContext };
