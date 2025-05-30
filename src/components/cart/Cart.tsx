import { useState, useEffect } from "react";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import CartItem from "./CartItem";
import { useCartContext } from "../../context/cart/CartContext";
import PaymentModal from "../payment/PaymentModal";
import CartPaymentModal from "../payment/CartPaymentModal";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

interface CartItem {
  giftCardId: string;
  price: number;
  quantity: number;
  name?: string;
  image?: string;
}

const Cart = () => {
  const [promoCode, setPromoCode] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCartPaymentModal, setShowCartPaymentModal] = useState(false);
  const [selectedCartItem, setSelectedCartItem] = useState<any>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    fetchCart,
    removeFromCart,
    clearCart,
    cleanupExpiredItems
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
  }, []); // Remove fetchCart from dependencies to prevent infinite loop

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (cart.items.length === 0) {
      return;
    }

    // Use cart checkout for multiple items
    setShowCartPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentData: any) => {
    console.log('Payment successful:', paymentData);
    // Optionally clear cart or redirect to success page
    // clearCart();
    // navigate('/payment-success');
  };

  return (
    <div className="bg-greylight min-h-screen">
      <div className="flex flex-col md:flex-row items-start gap-10 mx-auto p-4 md:px-[155px] py-20">
        {/* Cart Items Section */}
        <div className="bg-white rounded-[8px] p-4 w-full md:max-w-[70%]">
          <h1 className="text-sm font-medium mb-6">Your Cart</h1>

          {/* Cart Items List */}
          <div className="mb-6">
            {cart.loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <span className="ml-2">Loading cart...</span>
              </div>
            ) : cart.error ? (
              <div className="text-center py-8">
                <p className="text-red-500 mb-4">{cart.error}</p>
                <button
                  onClick={() => fetchCart()}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Retry
                </button>
              </div>
            ) : cart.items.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <ul className="space-y-4">
                {cart.items.map((item) => (
                  <li key={item.giftCardId} className="border-b border-gray-200 pb-4">
                    <CartItem
                      item={item}
                      onIncrease={() => incrementQuantity(item.giftCardId)}
                      onDecrease={() => decrementQuantity(item.giftCardId)}
                      onRemove={() => removeFromCart(item.giftCardId)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Unavailable Items Section */}
          {cart.unavailableItems && cart.unavailableItems.length > 0 && (
            <div className="mb-6 border-t pt-4">
              <h2 className="text-sm font-medium mb-4 text-red-600">Unavailable Items</h2>
              <ul className="space-y-4">
                {cart.unavailableItems.map((item) => (
                  <li key={item.giftCardId} className="border-b border-gray-200 pb-4 opacity-60">
                    <CartItem
                      item={item}
                      onIncrease={() => {}} // Disabled for unavailable items
                      onDecrease={() => {}} // Disabled for unavailable items
                      onRemove={() => removeFromCart(item.giftCardId)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cart Actions */}
          {cart.items.length > 0 && (
            <div className="flex items-center gap-4">
              <button
                onClick={cleanupExpiredItems}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm"
              >
                Clean Expired Items
              </button>
              <button
                title="Clear Cart"
                onClick={clearCart}
                className="flex items-center text-red-500 hover:text-red-700 text-sm"
              >
                <FiTrash2 size={16} className="mr-1" />
                Remove All Items
              </button>
            </div>
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
                <span>${((cart as any).totalAmount || 0).toFixed(2)}</span>
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
              <span>${((cart as any).totalAmount || 0).toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={cart.items.length === 0}
            className={`w-full mt-8 py-3 rounded-md font-bold flex items-center justify-center gap-2 ${
              cart.items.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            } transition-colors`}
          >
            <FiShoppingCart size={18} />
            Checkout Cart ({cart.items.length} items)
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedCartItem && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          giftCard={{
            _id: selectedCartItem.giftCardId,
            name: selectedCartItem.name || 'Gift Card',
            image: selectedCartItem.image,
          }}
          quantity={selectedCartItem.quantity}
          totalPrice={selectedCartItem.price * selectedCartItem.quantity}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Cart Payment Modal */}
      {showCartPaymentModal && (
        <CartPaymentModal
          isOpen={showCartPaymentModal}
          onClose={() => setShowCartPaymentModal(false)}
          cartItems={cart.items.map(item => ({
            _id: item._id || '',
            giftCardId: item.giftCardId,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
          }))}
          totalAmount={((cart as any).totalAmount || 0)}
          onPaymentSuccess={(paymentData) => {
            handlePaymentSuccess(paymentData);
            // Refresh cart after successful payment
            fetchCart();
          }}
        />
      )}
    </div>
  );
};

export default Cart;