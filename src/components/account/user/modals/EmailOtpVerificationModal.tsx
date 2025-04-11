import React from "react";

interface EmailOtpVerificationModalProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  email: string;
  emailOtp: string[];
  handleOtpChange: (element: HTMLInputElement, index: number) => void;
  resendEmailOtp: () => void;
}

const EmailOtpVerificationModal: React.FC<EmailOtpVerificationModalProps> = ({
  isOpen,
  onClose,
  email,
  emailOtp,
  handleOtpChange,
  resendEmailOtp,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
     <div className="bg-white rounded-lg max-w-md w-full overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-greylight">
            <h3 className="font-medium">Verify Email</h3>
            <button onClick={() => onClose(false)} className="h-7 w-7 flex items-center justify-center rounded-full bg-white text-grey">
                <img src="/icons/close.png" alt="Close" className="w-5 h-5" />
            </button>
        </div>

        <div className="p-6 mt-4">
            <h3 className="text-xl font-medium mb-4">Verify your email</h3>
            <p className="mb-4 text-grey">Enter the verification code sent to your email</p>
            
            <div className="mb-6">
            <p className="font-medium">{email}</p>
            </div>
            
            <div className="flex justify-between mb-6">
            {emailOtp.map((digit, index) => (
                <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e.target as HTMLInputElement, index)}
                onFocus={(e) => e.target.select()}
                className="w-14 h-14 bg-greylight border ring:border-gray-300 rounded text-center text-xl"
                placeholder="0"
                title={`Enter digit ${index + 1} of the OTP`}
                />
            ))}
            </div>
            
            <div className="text-left">
                <button 
                    onClick={resendEmailOtp}
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

export default EmailOtpVerificationModal;