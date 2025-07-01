import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add auth token to requests if available
instance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors globally
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response error:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request error:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default instance;
