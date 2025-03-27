import { Link } from "react-router-dom";
import { useState } from "react";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email input, 2: Overview 3:

  return (
    <div className="flex items-center justify-center h-screen bg-white py-10 p-4 md:px-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-20 md:gap-40 h-full w-full">
        <div className="w-full md:w-[40%] flex flex-col justify-between gap-20">
          {/* Logo */}
          <div>
            <Link to="/">
              <img src="/favicon.png" alt="PrepaidBanc" />
            </Link>
          </div>

          {/* Left Side (Form) */}
          {step === 1 ? (
            <>
              <StepOne setStep = {setStep} />
            </>
          ) : (
            <>
              <StepTwo />
            </>
          )}
        </div>

        {/* Right Side (Illustration) */}
        <div className="w-full md:w-[50%] h-full bg-gray-50 rounded-[24px] flex items-center justify-center">
          <img
            src="/illustration.png"
            alt="Forgot Password Illustration"
            className="w-full md:-ml-60"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
