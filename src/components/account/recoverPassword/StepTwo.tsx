import { useState, useEffect } from "react";
import axios from "axios";
const StepTwo = () => {
  const [resent, setResent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("example@example.com");

  useEffect(() => {
    // Retrieve email from local storage
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleResend = async () => {
    setResent(true);
    try {
      // Simulate API request (Replace with actual API endpoint)
      const response = await axios.post("https://gift-card-ecommerce-api.onrender.com/api/auth/forgot-password", { email });

      if (response.data.success) {
        setTimeout(() => {
          setResent(false);
          alert("Verification code resent!");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      alert("Error sending verification code. Try again.");
      setResent(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <h2 className="text-xl font-normal text-greynormal mb-4">
          Email Verification
        </h2>

        <div className="flex items-center bg-warningactive border-l-4 border-yellow-500 p-3 rounded-md text-yellow-700 mb-6">
          <img src="/icons/alert.png" alt="Note!" className="w-5 mr-2" />
          <p className="text-sm translate-y-4">You need to verify your email address to activate your account</p>
        </div>

        <p className="text-gray-600 mb-6">
          An email with instructions to verify your email address has been sent
          to <strong >{email}</strong>
        </p>

        <p className="text-gray-600 text-center">
          Haven’t received a verification code in your email?
          <button
            type="button"
            onClick={handleResend}
            className="text-blue-600 hover:underline mx-1"
            disabled={resent}
          >
            {resent ? "Resending..." : "Click here"}
          </button>
          to re-send the mail
        </p>
      </div>
    </div>
  );
};

export default StepTwo;
