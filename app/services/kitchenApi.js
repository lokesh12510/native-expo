import { api } from "./api";

export const kitchenApi = api.injectEndpoints({
  endpoints: (build) => ({
    getKitchens: build.mutation({
      query: (body) => ({
        url: "/home/cookList",
        method: "POST",
        body,
      }),
      invalidates: ["Kitchens"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetKitchensMutation } = kitchenApi;
