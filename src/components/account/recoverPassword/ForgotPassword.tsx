import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Simulate API request (Replace with actual API endpoint)
      await axios.post("/api/auth/forgot-password", { email });

      setMessage("A password reset link has been sent to your email.");
    } catch (error) {
      console.log(error);
      setMessage("Error sending password reset email. Try again.");
    } finally {
      setLoading(false);
    }
  };

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
          <div className="">
            <h2 className="text-2xl md:text-[38px] font-medium text-greynormal tracking-tight mb-6">
              Forgotten Password?
            </h2>
            <p className="text-sm text-grey mb-12">
              Enter your username or email address and we will send you a link
              to reset it.
            </p>

            {message && (
              <p className="text-sm text-green-600 mb-4">{message}</p>
            )}

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
