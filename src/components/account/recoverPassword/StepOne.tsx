import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

interface StepOneProps {
  setStep: Dispatch<SetStateAction<number>>;
}

const StepOne: React.FC<StepOneProps> = ({ setStep }) => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    // Save email and userId to local storage whenever it changes
    localStorage.setItem("userData", JSON.stringify({ email, userId }));
  }, [email, userId]);

  useEffect(() => {
    // Append email and userId to the URL as query parameters
    const queryParams = new URLSearchParams({ email, userId });
    const newUrl = `${window.location.origin}${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [email, userId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setStep(2);
    try {
      // Simulate API request (Replace with actual API endpoint)
      const response = await axios.post("https://gift-card-ecommerce-api.onrender.com/api/auth/forgot-password", { email });

      setUserId(response.data.userId);
      setMessage("A password reset link has been sent to your email.");
      
    } catch (error) {
      console.log(error);
      setMessage("Error sending password reset email. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl md:text-[38px] font-medium text-greynormal tracking-tight mb-6">
        Forgotten Password?
      </h2>
      <p className="text-sm text-grey mb-12">
        Enter your username or email address and we will send you a link to
        reset it.
      </p>

      {message && <p className="text-sm text-green-600 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="w-full">
        <label className="block text-greynegative mb-2">Email</label>
        <input
          type="email"
          className="w-full bg-greylight px-[24px] py-[13px] rounded-[8px]"
          placeholder="example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full px-[24px] py-[14px] mt-8 bg-greynormal text-white rounded-[8px] font-normal flex justify-center items-center transition"
          disabled={loading}
        >
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-8 text-center">
        Already have an account?
        <Link to="/login" className="text-blue-600 underline ml-2">
          Login
        </Link>
      </p>
    </div>
  );
};

export default StepOne;
