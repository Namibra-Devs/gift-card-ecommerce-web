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
  export interface ILogin {
    email: string;
  }
  
  // OTP Verification Object
  export interface IOtpVerification {
    email: string;
    otp: string;
    rememberMe?: boolean;
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
  