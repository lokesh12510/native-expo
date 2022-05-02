import { api } from "./api";

export const foodTypeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFoodTypeList: build.mutation({
      query: (body) => ({
        url: "/home/foodTypeList",
        method: "POST",
        body,
      }),
      invalidates: ["FoodType"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetFoodTypeListMutation } = foodTypeApi;
