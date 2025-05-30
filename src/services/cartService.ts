// src/services/giftCardService.ts
import api from './api';

interface CartItem {
  giftCardId: string;
  price: number;
  quantity: number;
}

interface UpdateCartItemPayload {
  quantity?: number;
  price?: number;
  operation?: 'increment' | 'decrement';
}

class GiftCartService {
  // Add item to cart
  static async addToCart(item: CartItem): Promise<void> {
    await api.post(`/cart`, item);
  }

  // Remove item from cart
  static async removeFromCart(giftCardId: string): Promise<void> {
    await api.delete(`/cart/${giftCardId}`);
    }

    // Clear entire cart
    static async clearCart(): Promise<void> {
    await api.delete(`/cart`);
    }

    // Get user's cart
static async getCart() {
  try {
    const response = await api.get("/cart");
    return response.data;
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as { response?: { status?: number } }).response === "object" &&
      (error as { response?: { status?: number } }).response !== null &&
      (error as { response?: { status?: number } }).response?.status === 401
    ) {
      // Return a special value or throw a custom error
      return { unauthorized: true };
    }
    throw error;
  }
}

    // Update cart item
    static async updateCartItem(
    giftCardId: string,
    updates: UpdateCartItemPayload
    ): Promise<void> {
    await api.put(`/cart/${giftCardId}`, updates);
  }
}

export default GiftCartService;