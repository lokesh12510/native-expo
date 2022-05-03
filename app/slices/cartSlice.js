import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartInitialized: false,
    cartItems: [],
    cartItemsCount: 0,
    cartTotalAmount: 0,
  },
  reducers: {
    addItem: (state, { payload }) => {
      const inCart = state.cartItems.some((item) => item.id === payload.id);
      if (!inCart) {
        // if not exists
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            {
              ...payload,
              u_quantity: 1,
              u_total: Number(payload.price),
            },
          ],
          cartItemsCount: state.cartItemsCount + 1,
          cartTotalAmount: state.cartTotalAmount + Number(payload.price),
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === payload.id
              ? {
                  ...item,
                  ...payload,
                  u_quantity: item.u_quantity + 1,
                  u_total: Number(item.price) * (item.u_quantity + 1),
                }
              : item
          ),
          cartItemsCount: state.cartItemsCount + 1,
          cartTotalAmount: state.cartTotalAmount + payload.u_total,
        };
      }
    },
    removeItem: (state, { payload }) => {
      return {
        ...state,
        itemCount: state.itemCount - 1,
      };
    },
  },
  extraReducers: {
    calculateTotal: (state, action) => {
      return {
        ...state,
        cartTotalAmount: state.cartItems.reduce(
          (a, b) => parseInt(a.price) + parseInt(b.price)
        ),
      };
    },
  },
});

export const addItem = CartSlice.actions.addItem;
export const removeItem = CartSlice.actions.removeItem;

export default CartSlice.reducer;
