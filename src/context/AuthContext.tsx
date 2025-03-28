import React, { useState, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  userId: string | null;
  token: string | null;
  isAuthenticated: boolean;
  sendOtp: (email: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(
    () => localStorage.getItem("userId") || null
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  // Load auth state on app startup ======
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setIsAuthenticated(false);
    }
  }, [token]);

  // Save userId and token to localStorage when they change =======
  useEffect(() => {
    if (userId) localStorage.setItem("userId", userId);
    else localStorage.removeItem("userId");

    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [userId, token]);

  // 1. Send OTP (Login/Register) =======
  const sendOtp = async (email: string) => {
    try {
      const response = await axios.post(
        "https://gift-card-ecommerce-api.onrender.com/api/auth/login",
        { email }
      );

      if (response.data.success) {
        const fetchedUserId = response.data.data.userId; //Ok
        // Store in URL as a query parameter
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("userId", fetchedUserId);
        window.history.replaceState({}, "", currentUrl.toString());

        // Update state//
        setUserId(fetchedUserId);

        console.log("Sent. User ID:", response.data.data.userId);
      } else {
        throw new Error(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Send OTP Error:", error);
    }
  };

  // 2. Verify OTP and Authenticate =======
  const verifyOtp = async (otp: string): Promise<boolean> => {
    try {
      // Retrieve userId from localStorage if state is empty
      const storedUserId = userId || localStorage.getItem("userId");

      if (!storedUserId) {
        console.error("No User ID found! Please request OTP first.");
        return false;
      }

      const response = await axios.post(
        "https://gift-card-ecommerce-api.onrender.com/api/auth/verify",
        {
          verificationCode: otp,
          userId: storedUserId, // Use stored userId
        }
      );

      if (response.data.success && response.data.token) {
        const newToken = response.data.token;
        setToken(newToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        console.log("OTP Verified! Token:", newToken);
        window.location.href = "/";
        return true;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      return false;
    }
  };

  // 3. Logout Function =======
  const logout = () => {
    setUserId(null);
    setToken(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
    console.log("👋 User logged out");
  };

  // 4. Refresh Access Token =======
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        "https://gift-card-ecommerce-api.onrender.com/api/auth/refresh",
        { token }
      );

      if (response.data.success && response.data.token) {
        const newToken = response.data.token;
        setToken(newToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        console.log("Access token refreshed:", newToken);
      } else {
        throw new Error(response.data.message || "Failed to refresh token.");
      }
    } catch (error) {
      console.error("Refresh Token Error:", error);
      logout(); // Log out if refresh fails
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        token,
        isAuthenticated,
        sendOtp,
        verifyOtp,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
