import { useState, useEffect } from "react";
import { UseAuthProfile } from "../../../context/profile/UseAuthProfile";
import LinkEmailModal from "./modals/LinkEmailModal";
import AccountEditModal from "./modals/AccountEditModal";
import { countries } from "../../register/CountryCodes"
import NotificationModal from "./modals/NotificationModal";
import PhoneOtpVerifyModal from "./modals/PhoneOtpVerifyModal";
import EmailOtpVerificationModal from "./modals/EmailOtpVerificationModal";

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

   // Phone OTP verification states
   const [otpModalOpen, setOtpModalOpen] = useState(false);
   const [phoneOtp, setPhoneOtp] = useState<string[]>(new Array(5).fill(""));
   const [newPhoneNumber, setNewPhoneNumber] = useState("");

    // Email OTP states
  const [emailOtpModalOpen, setEmailOtpModalOpen] = useState(false);
  const [emailOtp, setEmailOtp] = useState<string[]>(new Array(5).fill(""));
  const [pendingEmail, setPendingEmail] = useState("");

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
    if (editField === 'phone') {
      const fullPhoneNumber = `${selectedCountry.code} ${phoneNumber}`;
      setNewPhoneNumber(fullPhoneNumber);
      
      // Simulate sending OTP to the new phone number
      setTimeout(() => {
        setOtpModalOpen(true);
        setModalOpen(false);
      }, 1000);
    } else if (editField) {
      // For other fields, update directly
      setUserData(prev => ({ ...prev, [editField]: inputValue }));
      setModalOpen(false);
      showNotification('success', `${editField.replace(/([A-Z])/g, " $1")} updated successfully`);
    }
  };

  const handlePhoneOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;
    
    const newOtp = [...phoneOtp];
    newOtp[index] = element.value;
    setPhoneOtp(newOtp);
    
    // Focus next input
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleEmailOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;
    
    const newOtp = [...emailOtp];
    newOtp[index] = element.value;
    setEmailOtp(newOtp);
    
    // Focus next input
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  useEffect(() => {
    // Auto verify when all OTP digits are entered
    if (phoneOtp.every(digit => digit !== "") && phoneOtp.length === 5) {
      verifyPhoneOtp();
    }
  }, [phoneOtp]);

  useEffect(() => {
    // Auto verify email OTP when all digits are entered
    if (emailOtp.every(digit => digit !== "") && emailOtp.length === 5) {
      verifyEmailOtp();
    }
  }, [emailOtp]);

  const verifyPhoneOtp = () => {
    // Simulate OTP verification
    setTimeout(() => {
      // In a real app, you would verify the OTP with your backend
      const isValid = true; // Assume OTP is valid for demo
      
      if (isValid) {
        setUserData(prev => ({ ...prev, phone: newPhoneNumber }));
        setOtpModalOpen(false);
        showNotification('success', 'Phone number changed successfully');
        setPhoneOtp(new Array(5).fill("")); // Reset OTP
      } else {
        showNotification('error', 'Invalid verification code');
      }
    }, 1000);
  };

  const verifyEmailOtp = () => {
    // Simulate OTP verification
    setTimeout(() => {
      const isValid = true; // Assume OTP is valid for demo
      
      if (isValid) {
        setUserData(prev => ({ ...prev, email: pendingEmail }));
        setEmailOtpModalOpen(false);
        showNotification('success', 'Email linked successfully');
        setEmailOtp(new Array(5).fill(""));
      } else {
        showNotification('error', 'Invalid verification code');
      }
    }, 1000);
  };

  const resendPhoneOtp = () => {
    showNotification('success', 'Verification code resent to your phone');
    setPhoneOtp(new Array(5).fill(""));
  };

  const resendEmailOtp = () => {
    showNotification('success', 'Verification code resent to your email');
    setEmailOtp(new Array(5).fill(""));
  };

  const handleLinkEmail = () => {
    setPendingEmail(emailToLink);

    // Simulate sending OTP to the new email address
    setTimeout(() => {
      setEmailOtpModalOpen(true);
      setEmailLinkModal(false);
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
      {/* Phone number verification Modals */}
      <PhoneOtpVerifyModal isOpen={otpModalOpen} onClose={() => setOtpModalOpen(false)} phoneNumber={newPhoneNumber} phoneOtp={phoneOtp} handlePhoneOtpChange={handlePhoneOtpChange} resendPhoneOtp={resendPhoneOtp}/>
      {/* Modal for Email Linking OTP verification */}
      <EmailOtpVerificationModal isOpen={emailOtpModalOpen} onClose={() => setEmailOtpModalOpen(false)} email={pendingEmail}  emailOtp={emailOtp}  handleOtpChange={handleEmailOtpChange} resendEmailOtp={resendEmailOtp}/>
      {/* Modal for Linking new Email Address */}
      <LinkEmailModal emailLinkModal={emailLinkModal}  setEmailLinkModal={setEmailLinkModal} emailToLink={emailToLink} setEmailToLink={setEmailToLink} handleLinkEmail={handleLinkEmail} />
      {/* Notification Modal */}
      <NotificationModal notification={notification} />
    </div>
  );
};

export default Account;