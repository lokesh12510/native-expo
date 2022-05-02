import { createSlice } from "@reduxjs/toolkit";

const Filter = createSlice({
  name: "filter",
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
  },
});

export const selectKitchen = Filter.actions.selectKitchen;
export const closeKitchen = Filter.actions.closeKitchen;
export const selectCategory = Filter.actions.selectCategory;
export const removeCategory = Filter.actions.removeCategory;

export default Filter.reducer;
