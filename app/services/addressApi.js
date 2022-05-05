import { api } from "./api";

export const addressApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserAddress: build.query({
      query: (userId) => ({
        url: `orderconfirm/deliveryaddresslist/${userId}`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserAddressQuery } = addressApi;
