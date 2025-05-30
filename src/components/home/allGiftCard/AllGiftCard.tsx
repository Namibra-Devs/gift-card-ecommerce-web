// AllGiftCard.tsx
import React, { useEffect, useState } from "react";
import GiftCard from "./GiftCard";
import { FiLoader } from "react-icons/fi";
import Banner from "../Banner";
import axios from "axios";
import { getGiftCards } from "../../../services/giftCardService";
import type { GiftCard as GiftCardType } from "../../../types/giftCard";


const AllGiftCard = () => {
  const [giftCards, setGiftCards] = useState<GiftCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGiftCards = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getGiftCards();

        if (Array.isArray(response) && response.length > 0) {
          setGiftCards(response);
        } else {
          setError("No gift cards available.");
        }
      } catch (err) {
        setError(
          axios.isAxiosError(err) && err.response?.data?.message
            ? err.response.data.message
            : "Failed to load gift cards. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGiftCards();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <FiLoader className="animate-spin text-2xl mr-2" />
        <span>Loading gift cards...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-1 md:gap-y-14">
      {giftCards.map((item, index) => (
        <React.Fragment key={item._id}>
          <GiftCard item={item} />
         {/* Full-width banner after 5th card */}
         {index === 5 && (
            <div className="col-span-2 md:col-span-3">
              <Banner />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default AllGiftCard;