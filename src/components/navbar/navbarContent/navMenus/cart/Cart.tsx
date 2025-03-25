import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../../../context/useAuth";
import { ActiveAddToCart } from "../../../../../assets/Data";
import CartCard from "./CartCard";

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
          <img
            src="/icons/shopping-cart.png"
            alt="Cart Icon"
            className=" cursor-pointer"
          />
          <span className="text-greynormal">Cart</span>
        </div>
        {isAuthenticated ? (
          <span className="absolute -top-2.5 left-2.5 bg-rednormal text-white text-xs px-1.5 py-0.5 rounded-full">
            3
          </span>
        ) : null}

        {isAuthenticated && cartOpen && (
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -right-16 top-2 w-[465px] p-[10px] shadow-sm bg-white border border-greylight rounded-[8px]"
            >
              {ActiveAddToCart.map((item) => (
                <CartCard key={item.id} item={item} />
              ))}

              <div>
                <div className="flex items-center my-4 py-[18px] px-[16px]">
                  <span className="text-greynormal">Total Cart</span>
                  <span className="text-greynormal ml-auto">$75</span>
                </div>
                <button className="mt-2 w-full bg-greynormal text-white py-[10px] px-[16px] rounded-[8px]">
                  View Cart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
