// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  summary?: CartSummary;
  count?: number;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalUsers?: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// User Types
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName?: string;
  email: string;
  secondaryEmail?: string;
  phone: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  referralCode?: string;
  createdAt: string;
  updatedAt: string;
}

// Gift Card Types
export interface GiftCard {
  _id: string;
  name: string;
  description: string;
  pricing: number[];
  media: Array<{
    image: string;
    publicId: string;
  }>;
  stock: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
  // EZPayPin specific fields
  isEZPayPin?: boolean;
  sku?: number;
  upc?: string;
  min_price?: number;
  max_price?: number;
  pre_order?: boolean;
  activation_fee?: number;
  percentage_of_buying_price?: number;
  currency?: {
    currency: string;
    symbol: string;
    code: string;
  };
  categories?: Array<{
    name: string;
  }>;
  regions?: Array<{
    name: string;
    code: string;
  }>;
  image?: string;
  availability?: boolean;
  delivery_type?: number;
  delivery_type_text?: string;
}

// Cart Types
export interface CartItem {
  _id: string;
  giftCard: GiftCard;
  user: string;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
  isSaved?: boolean;
  isAvailable?: boolean;
  availableStock?: number;
  addedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  items: CartItem[];
  availableItems: CartItem[];
  unavailableItems: CartItem[];
  summary: CartSummary;
}

export interface CartSummary {
  totalItems: number;
  availableItems: number;
  unavailableItems: number;
  totalAmount: number;
  totalQuantity: number;
}

// Payment Types
export interface PaymentDetails {
  mobileNetwork?: string;
  mobileNumber?: string;
  bankName?: string;
  accountNumber?: string;
  transactionReference?: string;
  transactionId?: string;
  paymentDate?: string;
}

export interface Payment {
  _id: string;
  user: string | User;
  giftCard: string | GiftCard;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  paymentMethod: 'mobile_money' | 'bank' | 'card';
  paymentDetails: PaymentDetails;
  currency: string;
  paymentResponse?: any;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRequest {
  giftCard: string;
  quantity: number;
  totalPrice: number;
  paymentMethod: 'mobile_money' | 'bank' | 'card';
  currency?: string;
  mobileNetwork?: 'MTN' | 'VODAFONE' | 'AIRTELTIGO';
  mobileNumber?: string;
  bankName?: string;
  accountNumber?: string;
}

export interface CartPaymentRequest {
  cartItemIds: string[];
  paymentMethod: 'mobile_money' | 'bank' | 'card';
  currency?: string;
  clearCart?: boolean;
  mobileNetwork?: 'MTN' | 'VODAFONE' | 'AIRTELTIGO';
  mobileNumber?: string;
  bankName?: string;
  accountNumber?: string;
}

export interface PaymentResponse {
  paymentId: string;
  orderId: string;
  redirectUrl?: string;
  status: string;
  paymentType?: 'single' | 'cart';
  itemCount?: number;
  totalAmount?: number;
  cartCleared?: boolean;
}

// External API Types
export interface EZPayPinToken {
  token: string;
  expires_in: number;
}

export interface EZPayPinCatalog {
  sku: number;
  upc: number;
  title: string;
  min_price: number;
  max_price: number;
  pre_order: boolean;
  activation_fee: number;
  percentage_of_buying_price: number;
  currency: {
    currency: string;
    symbol: string;
    code: string;
  };
  categories: Array<{
    name: string;
  }>;
  regions: Array<{
    name: string;
    code: string;
  }>;
  image: string;
}

export interface EZPayPinAvailability {
  availability: boolean;
  detail: string;
  delivery_type: number;
  delivery_type_text: string;
}

// Analytics Types (Admin only)
export interface DashboardAnalytics {
  users: {
    total: number;
    new: number;
  };
  giftCards: {
    total: number;
    inStock: number;
  };
  payments: {
    total: number;
    completed: number;
    pending: number;
    failed: number;
  };
  revenue: {
    total: number;
    monthly: number;
    daily: number;
  };
  paymentMethods: {
    mobileMoney: number;
    bank: number;
    card: number;
  };
  popularGiftCards: Array<{
    _id: string;
    name: string;
    count: number;
    totalRevenue: number;
  }>;
  recentTransactions: Array<{
    _id: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
    giftCard: {
      name: string;
    };
    totalPrice: number;
    status: string;
    createdAt: string;
  }>;
}

// Request Types
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  referralCode?: string;
}

export interface LoginRequest {
  email: string;
}

export interface VerifyOTPRequest {
  verificationCode: string;
  userId: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  password: string;
  userId: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  userName?: string;
  email?: string;
  secondaryEmail?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface AddToCartRequest {
  giftCardId: string;
  quantity: number;
  price: number;
}

export interface UpdateCartItemRequest {
  quantity?: number;
  price?: number;
}
