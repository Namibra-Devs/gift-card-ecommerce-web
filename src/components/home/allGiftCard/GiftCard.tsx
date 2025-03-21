import { motion } from "framer-motion";
import { AllGiftCardItems } from "../../../assets/Data";

const GiftCard = ({ item }: { item: (typeof AllGiftCardItems)[0] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }} 
      className="flex flex-col items-start rounded-[16px] gap-3 max-w-[317px] min-h-[210px]">
      <div
        className={`${item.color} flex justify-center rounded-[16px] w-full h-full hover:scale-105 transition`}
        style={{ backgroundColor: item.color }}
      >
        <img src={item.image} alt={item.name} className="object-contain w-[120px]" />
      </div>
      <p className="font-medium">{item.name}</p>
    </motion.div>
  );
};

export default GiftCard;