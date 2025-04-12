// authTypes.ts
export interface AuthContextType {
  userId: string | null;
  token: string | null;
  isAuthenticated: boolean;
  sendOtp: (email: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  logoutSignInMessage: string | null;
  step: number;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: {
    userId: string;
  };
}

export interface VerifyResponse {
  success: boolean;
  message?: string;
  token?: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  message?: string;
  token?: string;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

// User Object (for Registration & Authentication)
export interface IUser {
    name: string;
    email: string;
    password?: string;  // Optional for login
    phone: string;
    country: string;
    rememberMe?: boolean; // Optional for login
  }
  
  // Login Object (Email submission for OTP)
  export interface ISentOtp {
    email: string;
  }
  
  // OTP Verification Object
  export interface IVerifyOtp {
    userId: string;
    verificationCode: string;
  }
  
  // Token Object (Response after login)
  export interface IAuthResponse {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
    };
  }
  