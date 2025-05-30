// src/hooks/useCart.ts
import { useState, useEffect } from "react";
import ApiService from "../services/apiService";
import { CartItem as ApiCartItem, CartSummary } from "../types/api";
import toast from "react-hot-toast";

interface CartItemDisplay {
  giftCardId: string;
  price: number;
  quantity: number;
  name?: string;
  image?: string;
  _id?: string;
  isSaved?: boolean;
  isAvailable?: boolean;
  availableStock?: number;
}

interface CartState {
  items: CartItemDisplay[];
  availableItems: CartItemDisplay[];
  unavailableItems: CartItemDisplay[];
  totalAmount: number;
  count: number;
  loading: boolean;
  error: string | null;
}

const useCart = () => {
  const [cart, setCart] = useState<CartState>({
    items: [],
    availableItems: [],
    unavailableItems: [],
    totalAmount: 0,
    count: 0,
    loading: false,
    error: null
  });

  // Note: fetchCart will be called by components when needed

  const fetchCart = async () => {
    setCart(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await ApiService.getCart();
      if (response.success && response.data) {
        const cartData = response.data;

        // Transform API cart items to display format
        const transformItem = (item: ApiCartItem): CartItemDisplay => ({
          giftCardId: item.giftCard._id,
          price: item.unitPrice,
          quantity: item.quantity,
          name: item.giftCard.name,
          image: item.giftCard.image,
          _id: item._id,
          isSaved: item.isSaved,
          isAvailable: item.isAvailable,
          availableStock: item.availableStock
        });

        const allItems = cartData.items.map(transformItem);
        const availableItems = cartData.availableItems.map(transformItem);
        const unavailableItems = cartData.unavailableItems.map(transformItem);

        setCart({
          items: allItems,
          availableItems,
          unavailableItems,
          totalAmount: response.summary?.totalAmount || 0,
          count: response.summary?.totalItems || 0,
          loading: false,
          error: null
        });
      } else {
        setCart(prev => ({
          ...prev,
          loading: false,
          error: response.message || 'Failed to fetch cart'
        }));
      }
    } catch (error: any) {
      console.error('Cart fetch error:', error);
      setCart(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to fetch cart'
      }));
    }
  };

  // Fetch cart on initial load only if user is authenticated
  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('token'); // or use your auth logic
    if (isAuthenticated) {
      fetchCart();
    }
  }, []);

  const addToCart = async (item: {
    giftCardId: string;
    price: number;
    quantity: number;
  }) => {
    setCart(prev => ({ ...prev, loading: true }));
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found. Please log in again.');
      }

      const response = await ApiService.addToCartByUserId(userId, {
        giftCardId: item.giftCardId,
        quantity: item.quantity,
        price: item.price
      });

      if (response.success) {
        toast.success('Item added to cart');
        await fetchCart(); // Refresh cart
      } else {
        toast.error(response.message || 'Failed to add to cart');
        setCart(prev => ({ ...prev, loading: false }));
      }
    } catch (error: any) {
      console.error('Add to cart error:', error);
      toast.error('Failed to add to cart');
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
      // Find the cart item by giftCardId to get the actual cart item ID
      const cartItem = cart.items.find(item => item.giftCardId === giftCardId);
      if (!cartItem?._id) {
        throw new Error('Cart item not found');
      }

      const response = await ApiService.removeFromCart(cartItem._id);

      if (response.success) {
        toast.success('Item removed from cart');
        await fetchCart(); // Refresh cart
      } else {
        toast.error(response.message || 'Failed to remove item');
        setCart(prev => ({ ...prev, loading: false }));
      }
    } catch (error: any) {
      console.error('Remove from cart error:', error);
      toast.error('Failed to remove item');
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
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found. Please log in again.');
      }

      const response = await ApiService.clearCart(userId);

      if (response.success) {
        toast.success('Cart cleared');
        await fetchCart(); // Refresh cart
      } else {
        toast.error(response.message || 'Failed to clear cart');
        setCart(prev => ({ ...prev, loading: false }));
      }
    } catch (error: any) {
      console.error('Clear cart error:', error);
      toast.error('Failed to clear cart');
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
      // Find the cart item by giftCardId to get the actual cart item ID
      const cartItem = cart.items.find(item => item.giftCardId === giftCardId);
      if (!cartItem?._id) {
        throw new Error('Cart item not found');
      }

      const response = await ApiService.updateCartItem(cartItem._id, updates);

      if (response.success) {
        await fetchCart(); // Refresh cart
      } else {
        toast.error(response.message || 'Failed to update item');
        setCart(prev => ({ ...prev, loading: false }));
      }
    } catch (error: any) {
      console.error('Update cart item error:', error);
      toast.error('Failed to update item');
      setCart(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to update item'
      }));
    }
  };


  const incrementQuantity = async (giftCardId: string) => {
    const currentItem = cart.items.find(item => item.giftCardId === giftCardId);
    if (currentItem) {
      await updateCartItem(giftCardId, { quantity: currentItem.quantity + 1 });
    }
  };

  const decrementQuantity = async (giftCardId: string) => {
    const currentItem = cart.items.find(item => item.giftCardId === giftCardId);
    if (currentItem && currentItem.quantity > 1) {
      await updateCartItem(giftCardId, { quantity: currentItem.quantity - 1 });
    } else if (currentItem && currentItem.quantity === 1) {
      // Remove item if quantity would become 0
      await removeFromCart(giftCardId);
    }
  };

  const getCartSummary = async (): Promise<CartSummary | null> => {
    try {
      const response = await ApiService.getCartSummary();
      if (response.success && response.data) {
        return response.data;
      }
      return null;
    } catch (error: any) {
      console.error('Get cart summary error:', error);
      return null;
    }
  };

  const cleanupExpiredItems = async () => {
    try {
      const response = await ApiService.cleanupExpiredCartItems();
      if (response.success) {
        toast.success('Expired items removed from cart');
        await fetchCart(); // Refresh cart after cleanup
      }
    } catch (error: any) {
      console.error('Cleanup expired items error:', error);
      toast.error('Failed to cleanup expired items');
    }
  };

  const saveForLater = async (giftCardId: string) => {
    const currentItem = cart.items.find(item => item.giftCardId === giftCardId);
    if (currentItem?._id) {
      try {
        const response = await ApiService.saveCartItemForLater(currentItem._id);
        if (response.success) {
          toast.success('Item saved for later');
          await fetchCart(); // Refresh cart
        } else {
          toast.error(response.message || 'Failed to save item');
        }
      } catch (error: any) {
        console.error('Save for later error:', error);
        toast.error('Failed to save item for later');
      }
    }
  };

  const moveToCart = async (giftCardId: string) => {
    const currentItem = cart.items.find(item => item.giftCardId === giftCardId);
    if (currentItem?._id) {
      try {
        const response = await ApiService.moveCartItemToCart(currentItem._id);
        if (response.success) {
          toast.success('Item moved back to cart');
          await fetchCart(); // Refresh cart
        } else {
          toast.error(response.message || 'Failed to move item');
        }
      } catch (error: any) {
        console.error('Move to cart error:', error);
        toast.error('Failed to move item to cart');
      }
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
    fetchCart,
    getCartSummary,
    cleanupExpiredItems,
    saveForLater,
    moveToCart
  };
};

export default useCart;