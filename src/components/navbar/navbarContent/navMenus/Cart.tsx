import { useState } from "react";
import { motion } from "framer-motion";
import CartIcon from "../../../../../public/icons/shopping-cart.png";
import { useAuth } from "../../../../context/useAuth";

const Cart = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const isAuthenticated = useAuth();
  return (
    <>
      <div className="relative">
        <div
          className={`flex items-center gap-2 cursor-pointer rounded-[4px] p-[6px] ${
            cartOpen ? "bg-greylight " : "hover:bg-greylight duration-700"
          } `}
          onClick={() => setCartOpen(!cartOpen)}
        >
          <img src={CartIcon} alt="Cart Icon" className=" cursor-pointer" />
          <span className="text-greynormal">Cart</span>
        </div>
        {isAuthenticated ? (
          <span className="absolute -top-2.5 left-2.5 bg-rednormal text-white text-xs px-1.5 py-0.5 rounded-full">
            3
          </span>
        ) : null}

        {isAuthenticated && cartOpen && (
          <div className="bg-overlay fixed inset-0 z-10 h-full mt-[104px]">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-8 -mt-3 w-[465px] pt-[4px] px-[16px] bg-white border border-gray-50 rounded-[8px] p-4"
            >
              <ul>
                <li className="flex justify-between py-[18px] px-[16px] border-b border-greylight">
                  <span>Nintendo Gift Card</span>
                  <span>$25</span>
                </li>
                <li className="flex justify-between py-[18px] px-[16px] border-b border-greylight">
                  <span>Nintendo Gift Card</span>
                  <span>$25</span>
                </li>
                <li className="flex justify-between py-[18px] px-[16px] border-b border-greylight">
                  <span>Nintendo Gift Card</span>
                  <span>$25</span>
                </li>
              </ul>
              <div className="flex items-center my-4 py-[18px] px-[16px]">
                <span className="text-greynormal">Total Cart</span>
                <span className="text-greynormal ml-auto">$75</span>
              </div>
              <button className="mt-2 w-full bg-greynormal text-white py-[10px] px-[16px] rounded-[8px]">
                View Cart
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
