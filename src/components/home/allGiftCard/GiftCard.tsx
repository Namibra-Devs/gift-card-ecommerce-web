// GiftCard.tsx
import { motion } from "framer-motion";
import { GiftCardItem } from "../../../context/Type";

const GiftCard = ({ item }: { item: GiftCardItem }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-start rounded-[16px] gap-3 max-w-[317px] min-h-[210px]"
    >
      <div className="relative w-full aspect-square bg-gray-100 rounded-[16px] overflow-hidden">
        <img
          src={item.image || item.media[0]?.image || "/placeholder.jpg"}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-contain p-4"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/placeholder.jpg";
          }}
        />
      </div>
      <p className="font-medium text-center line-clamp-2">{item.name}</p>
    </motion.div>
  );
};

export default GiftCard;