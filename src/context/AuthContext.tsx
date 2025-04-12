import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  AuthContextType,
  LoginResponse,
  VerifyResponse,
  RefreshTokenResponse,
  AuthProviderProps
} from "./authTypes";

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userId, setUserId] = useState<string | null>(() => localStorage.getItem("userId") || null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const [step, setStep] = useState(1); // 1: Email input, 2: OTP input and verification

  //Status Messages state variables
  const [message, setMessage] = useState("");
  const [logoutSignInMessage, setLogoutSignInMessage] = useState<string | null>(null);

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

  // 1. Send OTP (Login) =======
  const sendOtp = async (email: string): Promise<void> => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL as string;

    try {
      // Clear previous states
      setMessage('');
      
      // Validate email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setMessage('Please enter a valid email address');
        return;
      }

      const response = await axios.post<LoginResponse>(
        `${apiUrl}/auth/login`,
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          validateStatus: (status) => status < 500, // Don't throw for 4xx errors
        }
      );

      if (!response.data.success || !response.data.data?.userId) {
        setMessage(response.data.message || 'No account found with this email');
        return;
      }

      const fetchedUserId = response.data.data.userId;
      
      // Update URL without page reload
      const url = new URL(window.location.href);
      url.searchParams.set('userId', fetchedUserId);
      window.history.pushState({}, '', url.toString());

      // Store in localStorage as fallback
      localStorage.setItem('tempUserId', fetchedUserId);
      
      // Update state
      setUserId(fetchedUserId);
      setMessage('Verification code sent to your email');

      // Move to OTP verification step
      setStep(2);

    } catch (err) {
      console.error('Login error:', err);
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || 'Login failed. Please try again.');
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  // 2. Verify OTP and Authenticate =======
  const verifyOtp = async (otp: string): Promise<void> => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL as string;

    try {
      // Get userId from multiple sources (URL param -> state -> localStorage)
      const urlParams = new URLSearchParams(window.location.search);
      const urlUserId = urlParams.get('userId');
      const storedUserId = userId || urlUserId || localStorage.getItem('tempUserId');

      if (!storedUserId) {
        setMessage('Session expired. Please request a new OTP.');
        return;
      }

      // Validate OTP format (6 digits)
      if (!/^\d{6}$/.test(otp)) {
        setMessage('Please enter a valid 6-digit code');
        return;
      }

      const response = await axios.post<VerifyResponse>(
        `${apiUrl}/auth/verify`,
        {
          verificationCode: otp,
          userId: storedUserId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.data.success || !response.data.token) {
        setMessage(response.data.message || 'Invalid verification code');
        return;
      }

      // Successful verification
      const authToken = response.data.token;
      
      // Store token securely (consider using httpOnly cookies in production)
      localStorage.setItem('authToken', authToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      
      // Clean up temporary storage
      localStorage.removeItem('tempUserId');
      
      // Update state
      setToken(authToken);
      setLogoutSignInMessage('Logged in successfully!');
      setMessage('Login successful! Redirecting...');

      // Redirect with token in URL (if required)
      const redirectUrl = new URL('/', window.location.origin);
      redirectUrl.searchParams.set('token', authToken);
      
      // Delay redirect to show success message
      setTimeout(() => {
        setLogoutSignInMessage(null);
        window.location.href = redirectUrl.toString();
      }, 2000);

    } catch (err) {
      console.error('Verification error:', err);
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || 'Verification failed. Please try again.');
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };


  // 3. Logout Function =======
  const logout = async () => {
    try {
      setIsAuthenticated(false);
      setToken(null);
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
  
      // Show logout message
      setLogoutSignInMessage("Logged out successfully!");
  
      // Hide message after 2 seconds
      setTimeout(() => {
        setLogoutSignInMessage(null);
        window.location.href = "/";
      }, 2000);
      
    } catch (error) {
      console.log(error);
      alert("Error while logging out, try again");
    }
  };

  // 4. Refresh Access Token =======
  const refreshAccessToken = async () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    try {
      const response = await axios.post<RefreshTokenResponse>(
        `${apiUrl}/auth/refresh`,
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
        message, setMessage, logoutSignInMessage, step
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
