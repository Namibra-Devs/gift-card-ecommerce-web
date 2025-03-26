import { useEffect, useState } from "react";
import GiftCard from "./GiftCard";
import { FiLoader } from "react-icons/fi";
import Banner from "../Banner";
import { GiftCardItem } from "../../../context/Type";
import axios from "axios";
// import api from "../../../context/api"; // Import Axios 

const AllGiftCard = () => {
  const [giftCards, setGiftCards] = useState<GiftCardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGiftCards = async () => {
      try {
        const response = await axios.get("https://gift-card-ecommerce-api.onrender.com/api/gift-cards");
        setGiftCards(response.data.data);
      } catch (err) {
        setError("Failed to load gift cards.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGiftCards();
  }, []);

  if (loading) return <p className="animate-pulse flex items-center gap-2"><FiLoader className="animate-spin"/>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-14">

      {giftCards.map((item, index) => (
        <div key={item._id}>
          <GiftCard item={item} />
          {index === 5 && <Banner />}
        </div>
      ))}
    </div>
  );
};

export default AllGiftCard;