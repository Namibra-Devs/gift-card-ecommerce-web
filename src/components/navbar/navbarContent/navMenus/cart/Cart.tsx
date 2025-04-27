import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../../../context/useAuth";
import { useCartContext } from "../../../../../context/cart/CartContext";
import CartCard from "./CartCard";
import { Link } from "react-router-dom";

// import { current } from "@reduxjs/toolkit";
const Cart = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  // Get cart data
  const {cart} = useCartContext();
  

  return (
    <>
      <div className="relative">
        <div
          className={`flex items-center gap-2 cursor-pointer rounded-[4px] p-[6px] ${
            cartOpen ? "bg-greylight " : "hover:bg-greylight duration-700"
          }`}
          onClick={() => setCartOpen(!cartOpen)}>
            
          <img
            src="/icons/shopping-cart.png"
            alt="Cart Icon"
            className="cursor-pointer"
          />
          <span className="text-greynormal">Cart</span>
        </div>
        
        {isAuthenticated && cart.count > 0 && (
          <span className="absolute -top-2.5 left-2.5 bg-rednormal flex items-center justify-center text-white text-xs w-5 h-5 rounded-full">
            {cart.count}
          </span>
        )}

        {isAuthenticated && cartOpen && (
          <div 
            className="relative">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -right-16 top-2 w-[465px] p-[10px] shadow-sm bg-white border border-greylight rounded-[8px]"
            >
              {cart?.items?.length > 0 ? (
                <>
                  {cart.items.map((item) => (
                    <CartCard key={item.giftCardId} item={item} />
                  ))}
                  <div>
                    <div className="flex items-center my-4 py-[18px] px-[16px]">
                      <span className="text-greynormal">Total Cart</span>
                      <span className="text-greynormal ml-auto">${cart.total?.toFixed(2)}</span>
                    </div>
                    <Link to="/cart">
                      <button className="mt-2 w-full bg-greynormal text-white py-[10px] px-[16px] rounded-[8px]">
                        View Cart
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                <p className="py-4 text-center text-grey">Your cart is empty!</p>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;