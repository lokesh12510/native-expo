import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: (builder) => ({
		authCustomerLogin: builder.mutation({
			query: (body) => {
				return {
					url: "auth/login",
					method: "POST",
					body,
				};
			},
		}),
		authCustomerRegister: builder.mutation({
			query: (body) => {
				return {
					url: "auth/customersignup",
					method: "POST",
					body,
				};
			},
		}),
		authCookLogin: builder.mutation({
			query: (body) => {
				console.log(body);
				return {
					url: "admin/auth/login",
					method: "POST",
					body,
				};
			},
		}),
		authCookRegister: builder.mutation({
			query: (body) => {
				return {
					url: "auth/cooksignup",
					method: "POST",
					body,
				};
			},
		}),
	}),
});

export const {
	useAuthCookLoginMutation,
	useAuthCookRegisterMutation,
	useAuthCustomerLoginMutation,
	useAuthCustomerRegisterMutation,
} = authApi;
