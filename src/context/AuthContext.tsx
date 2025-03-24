import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

// Define AuthContext Type
interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("token"));

  // On Page Reload - Check if token exists
  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
  }, [accessToken]);

  // Login - Store tokens securely
  const login = (token: string, refreshToken: string) => {
    localStorage.setItem("token", token); // Access token (temporary)
    localStorage.setItem("refreshToken", refreshToken); // Store refresh token

    setAccessToken(token);
    setIsAuthenticated(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  // Logout - Remove tokens
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    setAccessToken(null);
    setIsAuthenticated(false);
    delete axios.defaults.headers.common["Authorization"];
  };

  // Refresh Token Function
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return logout(); // If no refresh token, logout

      const response = await axios.post("https://gift-card-ecommerce-api.onrender.com/api/auth/refresh", {
        refreshToken,
      });

      const newAccessToken = response.data.accessToken;
      setAccessToken(newAccessToken);
      localStorage.setItem("token", newAccessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
