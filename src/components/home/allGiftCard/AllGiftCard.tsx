import { useEffect, useState } from "react";
import GiftCard from "./GiftCard"

import Banner from "../Banner";
import { GiftCardItem } from "../../../context/Type";
import axios from "axios";

const AllGiftCard = () => {
  const [giftCards, setGiftCards] = useState<GiftCardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGiftCards = async () => {
      try {  
        const token = import.meta.env.VITE_API_TOKEN;

        const apiUrl = import.meta.env.VITE_API_URL;

        // const token = localStorage.getItem("authToken"); // Retrieve token from storage
        if(!token){
          console.log("NO token found, please login.");
          return;
        }
        const response = await axios.get(`${apiUrl}/gift-cards`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });
        setGiftCards(response.data.data); // The API returns data inside `data`
      } catch (err) {
        setError("Failed to load gift cards."); 
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGiftCards();
  }, []);

  if (loading) return <p className="animate-pulse">Loading...</p>;
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