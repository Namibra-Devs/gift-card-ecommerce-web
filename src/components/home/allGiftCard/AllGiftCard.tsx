import GiftCard from "./GiftCard"
import { AllGiftCardItems } from "../../../assets/Data";
import Banner from "../Banner";

const AllGiftCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {AllGiftCardItems.map((item, index) => (
        <>
        <GiftCard key={item.id} item={item} />
        {index === 5 && <Banner />}
        </>
      ))}
    </div>
  )
}

export default AllGiftCard