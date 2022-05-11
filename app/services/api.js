import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";

export const api = createApi({
	tagTypes: ["Kitchens", "FoodType", "FoodList", "myOrders"],
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			// By default, if we have a token in the store, let's use that for authenticated requests
			const token = getState().auth.authToken;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			console.log(token, "***");
			return headers;
		},
	}),
	keepUnusedDataFor: 30,
	refetchOnMountOrArgChange: true,
	refetchOnFocus: true,
	refetchOnReconnect: true,
	endpoints: () => ({}),
});
