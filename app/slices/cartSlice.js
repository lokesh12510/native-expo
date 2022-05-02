import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    itemCount: 0,
    cartInitialized: false,
    cartItems: [],
    totalAmount: 0,
  },
  reducers: {
    addItem: (state, { payload }) => {
      state.cartItems.push(payload.item);
      state.itemCount = state.cartItems.length;
      state.cartInitialized = true;
    },
    removeItem: (state, { payload }) => {
      return {
        ...state,
        itemCount: state.itemCount - 1,
      };
    },
  },
});

export const addItem = CartSlice.actions.addItem;
export const removeItem = CartSlice.actions.removeItem;

export default CartSlice.reducer;
