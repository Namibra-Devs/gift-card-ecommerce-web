import React, { useState, useEffect } from "react";
// import axios from "axios";
import api from "../api";

interface UserProfile {
  userId: string;
  firstName: string;
  lastName: string;
  username?: string;
  phone: string;
  email: string;
  secondaryEmail: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthProfileContextType {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  loading: boolean;
}

export const AuthProfileContext =
  React.createContext<AuthProfileContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProfileProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.log("User Id not found!, check again");
      }

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get(`${apiUrl}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <AuthProfileContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthProfileContext.Provider>
  );
};
