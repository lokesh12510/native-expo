import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: (builder) => ({
		authCustomerLogin: builder.mutation({
			query: (body) => {
				console.log(body);
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
			query: ({ email, name, password, phone }) => {
				return {
					url: "auth/customersignup",
					method: "POST",
					body: { email, name, password, contact_number: phone },
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
