import { createSlice } from "@reduxjs/toolkit";
import { api } from "../services/api";

const OrdersSlice = createSlice({
  name: "orders",
  initialState: {
    ordersList: [],
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getOrders.matchFullFilled,
      (state, { payload }) => {
        state.ordersList.push(payload);
      }
    );
  },
});

export default OrdersSlice.reducer;
