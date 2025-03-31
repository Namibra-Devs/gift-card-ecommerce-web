
import React, { useState, useEffect } from "react";
import { BiLoader } from "react-icons/bi";
// import { FaExclamation } from "react-icons/fa6";
import { useAuth } from "../../context/useAuth";

const LoginWithOTP = () => {
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Email input, 2: OTP input
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { sendOtp, verifyOtp, message, setMessage } = useAuth();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(""); // Clear message after 5 seconds
      }, 2000);

      return () => clearTimeout(timer); // Cleanup on component unmount
    }
  }, [message]); // Runs whenever `message` changes

  // Handle Email Submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("processing");

      if (!email){
        setErrorMessage("Enter your email");
        setTimeout(() => setStatus('idle'), 2000);
      };

      await sendOtp(email);
      setStatus("success");
      setTimeout(() => setStatus('idle'), 2000);
      setTimeout(() => setStep(2), 2000);
  };

  // Handle OTP Verification
const handleOtpSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("processing");
  setErrorMessage("");

  if (!otp){
    setErrorMessage("Enter OTP!");
    setTimeout(() => setStatus('idle'), 2000);
  }

  const success = await verifyOtp(otp);
  if (success) {
    setTimeout(() => setStatus("idle"), 1000);
  } 
  setTimeout(() => setStatus("idle"), 1000);
};


  return (
    <section className="bg-greylight flex flex-col justify-center items-center h-screen p-4 relative">
      {/* Status Message */}
        <span className=" py-2 px-4 rounded text-sm text-gray-400 absolute top-7">
         <p className="text-green-500"> {message}</p>
         <p className="text-warningactive"> {errorMessage}</p>
        </span>

      {/* Form */}
      <form
        onSubmit={step === 1 ? handleEmailSubmit : handleOtpSubmit}
        className="bg-white rounded-[24px] p-[60px] w-full md:w-[514px]"
      >
        <div className="flex flex-col items-center text-center space-y-8 mb-6">
          <a href="/">
            <img src="/favicon.png" alt="PrepaidBanc" />
          </a>
          <p className="text-greynormal">
            {step === 1
              ? "Please enter your email"
              : "Enter the password sent to your email"}
          </p>
        </div>
        <div className="flex flex-col">
          {step === 1 ? (
            <>
              <label htmlFor="Email" className="text-greynegative mb-4">
                Email
              </label>
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
              <label htmlFor="Password" className="text-greynegative mb-4">
                Password
              </label>
              <input
                type="text"
                placeholder="************"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="bg-greylight px-[24px] py-[13px] rounded-[8px]"
                required
              />

              <div className="flex justify-between mt-8">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={rememberMe}
                    title="Keep me logged in"
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2"
                  />
                  <label className="text-gray-600 text-xs">
                    Keep me logged in
                  </label>
                </div>
                <a
                  href="/recover-password"
                  className="underline text-linkcolor"
                >
                  Forgot password?
                </a>
              </div>
            </>
          )}
          <button
            type="submit"
            className="px-[24px] py-[14px] mt-8 bg-greynormal text-white rounded-[8px] flex justify-center items-center gap-1 disabled:opacity-70"
            disabled={status === "processing"}
          >
            {status === "processing" ? (
              <BiLoader className="text-2xl animate-spin duration-700" />
            ) : step === 1 ? (
              "Login"
            ) : (
              "Continue"
            )}
          </button>

          <div className="text-right mt-8">
            <a href="/register" className="underline text-linkcolor">
              Create an account
            </a>
          </div>
        </div>
      </form>
    </section>
  );
};

export default LoginWithOTP;
