import { useState } from "react";
import axios from "axios";
import { countries } from "./CountryCodes";

const RegisterAcc = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    countryCode: "+233", // Default to Ghana
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, countryCode: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checked) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "https://gift-card-ecommerce-api.onrender.com/api/auth/register",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: `${formData.countryCode}${formData.phone}`, // Send phone with country code
          password: formData.password,
        }
      );

      if (response.data.success) {
        setSuccess("Account created successfully! Please verify your email.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          referralCode: "",
          countryCode: "+233",
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Registration failed");
      } else {
        setError("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-20 bg-greylight">
      <div className="bg-white p-[40px] rounded-[24px] w-full max-w-lg">
        {/* Logo */}
        <a href="/" className="flex items-center justify-center mb-6">
          <img src="/favicon.png" alt="PrepaidBanc" />
        </a>

        <div className="flex flex-wrap justify-between items-center">
          {/* Sign-in Link */}
          <p className="text-sm text-gray-500 text-left">
            Already have an account?
            <a href="/login" className="text-linkcolor underline ml-2">
              Sign in
            </a>
          </p>

         <div>
           {/* Status Messages */}
           {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
         </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="flex space-x-2">
            <div className="flex flex-col">
              <label htmlFor="FirstName" className="text-greynegative mb-3">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full bg-greylight px-[24px] py-[13px] rounded-[8px]"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-greynegative mb-3">
                Surname
              </label>
              <input
                type="text"
                name="lastName"
                title="Enter your last name"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full bg-greylight px-[24px] py-[13px] rounded-[8px]"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-greynegative mb-3">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-greylight px-[24px] py-[13px] rounded-[8px]"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="referralCode" className="text-greynegative mb-3">
              Referral Code
            </label>
            <input
              type="text"
              name="referralCode"
              title="Enter your referral code"
              placeholder="Enter your referral code"
              value={formData.referralCode}
              onChange={handleChange}
              className="w-full bg-greylight px-[24px] py-[13px] rounded-[8px]"
            />
          </div>
          {/* Phone Number Field */}
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="text-greynegative mb-3">
              Phone Number
            </label>
            <div className="flex space-x-2 relative">
              <label htmlFor="countryCode" className="sr-only">Country Code</label>
              <select
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleCountryChange}
                className="bg-transparent focus:outline-none border border-greylight p-3 w-1/4 rounded-[8px]"
              >
             
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="phone"
                placeholder="0200000000"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-greylight px-[24px] py-[13px] rounded-[8px]"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-greynegative mb-3">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="***********"
              value={formData.password}
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
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full bg-greylight px-[24px] py-[13px] rounded-[8px]"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              title="Agree to terms"
              checked={checked}
              onChange={() => setChecked(!checked)}
              className="w-4 h-4"
            />
            <p className="text-xs text-gray-600">
              By registering an account, you agree to comply with our Terms of
              Service Privacy Policy
            </p>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full px-[24px] py-[14px] mt-8 bg-greynormal text-white rounded-[8px] font-normal flex justify-center items-center"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterAcc;
