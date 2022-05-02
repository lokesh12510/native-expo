import { api } from "./api";

export const foodListApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFoodList: build.mutation({
      query: (body) => ({
        url: "/home/foodList",
        method: "POST",
        body,
      }),
      invalidates: ["FoodList"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetFoodListMutation } = foodListApi;
