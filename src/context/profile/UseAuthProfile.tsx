import { useContext } from "react";
import { AuthProfileContext } from "./AuthProfileContext";
// Custom hook to use AuthContext
export const UseAuthProfile = () => {
    const context = useContext(AuthProfileContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };