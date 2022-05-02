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
    addItem: (state) => {
      return {
        ...state,
        itemCount: state.itemCount + 1,
      };
    },
    removeItem: (state) => {
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
