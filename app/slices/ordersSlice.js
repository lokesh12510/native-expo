import { createSlice } from "@reduxjs/toolkit";
import { api } from "../services/api";

const OrdersSlice = createSlice({
	name: "orders",
	initialState: {
		ordersList: [],
		isLoading: false,
		currentPage: 1,
		perPage: 6,
		endReached: false,
	},
	reducers: {
		setCurrentPage: (state, { payload }) => {
			state.currentPage = payload;
		},
		setPerPage: (state, { payload }) => {
			state.perPage = payload;
		},
		clearOrders: (state) => {
			return {
				ordersList: [],
				isLoading: false,
				currentPage: 1,
				perPage: 6,
				endReached: false,
			};
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(api.endpoints.getCookOrders.matchFulfilled, (state, { payload }) => {
			manageOrderList(state, payload);
		});
	},
});

export const { setCurrentPage, setPerPage, clearOrders } = OrdersSlice.actions;

export default OrdersSlice.reducer;

const manageOrderList = (state, payload) => {
	state.currentPage > 1 ? state.ordersList.push(...payload.list) : (state.ordersList = payload.list);
	state.endReached = payload.list.length === 0 ? true : false;
};
