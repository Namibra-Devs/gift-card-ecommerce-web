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
    const token = localStorage.getItem('token');
    await api.post(`/cart`, item, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
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
    static async getCart(): Promise<{
    items: CartItem[];
    total: number;
    count: number;
    }> {
    const response = await api.get(`/cart`);
    return response.data;
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