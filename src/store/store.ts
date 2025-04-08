// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; 

export interface CartState {
  items: { id: number; name: string; price: number; quantity: number }[];
  itemCount: number;
  total: number;
}

export interface AppState {
  cart: CartState;
  // other slices
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // Add other slices (e.g., payment, user) here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;