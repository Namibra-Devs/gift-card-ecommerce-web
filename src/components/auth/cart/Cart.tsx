import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useCartContext } from "../../../context/cart/CartContext";

interface CartItem {
  giftCardId: string;
  price: number;
  quantity: number;
  name?: string;
  image?: string;
}

const Cart = () => {
  const [promoCode, setPromoCode] = useState("");
  const {
    cart = { items: [], total: 0 },
    incrementQuantity,
    decrementQuantity,
    fetchCart,
    removeFromCart,
    clearCart,
  } = useCartContext();

  useEffect(() => {
    const loadCart = async () => {
      try {
        await fetchCart();
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    };

    loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  return (
    <div className="bg-greylight min-h-screen">
      <div className="flex flex-col md:flex-row items-start gap-10 mx-auto p-4 md:px-[155px] py-20">
        {/* Cart Items Section */}
        <div className="bg-white rounded-[8px] p-4 w-full md:max-w-[70%]">
          <h1 className="text-sm font-medium mb-6">Your Cart</h1>

          {cart.items.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Link
                to="/gift-cards"
                className="text-blue-600 hover:text-blue-800"
              >
                Browse Gift Cards
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6 space-y-4">
                {cart.items.map((item) => (
                  <CartItem
                    key={item.giftCardId}
                    item={item}
                    onIncrease={() => incrementQuantity(item.giftCardId)}
                    onDecrease={() => decrementQuantity(item.giftCardId)}
                    onRemove={() => removeFromCart(item.giftCardId)}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={clearCart}
                className="flex items-center text-red-500 hover:text-red-700 text-sm"
              >
                <FiTrash2 size={16} className="mr-1" />
                Remove All Items
              </button>
            </>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="bg-white rounded-[8px] p-4 w-full md:max-w-[40%]">
          {/* Promo Code Section */}
          <div className="flex gap-2 mb-6 max-w-full">
            <div className="w-full flex items-center gap-3 p-2 border border-greylight rounded-md">
              <img src="/icons/coupon.png" alt="Coupon" />
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1 focus:outline-none focus:ring-0"
              />
            </div>
            <button
              // onClick={applyPromoCode}
              className="p-2 border border-greylight bg-greylight hover:bg-transparent rounded-md text-greynormal px-4 py-2 transition-colors"
            >
              Apply
            </button>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-6">
            <h2 className="text-sm font-semibold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              {/* Add discount display when implemented */}
              {/* {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )} */}
            </div>

            <div className="flex justify-between border-t pt-3 font-medium text-sm">
              <span>Total</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            disabled={cart.items.length === 0}
            className={`w-full mt-8 py-3 rounded-md font-bold ${
              cart.items.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            } transition-colors`}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
