import ApiService from './apiService';
import { PaymentRequest, CartPaymentRequest, PaymentResponse, Payment, ApiResponse } from '../types/api';

export interface PaymentFormData {
  giftCardId: string;
  giftCardName: string;
  quantity: number;
  totalPrice: number;
  paymentMethod: 'mobile_money' | 'bank' | 'card';
  currency?: string;

  // Mobile Money specific
  mobileNetwork?: 'MTN' | 'VODAFONE' | 'AIRTELTIGO';
  mobileNumber?: string;

  // Bank specific
  bankName?: string;
  accountNumber?: string;
}

export interface CartPaymentFormData {
  cartItemIds: string[];
  totalAmount: number;
  paymentMethod: 'mobile_money' | 'bank' | 'card';
  currency?: string;
  clearCart?: boolean;

  // Mobile Money specific
  mobileNetwork?: 'MTN' | 'VODAFONE' | 'AIRTELTIGO';
  mobileNumber?: string;

  // Bank specific
  bankName?: string;
  accountNumber?: string;
}

export interface PaymentResult {
  success: boolean;
  message: string;
  data?: {
    paymentId: string;
    orderId: string;
    redirectUrl?: string;
    status: string;
  };
  error?: string;
}

class PaymentService {
  /**
   * Process a payment for a gift card purchase
   */
  static async processPayment(formData: PaymentFormData): Promise<PaymentResult> {
    try {
      // Validate form data
      const validationError = this.validatePaymentData(formData);
      if (validationError) {
        return {
          success: false,
          message: validationError,
        };
      }

      // Prepare payment request
      const paymentRequest: PaymentRequest = {
        giftCard: formData.giftCardId,
        quantity: formData.quantity,
        totalPrice: formData.totalPrice,
        paymentMethod: formData.paymentMethod,
        currency: formData.currency || 'GHS',
      };

      // Add method-specific fields
      if (formData.paymentMethod === 'mobile_money') {
        paymentRequest.mobileNetwork = formData.mobileNetwork;
        paymentRequest.mobileNumber = formData.mobileNumber;
      } else if (formData.paymentMethod === 'bank') {
        paymentRequest.bankName = formData.bankName;
        paymentRequest.accountNumber = formData.accountNumber;
      }

      // Process payment
      const response = await ApiService.processPayment(paymentRequest);

      if (response.success && response.data) {
        return {
          success: true,
          message: response.message || 'Payment initiated successfully',
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || 'Payment failed',
        };
      }
    } catch (error: any) {
      console.error('Payment processing error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Payment processing failed. Please try again.',
        error: error.message,
      };
    }
  }

  /**
   * Process a cart payment for multiple items
   */
  static async processCartPayment(formData: CartPaymentFormData): Promise<PaymentResult> {
    try {
      // Validate form data
      const validationError = this.validateCartPaymentData(formData);
      if (validationError) {
        return {
          success: false,
          message: validationError,
        };
      }

      // Prepare cart payment request
      const paymentRequest: CartPaymentRequest = {
        cartItemIds: formData.cartItemIds,
        paymentMethod: formData.paymentMethod,
        currency: formData.currency || 'GHS',
        clearCart: formData.clearCart,
      };

      // Add method-specific fields
      if (formData.paymentMethod === 'mobile_money') {
        paymentRequest.mobileNetwork = formData.mobileNetwork;
        paymentRequest.mobileNumber = formData.mobileNumber;
      } else if (formData.paymentMethod === 'bank') {
        paymentRequest.bankName = formData.bankName;
        paymentRequest.accountNumber = formData.accountNumber;
      }

      // Process cart payment
      const response = await ApiService.processCartPayment(paymentRequest);

      if (response.success && response.data) {
        return {
          success: true,
          message: response.message || 'Cart payment initiated successfully',
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || 'Cart payment failed',
        };
      }
    } catch (error: any) {
      console.error('Cart payment processing error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Cart payment processing failed. Please try again.',
        error: error.message,
      };
    }
  }

  /**
   * Verify payment status
   */
  static async verifyPayment(orderId: string): Promise<{
    success: boolean;
    message: string;
    data?: {
      paymentId: string;
      status: string;
      transactionId: string;
      verificationData: any;
    };
  }> {
    try {
      const response = await ApiService.verifyPayment(orderId);

      if (response.success && response.data) {
        return {
          success: true,
          message: response.message || 'Payment verification successful',
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || 'Payment verification failed',
        };
      }
    } catch (error: any) {
      console.error('Payment verification error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Payment verification failed. Please try again.',
      };
    }
  }

  /**
   * Get user's payment history
   */
  static async getPaymentHistory(): Promise<{
    success: boolean;
    message: string;
    data?: Payment[];
  }> {
    try {
      const response = await ApiService.getUserPayments();

      if (response.success && response.data) {
        return {
          success: true,
          message: 'Payment history retrieved successfully',
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || 'Failed to retrieve payment history',
        };
      }
    } catch (error: any) {
      console.error('Payment history error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to retrieve payment history. Please try again.',
      };
    }
  }

  /**
   * Get specific payment details
   */
  static async getPaymentDetails(paymentId: string): Promise<{
    success: boolean;
    message: string;
    data?: Payment;
  }> {
    try {
      const response = await ApiService.getPaymentDetails(paymentId);

      if (response.success && response.data) {
        return {
          success: true,
          message: 'Payment details retrieved successfully',
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || 'Failed to retrieve payment details',
        };
      }
    } catch (error: any) {
      console.error('Payment details error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to retrieve payment details. Please try again.',
      };
    }
  }

  /**
   * Validate payment form data
   */
  private static validatePaymentData(formData: PaymentFormData): string | null {
    if (!formData.giftCardId) {
      return 'Gift card ID is required';
    }

    if (!formData.quantity || formData.quantity <= 0) {
      return 'Quantity must be greater than 0';
    }

    if (!formData.totalPrice || formData.totalPrice <= 0) {
      return 'Total price must be greater than 0';
    }

    if (!formData.paymentMethod) {
      return 'Payment method is required';
    }

    // Validate mobile money specific fields
    if (formData.paymentMethod === 'mobile_money') {
      if (!formData.mobileNetwork) {
        return 'Mobile network is required for mobile money payments';
      }

      if (!formData.mobileNumber) {
        return 'Mobile number is required for mobile money payments';
      }

      // Validate mobile number format (basic validation)
      const mobileRegex = /^[0-9]{10}$/;
      const cleanNumber = formData.mobileNumber.replace(/\s+/g, '');
      if (!mobileRegex.test(cleanNumber)) {
        return 'Please enter a valid 10-digit mobile number';
      }
    }

    // Validate bank specific fields
    if (formData.paymentMethod === 'bank') {
      if (!formData.bankName) {
        return 'Bank name is required for bank payments';
      }
    }

    return null;
  }

  /**
   * Validate cart payment form data
   */
  private static validateCartPaymentData(formData: CartPaymentFormData): string | null {
    if (!formData.cartItemIds || formData.cartItemIds.length === 0) {
      return 'Cart items are required';
    }

    if (!formData.totalAmount || formData.totalAmount <= 0) {
      return 'Total amount must be greater than 0';
    }

    if (!formData.paymentMethod) {
      return 'Payment method is required';
    }

    // Validate mobile money specific fields
    if (formData.paymentMethod === 'mobile_money') {
      if (!formData.mobileNetwork) {
        return 'Mobile network is required for mobile money payments';
      }

      if (!formData.mobileNumber) {
        return 'Mobile number is required for mobile money payments';
      }

      // Validate mobile number format (basic validation)
      const mobileRegex = /^[0-9]{10}$/;
      const cleanNumber = formData.mobileNumber.replace(/\s+/g, '');
      if (!mobileRegex.test(cleanNumber)) {
        return 'Please enter a valid 10-digit mobile number';
      }
    }

    // Validate bank specific fields
    if (formData.paymentMethod === 'bank') {
      if (!formData.bankName) {
        return 'Bank name is required for bank payments';
      }
    }

    return null;
  }

  /**
   * Get supported mobile networks
   */
  static getSupportedMobileNetworks(): Array<{ value: string; label: string }> {
    return [
      { value: 'MTN', label: 'MTN Mobile Money' },
      { value: 'VODAFONE', label: 'Vodafone Cash' },
      { value: 'AIRTELTIGO', label: 'AirtelTigo Money' },
    ];
  }

  /**
   * Get supported banks
   */
  static getSupportedBanks(): Array<{ value: string; label: string }> {
    return [
      { value: 'Ghana Commercial Bank', label: 'Ghana Commercial Bank' },
      { value: 'Ecobank Ghana', label: 'Ecobank Ghana' },
      { value: 'Standard Chartered Bank', label: 'Standard Chartered Bank' },
      { value: 'Barclays Bank Ghana', label: 'Barclays Bank Ghana' },
      { value: 'Zenith Bank Ghana', label: 'Zenith Bank Ghana' },
      { value: 'Fidelity Bank Ghana', label: 'Fidelity Bank Ghana' },
      { value: 'United Bank for Africa', label: 'United Bank for Africa' },
      { value: 'Stanbic Bank Ghana', label: 'Stanbic Bank Ghana' },
      { value: 'Access Bank Ghana', label: 'Access Bank Ghana' },
      { value: 'CAL Bank', label: 'CAL Bank' },
    ];
  }

  /**
   * Format payment status for display
   */
  static formatPaymentStatus(status: string): { text: string; color: string } {
    switch (status.toLowerCase()) {
      case 'completed':
        return { text: 'Completed', color: 'text-green-600' };
      case 'pending':
        return { text: 'Pending', color: 'text-yellow-600' };
      case 'failed':
        return { text: 'Failed', color: 'text-red-600' };
      default:
        return { text: status, color: 'text-gray-600' };
    }
  }

  /**
   * Format payment method for display
   */
  static formatPaymentMethod(method: string): string {
    switch (method.toLowerCase()) {
      case 'mobile_money':
        return 'Mobile Money';
      case 'bank':
        return 'Bank Transfer';
      case 'card':
        return 'Card Payment';
      default:
        return method;
    }
  }
}

export default PaymentService;
