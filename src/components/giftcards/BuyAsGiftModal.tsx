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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
      <h2 className="text-lg font-bold">Send "{giftCard.title}" as a Gift</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block mt-2">
            Recipient's Email
            <input
              type="email"
              placeholder="Recipient's Email"
              className="w-full p-2 border rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="block mt-2">
            Your Name
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 border rounded mt-1"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              required
            />
          </label>
          <label className="block mt-2">
            Add a personal message
            <textarea
              placeholder="Add a personal message"
              className="w-full p-2 border rounded mt-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <label className="block mt-2">
            Send Date
            <input
              type="date"
              className="w-full p-2 border rounded mt-1"
              value={sendDate}
              onChange={(e) => setSendDate(e.target.value)}
              required
            />
          </label>
          <div className="flex justify-between mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-black text-white rounded" disabled={loading}>
              {loading ? "Processing..." : "Send Gift"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyAsGiftModal;
