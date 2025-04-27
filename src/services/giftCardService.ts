// src/services/giftCardService.ts
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

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

class GiftCardService {
  // Add item to cart
  static async addToCart(item: CartItem): Promise<void> {
    const token = localStorage.getItem('token');
    await axios.post(`${apiUrl}/cart`, item, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // Remove item from cart
  static async removeFromCart(giftCardId: string): Promise<void> {
    const token = localStorage.getItem('token');
    await axios.delete(`${apiUrl}/cart/${giftCardId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // Clear entire cart
  static async clearCart(): Promise<void> {
    const token = localStorage.getItem('token');
    await axios.delete(`${apiUrl}/cart`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // Get user's cart
  static async getCart(): Promise<{
    items: CartItem[];
    total: number;
    count: number;
  }> {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${apiUrl}/cart`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }

  // Update cart item
  static async updateCartItem(
    giftCardId: string,
    updates: UpdateCartItemPayload
  ): Promise<void> {
    const token = localStorage.getItem('token');
    await axios.put(`${apiUrl}/cart/${giftCardId}`, updates, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}

export default GiftCardService;