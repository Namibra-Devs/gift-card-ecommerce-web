import GiftCard from "./GiftCard"
import { AllGiftCardItems } from "../../../assets/Data";
import Banner from "../Banner";

const AllGiftCard = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-14">
      {AllGiftCardItems.map((item, index) => (
        <>
        <GiftCard key={item.id} item={item}/>
        {index === 5 && <Banner />}
        </>
      ))}
    </div>
  )
}

export default AllGiftCard