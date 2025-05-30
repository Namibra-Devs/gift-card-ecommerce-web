import { useState, useEffect } from "react";
import axios from "axios";
const StepTwo = () => {
  const [resent, setResent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
      // Save email and userId to local storage whenever it changes
      localStorage.setItem("userData", JSON.stringify({ email, userId }));
    }, [email, userId]);

  useEffect(() => {
    // Retrieve email from local storage
    const storedEmail = JSON.parse(localStorage.getItem('userData') || "");
    console.log(storedEmail);
    if (storedEmail) setEmail(storedEmail.email); //
  }, []);


  const handleContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = "/update-password";
  };

  const handleResend = async () => {
    setResent(true);

    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    try {
      // Simulate API request (Replace with actual API endpoint)
      const response = await axios.post(`${apiUrl}/auth/forgot-password`, { email });

      if (response.data.success) {
        // Store in URL as a query parameter
        const fetchedUserId = response.data.data.userId;
        console.log(fetchedUserId);
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("userId", fetchedUserId);
        window.history.replaceState({}, "", currentUrl.toString());

        // Update state
        setUserId(fetchedUserId);

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
          <button
            type="button"
            onClick={handleContinue}
            className="text-blue-600 hover:underline mx-1"
            disabled={resent}
          > Continue and setup your new password
          </button>
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
