// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'; 

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // Add other slices (e.g., payment, user) here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;