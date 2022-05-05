import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import {
  getCurrentDay,
  getCurrentDayIndex,
  getCurrentPeriod,
  getCurrentTiming,
} from "../../utils/datePicker";

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
              u_day: getCurrentDay(),
              u_hour: getCurrentTiming(),
              u_period: getCurrentPeriod(),
              u_date_time: new Date(),
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
          cartTotalAmount: state.cartTotalAmount + Number(payload.price),
        };
      }
    },
    updateTimings: (state, { payload }) => {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === payload.id
            ? {
                ...item,
                ...payload.data,

                u_date_time: payload.data?.u_day
                  ? moment().isoWeekday() <=
                    getCurrentDayIndex(payload.data?.u_day)
                    ? moment().isoWeekday(
                        getCurrentDayIndex(payload.data?.u_day)
                      )
                    : moment()
                        .isoWeekday(getCurrentDayIndex(payload.data?.u_day))
                        .add(1, "week")
                  : item.u_date_time,
              }
            : item
        ),
      };
    },
    removeItem: (state, { payload }) => {
      const [item] = state.cartItems.filter((item) => item.id === payload.id);
      state.cartItemsCount = state.cartItemsCount - item.u_quantity;

      state.cartTotalAmount = state.cartTotalAmount - item.u_total;

      state.cartItems = state.cartItems.filter(
        (item) => item.id !== payload.id
      );
    },

    reduceItem: (state, { payload }) => {
      const [item] = state.cartItems.filter((item) => item.id === payload.id);
      state.cartItemsCount = state.cartItemsCount - 1;
      state.cartTotalAmount = state.cartTotalAmount - Number(item.price);

      state.cartItems = state.cartItems.map((item) =>
        item.id === payload.id
          ? {
              ...item,
              u_quantity: item.u_quantity - 1,
              u_total: item.u_total - Number(item.price),
            }
          : item
      );
    },

    clearCart: (state) => {
      return {
        cartInitialized: false,
        cartItems: [],
        cartItemsCount: 0,
        cartTotalAmount: 0,
      };
    },
  },
});

export const { addItem, removeItem, reduceItem, updateTimings, clearCart } =
  CartSlice.actions;

export default CartSlice.reducer;
