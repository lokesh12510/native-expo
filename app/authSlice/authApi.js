import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    authLogin: builder.mutation({
      query: (body) => {
        console.log(body);
        return {
          url: "auth/login",
          method: "POST",
          body,
        };
      },
    }),
    authRegister: builder.mutation({
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

export const { useAuthLoginMutation, useAuthRegisterMutation } = authApi;
