import { useState } from "react";
import axios from "axios";
import { GiftCard } from "../../context/giftcard/Type";

interface GiftCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  giftCard: GiftCard;
}

const BuyAsGiftModal: React.FC<GiftCardModalProps> = ({ isOpen, onClose, giftCard}) => {
  const [email, setEmail] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [sendDate, setSendDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {

      const apiUrl = import.meta.env.VITE_API_BASE_URL;

      await axios.post(`${apiUrl}/gift/send`, {
        email,
        senderName,
        message,
        sendDate,
        giftCardId: giftCard.id,
      });

      alert("Gift sent successfully!");
      onClose();
    } catch (error) {
      console.error("Error sending gift:", error);
      alert("Failed to send the gift. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-overlay bg-opacity-50 z-50 flex justify-center items-end md:items-center"
      onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
      }}
    >
      <div className="w-[450px] bg-white rounded-tr-3xl rounded-tl-3xl md:rounded-lg shadow-lg overflow-hidden">

        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-7 bg-white md:bg-greylight p-4">
            <h2 className="text-[15px] font-medium ">Buy as Gift</h2>
            <button type="button" onClick={onClose} className="h-7 w-7 hidden md:flex items-center justify-center rounded-full bg-white text-grey"><img src="/icons/close.png" alt="Close Icon" /></button>
            <span className="block md:hidden h-1 w-16 bg-gray-200 rounded-2xl"></span>
        </div>

        <form onSubmit={handleSubmit} className="-mt-8 md:mt-2">
          <div className="flex flex-col gap-1 justify-between p-4 md:p-6 -mb-5">
            <label className="block mt-2 text-grey">
              Recipient's Email
              <input
                type="email"
                placeholder=""
                className="w-full py-[10px] px-[16px] border border-greylight rounded mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="block mt-2 text-grey">
              Your Name
              <input
                type="text"
                placeholder=""
                className="w-full py-[10px] px-[16px] border border-greylight  rounded mt-1"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                required
              />
            </label>
            <label className="block mt-2 text-grey">
              Add a personal message
              <textarea
                placeholder=""
                className="w-full h-28 p-2 border border-greylight rounded mt-1 resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
            <label className="block mt-2 text-grey">
              Send Date
              <input
                type="date"
                className="w-full py-[10px] px-[16px] border border-greylight  rounded mt-1"
                value={sendDate}
                onChange={(e) => setSendDate(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="bg-white md:bg-greylight p-4 flex justify-end space-x-4 mt-0 md:mt-4">
            <button type="button" onClick={onClose} className="hidden md:block px-8 py-3 bg-white text-greynormal hover:bg-greylightactive rounded">
              Cancel
            </button> 
            <button type="submit" className="min-w-full md:min-w-0 px-8 py-3 bg-black text-white rounded" disabled={loading}>
              {loading ? "Processing..." : "Send Gift"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyAsGiftModal;
