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
		getFoodByKitchenId: build.mutation({
			query: (body) => ({
				url: "/admin/food",
				method: "POST",
				body,
			}),
			invalidatesTags: ["FoodList"],
		}),
		setFoodStatus: build.mutation({
			query: ({ id, status }) => ({
				url: `/admin/food/updateFoodStatus/${id}/${status}`,
				method: "POST",
				queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
					console.log("first");
				},
			}),
			transformResponse: (response) => {
				console.log(response, "{{", "}}", "+++++++");
			},
			invalidatesTags: ["FoodList"],
		}),
		deleteFood: build.mutation({
			query: ({ id }) => ({
				url: `/admin/food/delete/${id}`,
				method: "POST",
				// async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
				// 	const result = await fetchWithBQ(`/admin/food/updateFoodStatus/${id}/${status}`);
				// 	return result ? { data: id } : { error: result.error };
				// },
			}),
			invalidatesTags: ["FoodList"],
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetFoodListMutation,
	useGetFoodByKitchenIdMutation,
	useSetFoodStatusMutation,
	useDeleteFoodMutation,
} = foodListApi;
