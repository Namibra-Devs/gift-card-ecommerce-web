import axios, { AxiosResponse } from 'axios';
import {
  ApiResponse,
  User,
  GiftCard,
  Cart,
  CartSummary,
  Payment,
  PaymentRequest,
  CartPaymentRequest,
  PaymentResponse,
  RegisterRequest,
  LoginRequest,
  VerifyOTPRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
  AddToCartRequest,
  UpdateCartItemRequest,
  EZPayPinToken,
  EZPayPinCatalog,
  EZPayPinAvailability,
  DashboardAnalytics
} from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh on 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

class ApiService {
  // Authentication APIs
  static async register(data: RegisterRequest): Promise<ApiResponse<{ userId: string }>> {
    const response: AxiosResponse<ApiResponse<{ userId: string }>> = await api.post('/auth/register', data);
    return response.data;
  }

  static async login(data: LoginRequest): Promise<ApiResponse<{ userId: string; email: string }>> {
    const response: AxiosResponse<ApiResponse<{ userId: string; email: string }>> = await api.post('/auth/login', data);
    return response.data;
  }

  static async verifyOTP(data: VerifyOTPRequest): Promise<ApiResponse<{ user: User; token: string }>> {
    const response: AxiosResponse<ApiResponse<{ user: User; token: string }>> = await api.post('/auth/verify', data);
    return response.data;
  }

  static async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<{ userId: string; email: string }>> {
    const response: AxiosResponse<ApiResponse<{ userId: string; email: string }>> = await api.post('/auth/forgot-password', data);
    return response.data;
  }

  static async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse> {
    const response: AxiosResponse<ApiResponse> = await api.post('/auth/reset-password', data);
    return response.data;
  }

  // User Management APIs
  static async getAllUsers(params?: {
    page?: number;
    limit?: number;
    role?: string;
    isVerified?: boolean;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiResponse<User[]>> {
    const response: AxiosResponse<ApiResponse<User[]>> = await api.get('/users', { params });
    return response.data;
  }

  static async getUserProfile(userId: string): Promise<ApiResponse<User>> {
    const response: AxiosResponse<ApiResponse<User>> = await api.get(`/users/${userId}`);
    return response.data;
  }

  static async updateProfile(userId: string, data: UpdateProfileRequest): Promise<ApiResponse<User>> {
    const response: AxiosResponse<ApiResponse<User>> = await api.put(`/users/${userId}`, data);
    return response.data;
  }

  static async changePassword(userId: string, data: ChangePasswordRequest): Promise<ApiResponse> {
    const response: AxiosResponse<ApiResponse> = await api.post(`/users/${userId}/change-password`, data);
    return response.data;
  }

  // Gift Card APIs
  static async getAllGiftCards(): Promise<ApiResponse<GiftCard[]>> {
    const response: AxiosResponse<ApiResponse<GiftCard[]>> = await api.get('/gift-cards');
    return response.data;
  }

  static async getGiftCardById(giftCardId: string): Promise<ApiResponse<GiftCard>> {
    const response: AxiosResponse<ApiResponse<GiftCard>> = await api.get(`/gift-cards/${giftCardId}`);
    return response.data;
  }

  static async createGiftCard(formData: FormData): Promise<ApiResponse<GiftCard>> {
    const response: AxiosResponse<ApiResponse<GiftCard>> = await api.post('/gift-cards', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  static async updateGiftCard(giftCardId: string, formData: FormData): Promise<ApiResponse<GiftCard>> {
    const response: AxiosResponse<ApiResponse<GiftCard>> = await api.put(`/gift-cards/${giftCardId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  static async deleteGiftCard(giftCardId: string): Promise<ApiResponse> {
    const response: AxiosResponse<ApiResponse> = await api.delete(`/gift-cards/${giftCardId}`);
    return response.data;
  }

  // Cart APIs
  static async getCart(): Promise<ApiResponse<Cart>> {
    const response: AxiosResponse<ApiResponse<Cart>> = await api.get('/cart');
    return response.data;
  }

  static async getCartByUserId(userId: string): Promise<ApiResponse<Cart>> {
    const response: AxiosResponse<ApiResponse<Cart>> = await api.get(`/cart/user/${userId}`);
    return response.data;
  }

  static async getCartSummary(): Promise<ApiResponse<CartSummary>> {
    const response: AxiosResponse<ApiResponse<CartSummary>> = await api.get('/cart/summary');
    return response.data;
  }

  static async addToCart(data: AddToCartRequest): Promise<ApiResponse> {
    const response: AxiosResponse<ApiResponse> = await api.post('/cart', data);
    return response.data;
  }

  static async addToCartByUserId(userId: string, data: AddToCartRequest): Promise<ApiResponse> {
    const response: AxiosResponse<ApiResponse> = await api.post(`/cart/user/${userId}`, data);
    return response.data;
  }

  static async updateCartItem(cartItemId: string, data: UpdateCartItemRequest): Promise<ApiResponse> {
    const response: AxiosResponse<ApiResponse> = await api.put(`/cart/${cartItemId}`, data);
    return response.data;
  }

  static async removeFromCart(cartItemId: string): Promise<ApiResponse> {
    const response: AxiosResponse<ApiResponse> = await api.delete(`/cart/${cartItemId}`);
    return response.data;
  }

  static async clearCart(userId: string,): Promise<ApiResponse> {
    const response: AxiosResponse<ApiResponse> = await api.delete(`/cart/user/${userId}`);
    return response.data;
  }

  static async cleanupExpiredCartItems(): Promise<ApiResponse> {
    const response: AxiosResponse<ApiResponse> = await api.delete('/cart/cleanup/expired');
    return response.data;
  }

  static async saveCartItemForLater(cartItemId: string): Promise<ApiResponse> {
    // Note: This endpoint may not be implemented in the backend yet
    try {
      const response: AxiosResponse<ApiResponse> = await api.put(`/cart/${cartItemId}/save`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return {
          success: false,
          message: 'Save for later feature is not yet implemented on the backend'
        };
      }
      throw error;
    }
  }

  static async moveCartItemToCart(cartItemId: string): Promise<ApiResponse> {
    // Note: This endpoint may not be implemented in the backend yet
    try {
      const response: AxiosResponse<ApiResponse> = await api.put(`/cart/${cartItemId}/move`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return {
          success: false,
          message: 'Move to cart feature is not yet implemented on the backend'
        };
      }
      throw error;
    }
  }

  // Payment APIs
  static async processPayment(data: PaymentRequest): Promise<ApiResponse<PaymentResponse>> {
    const response: AxiosResponse<ApiResponse<PaymentResponse>> = await api.post('/payments/process', data);
    return response.data;
  }

  static async processCartPayment(data: CartPaymentRequest): Promise<ApiResponse<PaymentResponse>> {
    const response: AxiosResponse<ApiResponse<PaymentResponse>> = await api.post('/payments/cart', data);
    return response.data;
  }

  static async verifyPayment(orderId: string): Promise<ApiResponse<{
    paymentId: string;
    status: string;
    transactionId: string;
    verificationData: any;
  }>> {
    const response: AxiosResponse<ApiResponse<{
      paymentId: string;
      status: string;
      transactionId: string;
      verificationData: any;
    }>> = await api.get(`/payments/verify/${orderId}`);
    return response.data;
  }

  static async getUserPayments(): Promise<ApiResponse<Payment[]>> {
    const response: AxiosResponse<ApiResponse<Payment[]>> = await api.get('/payments');
    return response.data;
  }

  static async getPaymentDetails(paymentId: string): Promise<ApiResponse<Payment>> {
    const response: AxiosResponse<ApiResponse<Payment>> = await api.get(`/payments/${paymentId}`);
    return response.data;
  }

  // External API - EZPayPin
  static async getEZPayPinToken(): Promise<ApiResponse<EZPayPinToken>> {
    const response: AxiosResponse<ApiResponse<EZPayPinToken>> = await api.post('/external/ezpaypin/token');
    return response.data;
  }

  static async getEZPayPinCatalogs(): Promise<ApiResponse<{ count: number; results: EZPayPinCatalog[] }>> {
    const response: AxiosResponse<ApiResponse<{ count: number; results: EZPayPinCatalog[] }>> = await api.get('/external/ezpaypin/catalogs');
    return response.data;
  }

  static async syncEZPayPinGiftCards(): Promise<ApiResponse<{
    total: number;
    created: number;
    updated: number;
    failed: number;
  }>> {
    const response: AxiosResponse<ApiResponse<{
      total: number;
      created: number;
      updated: number;
      failed: number;
    }>> = await api.post('/external/ezpaypin/sync');
    return response.data;
  }

  static async getEZPayPinGiftCards(): Promise<ApiResponse<GiftCard[]>> {
    const response: AxiosResponse<ApiResponse<GiftCard[]>> = await api.get('/external/ezpaypin/gift-cards');
    return response.data;
  }

  static async getEZPayPinGiftCardBySku(sku: number): Promise<ApiResponse<GiftCard>> {
    const response: AxiosResponse<ApiResponse<GiftCard>> = await api.get(`/external/ezpaypin/gift-cards/${sku}`);
    return response.data;
  }

  static async checkEZPayPinAvailability(sku: number, itemCount: number, price: number): Promise<ApiResponse<EZPayPinAvailability>> {
    const response: AxiosResponse<ApiResponse<EZPayPinAvailability>> = await api.get(`/external/ezpaypin/gift-cards/${sku}/availability`, {
      params: { item_count: itemCount, price }
    });
    return response.data;
  }

  // Analytics APIs (Admin only)
  static async getDashboardAnalytics(): Promise<ApiResponse<DashboardAnalytics>> {
    const response: AxiosResponse<ApiResponse<DashboardAnalytics>> = await api.get('/analytics/dashboard');
    return response.data;
  }

  static async getUserStatistics(): Promise<ApiResponse<{
    total: number;
    new: number;
    growth: Array<{
      _id: { year: number; month: number };
      count: number;
    }>;
  }>> {
    const response: AxiosResponse<ApiResponse<{
      total: number;
      new: number;
      growth: Array<{
        _id: { year: number; month: number };
        count: number;
      }>;
    }>> = await api.get('/analytics/users');
    return response.data;
  }

  static async getPaymentStatistics(): Promise<ApiResponse<{
    total: number;
    completed: number;
    pending: number;
    failed: number;
    trends: Array<{
      _id: { year: number; month: number; status: string };
      count: number;
      revenue: number;
    }>;
  }>> {
    const response: AxiosResponse<ApiResponse<{
      total: number;
      completed: number;
      pending: number;
      failed: number;
      trends: Array<{
        _id: { year: number; month: number; status: string };
        count: number;
        revenue: number;
      }>;
    }>> = await api.get('/analytics/payments');
    return response.data;
  }
}

export default ApiService;
