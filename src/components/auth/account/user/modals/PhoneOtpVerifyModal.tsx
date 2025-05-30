import React from "react";

interface OtpVerificationModalProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  phoneNumber: string;
  phoneOtp: string[];
  handlePhoneOtpChange: (element: HTMLInputElement, index: number) => void;
  resendPhoneOtp: () => void;
}

const PhoneOtpVerifyModal: React.FC<OtpVerificationModalProps> = ({
  isOpen,
  onClose,
  phoneNumber,
  phoneOtp,
  handlePhoneOtpChange,
  resendPhoneOtp,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-overlay bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-greylight">
            <h3 className="font-medium">Edit Phone</h3>
            <button onClick={() => onClose(false)} className="h-7 w-7 flex items-center justify-center rounded-full bg-white text-grey">
                <img src="/icons/close.png" alt="Close" className="w-5 h-5" />
            </button>
        </div>

        <div className="p-6 mt-4">
            <h3 className="text-xl font-medium mb-4">Verify your account</h3>
            <p className="mb-4 text-grey">Enter the verification code sent to your phone</p>
            
            <div className="mb-6">
            <span className="font-medium">{phoneNumber}</span>
            </div>
            
            <div className="flex items-center justify-between gap-4 mb-6">
            {phoneOtp.map((digit, index) => (
                <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                placeholder="0"
                onChange={(e) => handlePhoneOtpChange(e.target as HTMLInputElement, index)}
                onFocus={(e) => e.target.select()}
                className="w-14 h-14 bg-greylight border ring:border-gray-300 rounded text-center text-xl"
                />
            ))}
            </div>
            
            <div className="text-left">
                <button 
                    onClick={resendPhoneOtp}
                    className="text-grey"
                >
                    Haven't received the code? <span className="text-blue-500 hover:text-blue-700">Send again</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneOtpVerifyModal;