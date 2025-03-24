import axios from 'axios';
import React, { useState } from 'react';
import { BiLoader } from 'react-icons/bi';
import { FaCircleCheck, FaExclamation } from 'react-icons/fa6';
import { useAuth } from '../../context/useAuth';

const LoginWithOTP = () => {
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Email input, 2: OTP input
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const {login}= useAuth();

  // Handle Email Submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
    setErrorMessage('');

    try {
      await axios.post('https://gift-card-ecommerce-api.onrender.com/api/auth/login', {
        email,
      });

      setStatus('success');
      setTimeout(() => setStep(2), 1000);
    } catch (error: any) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.response?.data?.error || 'Failed to send OTP. Try again.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  // Handle OTP Verification
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
    setErrorMessage('');

    try {
      const response = await axios.post('https://gift-card-ecommerce-api.onrender.com/api/auth/verify', {
        email,
        otp,
        rememberMe,
      });

      const data = response.data;
      setStatus('success');
      login(data.token, data.refreshToken); // Update authentication state
      setTimeout(() => {
        window.location.href = '/home';
      }, 1000);
    } catch (error: any) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.response?.data?.error || 'Invalid OTP. Try again.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="bg-greylight flex flex-col justify-center items-center h-screen p-4 relative">
      {/* Status Message */}
      {status !== 'idle' && (
        <span className="bg-gray-100 py-2 px-4 rounded text-sm text-gray-400 absolute top-6">
          {status === 'processing' ? (
            <span className="flex items-center gap-2">
              <BiLoader className="animate-spin duration-700" /> Processing...
            </span>
          ) : status === 'success' ? (
            <span className="flex items-center gap-2">
              <FaCircleCheck className="text-green-500 text-xl" /> Success!
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <FaExclamation className="text-red-500 text-xl" /> {errorMessage}
            </span>
          )}
        </span>
      )}

      {/* Form */}
      <form onSubmit={step === 1 ? handleEmailSubmit : handleOtpSubmit} className="bg-white rounded-[24px] p-[60px] w-full md:w-[514px]">
        <div className="flex flex-col items-center text-center space-y-8 mb-6">
          <a href='/'><img src="/favicon.png" alt="PrepaidBanc" /></a>
          <p className="text-greynormal">
            {step === 1 ? 'Please enter your email' : 'Enter the password sent to your email'}
          </p>
        </div>
        <div className="flex flex-col">
          {step === 1 ? (
            <>
            <label htmlFor="Email" className='text-greynegative mb-4'>Email</label>
            <input
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-greylight px-[24px] py-[13px] rounded-[8px]"
              required
            />
            </>
          ) : (
            <>
            <label htmlFor="Password" className='text-greynegative mb-4'>Password</label>
            <input
              type="text"
              placeholder="************"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="bg-greylight px-[24px] py-[13px] rounded-[8px]"
              required
            />

            <div className='flex justify-between mt-8'>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="mr-2"
                    />
                    <label className="text-gray-600 text-xs">
                        Keep me logged in
                    </label>
                </div>
                <a href="/recover_password" className='underline text-linkcolor'>Forgot password?</a>
            </div>
            </>
          )}
          <button
            type="submit"
            className="px-[24px] py-[14px] mt-8 bg-greynormal text-white rounded-[8px] flex justify-center items-center gap-1 disabled:opacity-70"
            disabled={status === 'processing'}
          >
            {status === 'processing' ? <BiLoader className="text-2xl animate-spin duration-700" /> : step === 1 ? 'Login' : 'Continue'}
            {status === 'success' && <FaCircleCheck className="text-green-500 text-xl" />}
          </button>

          <div className='text-right mt-8'><a href="/register" className='underline text-linkcolor'>Create an account</a></div>
        </div>
      </form>
    </section>
  );
};

export default LoginWithOTP;
