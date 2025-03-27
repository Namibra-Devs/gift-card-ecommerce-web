import { motion } from "framer-motion";
import { GiftCardProps } from "../../../context/Type";

//To use used for Authentication, what it'll expect == { item }: GiftCardProps
const GiftCard = ({ item }: GiftCardProps ) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-start rounded-[16px] gap-3 max-w-[317px] min-h-[210px]"
    >
      <div
        className="flex justify-center rounded-[16px] w-full h-full hover:scale-105 transition">
        <img
          src={item.media[0]?.image || "/placeholder.jpg"} // Default image if missing
          alt={item.name}
          className="object-contain w-[120px]"
        />
      </div>
      <p className="font-medium">{item.name}</p>
    </motion.div>
  );
};

export default GiftCard;