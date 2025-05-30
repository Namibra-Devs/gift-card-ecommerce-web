// src/services/api.ts
import axios from 'axios';
// const token = import.meta.env.VITE_API_TOKEN;
const token = localStorage.getItem('token');
// Create axios instance with base URL and headers
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://gift-card-ecommerce-api.onrender.com/api', 
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});

// Add request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Add response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (redirect to login)
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;