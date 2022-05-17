import { api } from "./api";

export const ordersApi = api.injectEndpoints({
	endpoints: (build) => ({
		orderConfirm: build.mutation({
			query: (body) => {
				return {
					url: "/orderconfirm/store",
					method: "POST",
					body,
				};
			},
			invalidates: ["myOrders"],
		}),
		getOrders: build.mutation({
			query: (body) => {
				return {
					url: "/myorders/getorders",
					method: "POST",
					body,
				};
			},
			invalidates: ["myOrders"],
		}),
		getCookOrders: build.mutation({
			query: (body) => {
				return {
					url: "/admin/orders",
					method: "POST",
					body,
				};
			},
			invalidates: ["myOrders"],
		}),
	}),
});

export const { useOrderConfirmMutation, useGetOrdersMutation, useGetCookOrdersMutation } = ordersApi;
