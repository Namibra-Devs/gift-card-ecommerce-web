
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
  