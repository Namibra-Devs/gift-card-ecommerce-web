import { AllGiftCardItems } from "../../../assets/Data";

const GiftCard = ({ item }: { item: (typeof AllGiftCardItems)[0] }) => {
  return (
    <div className="flex flex-col items-start rounded-[16px] gap-3 max-w-[317px] min-h-[195px]">
      <div
        className={`${item.color} flex justify-center rounded-[16px] w-full h-full hover:scale-105 transition`}
        style={{ backgroundColor: item.color }}
      >
        <img src={item.image} alt={item.name} className="object-contain w-[120px]" />
      </div>
      <p className="font-medium">{item.name}</p>
    </div>
  );
};

export default GiftCard;