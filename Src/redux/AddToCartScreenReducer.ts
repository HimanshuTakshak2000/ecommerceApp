import { createSlice } from '@reduxjs/toolkit';
import type { ProductItem } from '../Api/HomeScreenApi';

interface CartState {
  items: ProductItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      if (!existingItem) {
        state.items.push(product);
      }
      else {
        state.items = state.items.map(item =>
          item.id === product.id ? { ...item, quantity: product.quantity } : item
        );
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
