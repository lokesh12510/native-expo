import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
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
	// baseQuery: staggeredBaseQueryWithBailOut,
	keepUnusedDataFor: 30,
	refetchOnMountOrArgChange: true,
	refetchOnFocus: true,
	refetchOnReconnect: true,
	endpoints: () => ({}),
});

const staggeredBaseQueryWithBailOut = retry(
	async (args, api, extraOptions) => {
		const result = await fetchBaseQuery({
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
		})(args, api, extraOptions);

		// bail out of re-tries immediately if unauthorized,
		// because we know successive re-retries would be redundant
		if (result.error?.status === 401) {
			retry.fail(result.error);
		}

		return result;
	},
	{
		maxRetries: 5,
	}
);
