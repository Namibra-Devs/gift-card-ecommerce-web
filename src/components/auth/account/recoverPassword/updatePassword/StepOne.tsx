import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";

interface StepOneProps {
  setStep: Dispatch<SetStateAction<number>>;
}

const StepOne: React.FC<StepOneProps> = ({ setStep }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    // Retrieve userId from local storage
    const storedUserId = localStorage.getItem("userId");
    console.log(storedUserId);
    if (storedUserId) setUserId(storedUserId);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!password || !confirmPassword) {
      setMessage("Both password fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    try {
      // Simulate API request (Replace with actual API endpoint)
      const response = await axios.post(`${apiUrl}/auth/reset-password`, {
        password,
        userId,
      });

      setMessage(response.data.message);
      setStep(2);
    } catch (error) {
      console.log(error);
      setMessage("Error sending password reset email. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <h2 className="text-3xl font-normal text-greynormal mb-4">
          Update Password
        </h2>

        <div className="flex items-center bg-warningactive border-l-4 border-yellow-500 p-3 rounded-md text-yellow-700 mb-8">
          <img src="/icons/alert.png" alt="Note!" className="w-5 mr-2" />
          <p className="text-sm translate-y-2">
            You need to change your password
          </p>
        </div>

        {message && (
          <p className="text-sm text-warningactive mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col mb-6">
            <label htmlFor="password" className="text-greynegative mb-3">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="***********"
              value={password}
              onChange={handleChange}
              required
              className="w-full bg-greylight px-[24px] py-[13px] rounded-[8px]"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-greynegative mb-3">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="***********"
              value={confirmPassword}
              onChange={handleChange}
              required
              className="w-full bg-greylight px-[24px] py-[13px] rounded-[8px]"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              title="Agree to terms"
              checked={checked}
              onChange={() => setChecked(!checked)}
              className="w-4 h-4"
            />
            <p className="text-sm text-gray-600 mt-4">
              Signout from other devices
            </p>
          </div>

          <button
            type="submit"
            className="w-full px-[24px] py-[14px] mt-8 bg-greynormal text-white rounded-[8px] font-normal flex justify-center items-center transition"
            disabled={loading}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StepOne;
