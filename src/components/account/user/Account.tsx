import { useState } from "react";
import { UseAuthProfile } from "../../../context/profile/UseAuthProfile";
import LinkEmailModal from "./modals/LinkEmailModal";
import AccountEditModal from "./modals/AccountEditModal";
import { countries } from "../../register/CountryCodes"
import NotificationModal from "./modals/NotificationModal";

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

      {/* Modal for editing user account details */}
      <AccountEditModal modalOpen={modalOpen} setModalOpen={setModalOpen} editField={editField} inputValue={inputValue} setInputValue={setInputValue} handleSave={handleSave} countries={countries} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
      {/* Modal for Linking new Email Address */}
      <LinkEmailModal emailLinkModal={emailLinkModal}  setEmailLinkModal={setEmailLinkModal} emailToLink={emailToLink} setEmailToLink={setEmailToLink} handleLinkEmail={handleLinkEmail} />
      {/* Notification Modal */}
      <NotificationModal notification={notification} />
    </div>
  );
};

export default Account;