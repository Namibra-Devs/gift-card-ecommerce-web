import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCreditCard, FiSmartphone, FiDollarSign, FiShoppingCart } from 'react-icons/fi';
import ApiService from '../../services/apiService';
import { CartPaymentRequest } from '../../types/api';
import toast from 'react-hot-toast';

interface CartItem {
  _id: string;
  giftCardId: string;
  name?: string;
  image?: string;
  price: number;
  quantity: number;
}

interface CartPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalAmount: number;
  onPaymentSuccess?: (paymentData: any) => void;
}

const CartPaymentModal: React.FC<CartPaymentModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  totalAmount,
  onPaymentSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'mobile_money' | 'bank' | 'card'>('mobile_money');
  const [loading, setLoading] = useState(false);
  const [clearCart, setClearCart] = useState(true);
  const [formData, setFormData] = useState({
    mobileNetwork: 'MTN' as 'MTN' | 'VODAFONE' | 'AIRTELTIGO',
    mobileNumber: '',
    bankName: 'Ghana Commercial Bank',
    accountNumber: '',
  });

  const mobileNetworks = [
    { value: 'MTN', label: 'MTN' },
    { value: 'VODAFONE', label: 'Vodafone' },
    { value: 'AIRTELTIGO', label: 'AirtelTigo' },
  ];

  const banks = [
    { value: 'Ghana Commercial Bank', label: 'Ghana Commercial Bank' },
    { value: 'Ecobank Ghana', label: 'Ecobank Ghana' },
    { value: 'Standard Chartered Bank', label: 'Standard Chartered Bank' },
    { value: 'Absa Bank Ghana', label: 'Absa Bank Ghana' },
    { value: 'Fidelity Bank Ghana', label: 'Fidelity Bank Ghana' },
    { value: 'Zenith Bank Ghana', label: 'Zenith Bank Ghana' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      const paymentData: CartPaymentRequest = {
        cartItemIds: cartItems.map(item => item._id),
        paymentMethod,
        currency: 'GHS',
        clearCart,
      };

      // Add method-specific data
      if (paymentMethod === 'mobile_money') {
        paymentData.mobileNetwork = formData.mobileNetwork;
        paymentData.mobileNumber = formData.mobileNumber;
      } else if (paymentMethod === 'bank') {
        paymentData.bankName = formData.bankName;
        paymentData.accountNumber = formData.accountNumber;
      }

      const result = await ApiService.processCartPayment(paymentData);

      if (result.success) {
        toast.success(result.message || 'Payment initiated successfully');
        onPaymentSuccess?.(result.data);
        onClose();
      } else {
        toast.error(result.message || 'Payment failed');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'mobile_money':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Network
              </label>
              <select
                value={formData.mobileNetwork}
                onChange={(e) => handleInputChange('mobileNetwork', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {mobileNetworks.map((network) => (
                  <option key={network.value} value={network.value}>
                    {network.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                placeholder="0551234567"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'bank':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name
              </label>
              <select
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {banks.map((bank) => (
                  <option key={bank.value} value={bank.value}>
                    {bank.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number (Optional)
              </label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                placeholder="Enter your account number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'card':
        return (
          <div className="text-center py-8">
            <FiCreditCard className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-gray-600">
              Card payment will redirect you to a secure payment gateway.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-2">
              <FiShoppingCart className="text-xl text-blue-600" />
              <h2 className="text-xl font-semibold">Cart Checkout</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium mb-3">Order Summary ({cartItems.length} items)</h3>
              <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-8 h-8 rounded object-cover"
                        />
                      )}
                      <span className="truncate">{item.name}</span>
                    </div>
                    <span className="text-gray-600">
                      {item.quantity} × GHS {item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center font-semibold border-t pt-3">
                <span>Total:</span>
                <span>GHS {totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Cart Options */}
            <div className="mb-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={clearCart}
                  onChange={(e) => setClearCart(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Clear cart after payment</span>
              </label>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Payment Method</h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentMethod('mobile_money')}
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    paymentMethod === 'mobile_money'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <FiSmartphone className="mx-auto mb-1" />
                  <span className="text-xs">Mobile Money</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    paymentMethod === 'bank'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <FiDollarSign className="mx-auto mb-1" />
                  <span className="text-xs">Bank</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <FiCreditCard className="mx-auto mb-1" />
                  <span className="text-xs">Card</span>
                </button>
              </div>
            </div>

            {/* Payment Form */}
            <div className="mb-6">
              {renderPaymentForm()}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={loading || cartItems.length === 0}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Processing...' : `Pay GHS ${totalAmount.toFixed(2)}`}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CartPaymentModal;
