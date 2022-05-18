import { createSlice } from "@reduxjs/toolkit";
import { api } from "../services/api";

const FoodSlice = createSlice({
	name: "food",
	initialState: {
		kitchen: {
			isKitchen: false,
			kitchenId: null,
			kitchenInfo: [],
		},
		category: {
			isCategory: false,
			categoryType: null,
			categoryInfo: [],
		},
		search: {
			isSearched: false,
			searchInfo: "",
		},
		food: {
			foodList: [],
			currentPage: 1,
			perPage: 10,
			endReached: false,
		},
		isLoading: false,
	},
	reducers: {
		selectKitchen: (state, { payload }) => {
			return {
				...state,
				kitchen: {
					isKitchen: true,
					kitchenId: payload.kitchen.id,
					kitchenInfo: payload.kitchen,
				},
			};
		},
		closeKitchen: (state) => {
			return {
				...state,
				kitchen: {
					isKitchen: false,
					kitchenId: null,
					kitchenInfo: [],
				},
			};
		},
		selectCategory: (state, { payload }) => {
			return {
				...state,
				category: {
					isCategory: true,
					categoryType: payload.category.id,
					categoryInfo: payload.category,
				},
			};
		},
		removeCategory: (state) => {
			return {
				...state,
				category: {
					isCategory: false,
					categoryType: null,
					categoryInfo: [],
				},
			};
		},
		setCurrentPage: (state, { payload }) => {
			return {
				...state,
				food: {
					...state.food,
					currentPage: payload,
				},
			};
		},
		setPerPage: (state, { payload }) => {
			return {
				...state,
				food: {
					...state.food,
					perPage: payload,
				},
			};
		},
		clearFood: (state) => {
			return {
				...state,
				food: {
					// foodList: [],
					currentPage: 1,
					perPage: 10,
					endReached: false,
				},
			};
		},
		deleteFoodItem: (state, { payload }) => {
			state.food.foodList = state.food.foodList.filter((item) => item.id !== payload.id);
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(api.endpoints.getFoodList.matchFulfilled, (state, { payload }) => {
			manageFoodList(state, payload);
		});
		builder.addMatcher(api.endpoints.getFoodByKitchenId.matchFulfilled, (state, { payload }) => {
			manageFoodList(state, payload);
		});
	},
});

export const {
	selectKitchen,
	closeKitchen,
	selectCategory,
	removeCategory,
	setCurrentPage,
	setPerPage,
	clearFood,
	deleteFoodItem,
} = FoodSlice.actions;

export default FoodSlice.reducer;

const manageFoodList = (state, payload) => {
	state.food.currentPage > 1 ? state.food.foodList.push(...payload.list) : (state.food.foodList = payload.list);
	console.log(payload.list.length, state.food.perPage);
	state.food.endReached = payload.list.length === 0 || payload.list.length < state.food.perPage ? true : false;
};
