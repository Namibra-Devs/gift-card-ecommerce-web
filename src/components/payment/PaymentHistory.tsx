import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiCheckCircle, FiXCircle, FiEye, FiRefreshCw } from 'react-icons/fi';
import PaymentService from '../../services/paymentService';
import { Payment } from '../../types/api';
import toast from 'react-hot-toast';

const PaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const fetchPaymentHistory = async () => {
    setLoading(true);
    try {
      const result = await PaymentService.getPaymentHistory();
      if (result.success && result.data) {
        setPayments(result.data);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error fetching payment history:', error);
      toast.error('Failed to load payment history');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (payment: Payment) => {
    try {
      const result = await PaymentService.getPaymentDetails(payment._id);
      if (result.success && result.data) {
        setSelectedPayment(result.data);
        setShowDetails(true);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error fetching payment details:', error);
      toast.error('Failed to load payment details');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <FiCheckCircle className="text-green-500" />;
      case 'pending':
        return <FiClock className="text-yellow-500" />;
      case 'failed':
        return <FiXCircle className="text-red-500" />;
      default:
        return <FiClock className="text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatGiftCardName = (giftCard: any) => {
    if (typeof giftCard === 'string') return 'Gift Card';
    return giftCard?.name || 'Gift Card';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <FiRefreshCw className="animate-spin text-2xl text-gray-400" />
        <span className="ml-2 text-gray-600">Loading payment history...</span>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="text-center py-12">
        <FiClock className="mx-auto text-4xl text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment History</h3>
        <p className="text-gray-600">You haven't made any payments yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Payment History</h2>
        <button
          onClick={fetchPaymentHistory}
          className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          <FiRefreshCw className="text-sm" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="space-y-3">
        {payments.map((payment, index) => (
          <motion.div
            key={payment._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(payment.status)}
                <div>
                  <h3 className="font-medium">{formatGiftCardName(payment.giftCard)}</h3>
                  <p className="text-sm text-gray-600">
                    {PaymentService.formatPaymentMethod(payment.paymentMethod)} • 
                    Qty: {payment.quantity}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {payment.currency} {payment.totalPrice.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  {formatDate(payment.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    payment.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : payment.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {PaymentService.formatPaymentStatus(payment.status).text}
                </span>
              </div>
              <button
                onClick={() => handleViewDetails(payment)}
                className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <FiEye className="text-sm" />
                <span>View Details</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Payment Details Modal */}
      {showDetails && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Payment Details</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment ID</label>
                  <p className="text-sm text-gray-900 font-mono">{selectedPayment._id}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Gift Card</label>
                  <p className="text-sm text-gray-900">{formatGiftCardName(selectedPayment.giftCard)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <p className="text-sm text-gray-900">{selectedPayment.quantity}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Price</label>
                    <p className="text-sm text-gray-900">
                      {selectedPayment.currency} {selectedPayment.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                  <p className="text-sm text-gray-900">
                    {PaymentService.formatPaymentMethod(selectedPayment.paymentMethod)}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      selectedPayment.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : selectedPayment.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {PaymentService.formatPaymentStatus(selectedPayment.status).text}
                  </span>
                </div>

                {selectedPayment.paymentDetails && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Details</label>
                    <div className="bg-gray-50 rounded-md p-3 space-y-2">
                      {selectedPayment.paymentDetails.mobileNetwork && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Network:</span>
                          <span className="text-sm text-gray-900">{selectedPayment.paymentDetails.mobileNetwork}</span>
                        </div>
                      )}
                      {selectedPayment.paymentDetails.mobileNumber && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Mobile:</span>
                          <span className="text-sm text-gray-900">{selectedPayment.paymentDetails.mobileNumber}</span>
                        </div>
                      )}
                      {selectedPayment.paymentDetails.bankName && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Bank:</span>
                          <span className="text-sm text-gray-900">{selectedPayment.paymentDetails.bankName}</span>
                        </div>
                      )}
                      {selectedPayment.paymentDetails.transactionId && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Transaction ID:</span>
                          <span className="text-sm text-gray-900 font-mono">{selectedPayment.paymentDetails.transactionId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">Created At</label>
                  <p className="text-sm text-gray-900">{formatDate(selectedPayment.createdAt)}</p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowDetails(false)}
                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
