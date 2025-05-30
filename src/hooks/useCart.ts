// src/hooks/useCart.ts
import { useState, useEffect } from "react";
import GiftCartService from "../services/cartService";
import { CartState } from "../types/cart";


const useCart = () => {
  const [cart, setCart] = useState<CartState>({
    items: [],
    total: 0,
    count: 0,
    loading: false,
    error: null
  });

  const fetchCart = async () => {
    setCart(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { items, total, count } = await GiftCartService.getCart();
      setCart({
        items,
        total,
        count,
        loading: false,
        error: null
      });
    } catch (error) {
      console.log(error);
      setCart(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to fetch cart'
      }));
    }
  };

  // Fetch cart on initial load
  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (item: {
    giftCardId: string;
    price: number;
    quantity: number;
    name?: string;
    image?: string;
  }) => {
    setCart(prev => ({ ...prev, loading: true }));
    try {
      await GiftCartService.addToCart(item);
      await fetchCart(); // Refresh cart
    } catch (error) {
        console.log(error);
      setCart(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to add to cart'
      }));
    }
  };

  const removeFromCart = async (giftCardId: string) => {
    setCart(prev => ({ ...prev, loading: true }));
    try {
      await GiftCartService.removeFromCart(giftCardId);
      await fetchCart(); // Refresh cart
    } catch (error) {
        console.log(error);
      setCart(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to remove item'
      }));
    }
  };

  const clearCart = async () => {
    setCart(prev => ({ ...prev, loading: true }));
    try {
      await GiftCartService.clearCart();
      await fetchCart(); // Refresh cart
    } catch (error) {
        console.log(error);
      setCart(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to clear cart'
      }));
    }
  };

  const updateCartItem = async (
    giftCardId: string,
    updates: { quantity?: number; price?: number }
  ) => {
    setCart(prev => ({ ...prev, loading: true }));
    try {
      await GiftCartService.updateCartItem(giftCardId, updates);
      await fetchCart(); // Refresh cart
    } catch (error) {
      console.log(error);
      setCart(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to update item'
      }));
    }
  };


  const incrementQuantity = async (giftCardId: string) => {
    setCart(prev => ({ ...prev, loading: true }));
    try {
      await GiftCartService.updateCartItem(giftCardId, { operation: 'increment' });
      await fetchCart();
    } catch (error) {
        console.log(error);
      setCart(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to increase quantity'
      }));
    }
  };
  
  const decrementQuantity = async (giftCardId: string) => {
    setCart(prev => ({ ...prev, loading: true }));
    try {
      await GiftCartService.updateCartItem(giftCardId, { operation: 'decrement' });
      await fetchCart();
    } catch (error) {
        console.log(error);
      setCart(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to decrease quantity'
      }));
    }
  };

  return {
    cart,               
    addToCart,
    removeFromCart,
    clearCart,
    updateCartItem,
    incrementQuantity,
    decrementQuantity,
    fetchCart
  };
};

export default useCart;