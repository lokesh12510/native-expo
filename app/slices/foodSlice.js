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
			perPage: 6,
			endReached: false,
		},
		isLoading: false,
	},
	reducers: {
		selectKitchen: (state, { payload }) => {
			console.log(payload.kitchen.id);
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
					foodList: [],
					currentPage: 1,
					perPage: 6,
					hasMore: false,
				},
			};
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(api.endpoints.getFoodList.matchFulfilled, (state, { payload }) => {
			state.food.foodList.push(...payload.list);
			state.food.hasMore = payload.list.length > 0 ? true : false;
		});
	},
});

export const { selectKitchen, closeKitchen, selectCategory, removeCategory, setCurrentPage, setPerPage, clearFood } =
	FoodSlice.actions;

export default FoodSlice.reducer;
