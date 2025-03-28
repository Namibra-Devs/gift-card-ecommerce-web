import React, { useState, useEffect } from "react";
import axios from "axios";

interface UserProfile {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}


interface AuthProfileContextType {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  loading: boolean;
}

export const AuthProfileContext = React.createContext<AuthProfileContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProfileProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get("https://gift-card-ecommerce-api.onrender.com/api/profile", {
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
