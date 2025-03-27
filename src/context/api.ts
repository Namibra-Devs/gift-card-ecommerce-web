import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const api = axios.create({
  baseURL: "https://gift-card-ecommerce-api.onrender.com/api",
  headers: { "Content-Type": "application/json" },
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
    if (error.response.status === 401) {
      console.log("Token expired. Refreshing...");
      await refreshAccessToken();
      return api.request(error.config);
    }
    return Promise.reject(error);
  }
);

export default api;
