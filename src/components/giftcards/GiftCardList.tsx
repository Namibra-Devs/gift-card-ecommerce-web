import { useEffect, useState } from "react";
import { getAllGiftCards} from "../../api/giftCardApi";
import { useNavigate } from "react-router-dom";

interface GiftCard {
  id: string;
  title: string;
  image: string;
  price: number;
}

const GiftCardList = () => {
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGiftCards = async () => {
      try {
        const data = await getAllGiftCards();
        setGiftCards(data);
      } catch (error) {
        console.error("Error fetching gift cards:", error);
      }
    };
    fetchGiftCards();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      {giftCards.map((card) => (
        <div 
          key={card.id} 
          className="bg-white p-4 shadow-md cursor-pointer"
          onClick={() => navigate(`/giftcard/${card.id}`)}
        >
          <img src={card.image} alt={card.title} className="w-full h-40 object-cover" />
          <h3 className="text-lg font-bold">{card.title}</h3>
          <p className="text-green-500">${card.price}</p>
        </div>
      ))}
    </div>
  );
};

export default GiftCardList;
