import { useState } from "react";
import { UseAuthProfile } from "../../../context/profile/UseAuthProfile";

// Country List (Flag, Code, Name)
const countries = [
  { code: "+1", name: "USA", flag: "🇺🇸" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+233", name: "Ghana", flag: "🇬🇭" },
  { code: "+234", name: "Nigeria", flag: "🇳🇬" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
];

type UserField = 'phone' | 'firstName' | 'lastName' | 'email' | 'username';

const Account = () => {
  const { user, loading } = UseAuthProfile();
  const [userData, setUserData] = useState({
    phone: user?.phone || "+233 02444444444",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "username",
    email: user?.email || "example@example.com",
    newEmail: user?.newEmail || "newemail@new.com",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editField, setEditField] = useState<UserField | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.code === "+233") || countries[0]);

  const [notification, setNotification] = useState<{type: 'success' | 'error'; message: string} | null>(null);
  const [emailLinkModal, setEmailLinkModal] = useState(false);
  const [emailToLink, setEmailToLink] = useState("");

  const handleEdit = (field: UserField) => {
    setEditField(field);
    if (field === 'phone') {
      // Split existing phone number into country code and number
      const [code, ...numberParts] = userData.phone.split(' ');
      const number = numberParts.join(' ');
      const country = countries.find(c => c.code === code) || countries[0];
      setSelectedCountry(country);
      setPhoneNumber(number);
      setInputValue(number);
    } else {
      setInputValue(userData[field]);
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editField) {
      const valueToSave = editField === 'phone' 
        ? `${selectedCountry.code} ${phoneNumber}`
        : inputValue;

      // Simulate API call
      setTimeout(() => {
        setUserData(prev => ({ ...prev, [editField]: valueToSave }));
        setModalOpen(false);
        showNotification('success', `${editField.replace(/([A-Z])/g, " $1")} updated successfully`);
      }, 1000);
    }
  };

  const handleLinkEmail = () => {
    // Simulate email linking API call
    setTimeout(() => {
      setEmailLinkModal(false);
      showNotification('success', 'Email linked successfully');
      setUserData(prev => ({ ...prev, email: emailToLink }));
    }, 1000);
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data available.</p>;

  return (
    <div>
      <h2 className="mb-4">Profile</h2>
      <div className="bg-white md:bg-greylight min-w-fit px-6 py-3 rounded-[16px]">
        {(['firstName', 'lastName', 'username', 'email', 'phone'] as UserField[]).map((field) => (
          <div key={field} className="flex items-center justify-between py-3">
            <span className="capitalize font-medium text-grey md:text-greynormal">
              {field.replace(/([A-Z])/g, " $1")}
            </span>
            <div className="flex items-center justify-end gap-6">
              <span className="text-grey">{userData[field]}</span>
              <button
                onClick={() => handleEdit(field)}
                className="bg-greynormal text-white hover:bg-grey duration-700 rounded-[9px] py-[13px] px-[24px] hidden md:block"
              >
                Edit
              </button>
              <button
                onClick={() => handleEdit(field)}
                className="block md:hidden"
              >
                <img src="/icons/edit.png" alt="Edit" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Email Section */}
      <div className="mt-10">
        <h3 className="mb-4">Link Email</h3>
        <div className="bg-white md:bg-greylight min-w-fit px-6 py-7 rounded-[16px] flex justify-between items-center">
          <span className="text-greynormal">Email</span>
          <div className="flex items-center justify-end gap-6">
            <span className="text-grey">{userData.newEmail}</span>
            <button
              onClick={() => setEmailLinkModal(true)}
              className="bg-greynormal text-white hover:bg-grey duration-700 rounded-[9px] py-[13px] px-[24px] hidden md:block"
            >
              Link
            </button>
            <button
              onClick={() => setEmailLinkModal(true)}
              className="block md:hidden"
            >
              <img src="/icons/link.png" alt="Link" />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {modalOpen && (
        <div
          onClick={(e) => {
          if (e.target === e.currentTarget) {
            setModalOpen(false);
          }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-overlay bg-opacity-5 p-4">
          <div className="flex flex-col justify-between bg-white rounded-[8px] shadow-lg w-[558px] h-[300px] overflow-hidden">
            <div className="flex items-center justify-between bg-greylight p-4">
              <h3 className="text-[15px] font-medium capitalize">Edit {editField}</h3>
              <button 
                type="button" 
                onClick={() => setModalOpen(false)} 
                className="h-7 w-7 flex items-center justify-center rounded-full bg-white text-grey"
              >
                <img src="/icons/close.png" alt="Close Icon" />
              </button>
            </div>
            
            <div className="flex flex-col px-4">
              <label htmlFor="phoneNumber" className="text-greynegative capitalize mb-3">
                {editField}
              </label>
              {editField === 'phone'? (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 w-full">
                      <label htmlFor="countryCode" className="sr-only">Country Code</label>
                      <select
                        id="countryCode"
                        name="countryCode"
                        value={selectedCountry.code}
                        onChange={(e) => {
                          const country = countries.find(c => c.code === e.target.value);
                          if (country) setSelectedCountry(country);
                        }}
                        className="bg-transparent focus:outline-none border border-greylight px-2 py-[21px]  w-1/4 rounded-[8px]"
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
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="bg-greylight w-full px-[24px] py-[21px] rounded-[8px]"
                      />
                    </div>
                  </div>
              ) : (
                <input
                  type={editField === 'email' ? 'email' : 'text'}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="bg-greylight max-w-full px-[24px] py-[21px] rounded-[8px]"
                  placeholder={`Enter ${editField}`}
                />
              )}
            </div>

            <div className="bg-greylight p-4 flex justify-end space-x-4">
              <button 
                onClick={() => setModalOpen(false)}
                className="px-10 py-4 bg-white rounded-[8px] text-grey"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-10 py-4 bg-greynormal text-white rounded-[8px]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Link Email Modal */}
      {emailLinkModal && (
        <div
          onClick={(e) => {
          if (e.target === e.currentTarget) {
            setEmailLinkModal(false);
          }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-overlay bg-opacity-50 p-4">
          <div className="flex flex-col justify-between bg-white rounded-[8px] shadow-lg w-[558px] h-[300px] overflow-hidden">
            <div className="flex justify-between items-center p-4 bg-greylight">
              <h3 className="font-medium">Link Email</h3>
              <button onClick={() => setEmailLinkModal(false)} className="h-7 w-7 flex items-center justify-center rounded-full bg-white text-grey">
                <img src="/icons/close.png" alt="Close" className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-greynegative mb-2">Email Address</p>
              <input
                type="email"
                value={emailToLink}
                onChange={(e) => setEmailToLink(e.target.value)}
                className="bg-greylight w-full px-[24px] py-[21px] rounded-[8px]"
                placeholder="Enter email"
              />
            </div>
            <div className="bg-greylight p-4 flex justify-end space-x-4">
              <button 
                onClick={() => setEmailLinkModal(false)}
                className="px-10 py-4 bg-white rounded-[8px] text-grey"
              >
                Cancel
              </button>
              <button 
                onClick={handleLinkEmail}
                className="px-10 py-4 bg-greynormal text-white rounded-[8px]"
              >
                Link Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Status Modal*/}
      {notification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay bg-opacity-5 p-4">
          <div className="flex flex-col justify-between items-center text-center bg-white p-8 rounded-[8px] max-w-5xl">
            {notification.message && (
              <div className="flex flex-col items-center text-center gap-6">
                <span className="font-meidum capitalize">{notification.message}</span>
                <img
                  src={
                    notification.type === "success"
                      ? "/icons/check-mark.png"
                      : notification.type === "error"
                      ? "/icons/error.png"
                      : ""
                  }
                  alt={
                    notification.type === "success"
                      ? "Success"
                      : notification.type === "error"
                      ? "Error"
                      : ""
                  }
                  className="w-20 h-20 mb-2"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;