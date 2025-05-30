import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://gift-card-ecommerce-api.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshAccessToken: () => Promise<void> = () => Promise.resolve();

const useSetRefreshAccessToken = () => {
  const context = useContext(AuthContext);
  if (context) {
    refreshAccessToken = context.refreshAccessToken;
  }
};

export const SetRefreshAccessTokenComponent: React.FC = () => {
  useSetRefreshAccessToken();
  return null;
};

//====Intercept API calls to refresh token automatically====
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Token expired. Refreshing...");
      try {
        await refreshAccessToken();
        return api.request(error.config);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
