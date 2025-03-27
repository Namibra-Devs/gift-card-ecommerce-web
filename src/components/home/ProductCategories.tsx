import { useEffect, useState, JSX } from "react";
import AllGiftCard from "./allGiftCard/AllGiftCard";
import AppStore from "./appStore/AppStore";
import Shopping from "./shopping/Shopping";

const ProductCategories = () => {
  const [filter, setFilter] = useState<string>(
    localStorage.getItem("productCategoriesFilter") || "AllGiftCard"
  );

  const [product, setProduct] = useState<JSX.Element | null>(null);

  useEffect(() => {
    localStorage.setItem("productCategoriesFilter", filter);
    switch(filter){
        case "AllGiftCard": setProduct (<AllGiftCard/>); break;
        case "AppStore" : setProduct (<AppStore/>); break;
        case "Shopping" : setProduct(<Shopping/>); break; 
        default: setProduct(null); break;
    }
  }, [filter]);

  return (
    <div className="">
        <div className="flex items-center gap-2 md:gap-6 w-full border-b border-greylight px-4 md:px-[255px] pb-6 scrollbar-hide overflow-x-auto -ms-overflow-style: none scrollbar-width: none">
            <button onClick={() => setFilter("AllGiftCard")} className={`px-[16px] py-[10px] rounded-[8px] ${filter === "AllGiftCard" ? "bg-greylight text-greynormal" : "bg-white text-greynormal"}`}>All Gift Cards</button>
            <button onClick={() => setFilter("AppStore")} className={`px-[16px] py-[10px] rounded-[8px] ${filter === "AppStore" ? "bg-greylight text-greynormal" : "bg-white text-greynormal"}`}>App Store</button>
            <button onClick={() => setFilter("Shopping")} className={`px-[16px] py-[10px] rounded-[8px] ${filter === "Shopping" ? "bg-greylight text-greynormal" : "bg-white text-greynormal"}`}>Shopping</button>
        </div>

        <section className="mt-4 px-4 md:px-[255px]">{product} </section>
    </div>
  )
};

export default ProductCategories;
