import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCreditCard, FiSmartphone, FiDollarSign } from 'react-icons/fi';
import PaymentService, { PaymentFormData } from '../../services/paymentService';
import toast from 'react-hot-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  giftCard: {
    _id: string;
    name: string;
    image?: string;
  };
  quantity: number;
  totalPrice: number;
  onPaymentSuccess?: (paymentData: any) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  giftCard,
  quantity,
  totalPrice,
  onPaymentSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'mobile_money' | 'bank' | 'card'>('mobile_money');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    mobileNetwork: 'MTN' as 'MTN' | 'VODAFONE' | 'AIRTELTIGO',
    mobileNumber: '',
    bankName: 'Ghana Commercial Bank',
    accountNumber: '',
  });

  const mobileNetworks = PaymentService.getSupportedMobileNetworks();
  const banks = PaymentService.getSupportedBanks();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      const paymentData: PaymentFormData = {
        giftCardId: giftCard._id,
        giftCardName: giftCard.name,
        quantity,
        totalPrice,
        paymentMethod,
        currency: 'GHS',
      };

      // Add method-specific data
      if (paymentMethod === 'mobile_money') {
        paymentData.mobileNetwork = formData.mobileNetwork;
        paymentData.mobileNumber = formData.mobileNumber;
      } else if (paymentMethod === 'bank') {
        paymentData.bankName = formData.bankName;
        paymentData.accountNumber = formData.accountNumber;
      }

      const result = await PaymentService.processPayment(paymentData);

      if (result.success) {
        toast.success(result.message);
        onPaymentSuccess?.(result.data);
        onClose();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
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
          className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">Complete Payment</h2>
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
              <h3 className="font-medium mb-3">Order Summary</h3>
              <div className="flex items-center space-x-3 mb-3">
                {giftCard.image && (
                  <img
                    src={giftCard.image}
                    alt={giftCard.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                )}
                <div className="flex-1">
                  <p className="font-medium">{giftCard.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                </div>
              </div>
              <div className="flex justify-between items-center font-semibold">
                <span>Total:</span>
                <span>GHS {totalPrice.toFixed(2)}</span>
              </div>
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
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Processing...' : `Pay GHS ${totalPrice.toFixed(2)}`}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;
