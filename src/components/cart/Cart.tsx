import { useState } from "react";
import { FiTrash2} from "react-icons/fi";
import { ActiveAddToCart } from "../../assets/Data";
import CartItem from "./CartItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState(ActiveAddToCart);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const total = subtotal - discount;

  // Update quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove single item
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Apply promo code
  const applyPromoCode = () => {
    // Demo promo code logic
    if (promoCode.toUpperCase() === "SAVE10") {
      setDiscount(subtotal * 0.1);
      alert("Promo code applied! 10% discount added.");
    } else {
      alert("Invalid promo code");
    }
  };

  return (
    <div className="bg-greylight min-h-screen">
      <div className="flex flex-col md:flex-row items-start gap-10 mx-auto p-4 md:px-[155px] py-20">

        <div className="bg-white rounded-[8px] p-4 w-full md:max-w-[70%]">
            <h1 className="text-sm font-medium mb-6">Your Cart</h1>

            {/* Cart Items List */}
            <div className="mb-6">
            {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
            ) : (
                <ul className="space-y-4">
                {cartItems.map((item) => (
                    <li key={item.id} className="border-b border-gray-200 pb-4">
                    <CartItem
                        item={item}
                        onIncrease={() =>
                        updateQuantity(item.id, item.quantity + 1)
                        }
                        onDecrease={() =>
                        updateQuantity(item.id, item.quantity - 1)
                        }
                        onRemove={() => removeItem(item.id)}
                    />
                    </li>
                ))}
                </ul>
            )}
            </div>

            {/* Clear Cart Button */}
            {cartItems.length > 0 && (
            <button
                title="Clear Cart"
                onClick={clearCart}
                className="flex items-center text-red-500 hover:text-red-700 text-sm"
            >
                <FiTrash2 size={16} className="mr-1" />
                Remove All Items
            </button>
            )}
        </div>

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
                onClick={applyPromoCode}
                className="p-2 border border-greylight bg-greylight hover:bg-transparent rounded-md text-greynormal px-4 py-2 transition-colors">Apply</button>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-6">
            <h2 className="text-sm font-semibold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                </div>
                )}
            </div>

            <div className="flex justify-between border-t pt-3 font-medium text-sm">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>
            </div>

            {/* Checkout Button */}
            <button
            disabled={cartItems.length === 0}
            className={`w-full mt-8 py-3 rounded-md font-bold ${
                cartItems.length === 0
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
