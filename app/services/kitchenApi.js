import { resetLocation } from "../slices/userSlice";
import { api } from "./api";

export const kitchenApi = api.injectEndpoints({
  endpoints: (build) => ({
    getKitchens: build.mutation({
      query: (body) => ({
        url: "/home/cookList",
        method: "POST",
        body,
      }),
      // onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
      //   try {
      //     // Resolving the private API call
      //     const { data: kitchens } = await queryFulfilled;

      //     if (kitchens.total === 0) {
      //       dispatch(resetLocation());
      //     }

      //     return kitchens;

      //     // dispatch(
      //     //   apiSlice.util.updateQueryData('getPersons', _, (draft) => {
      //     //     Object.assign(draft, state);
      //     //   })
      //     // );
      //   } catch (e) {
      //     console.error(e);
      //   }
      // },
      invalidates: ["Kitchens"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetKitchensMutation } = kitchenApi;
