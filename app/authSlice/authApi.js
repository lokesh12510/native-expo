import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.43.4:8000/" }),
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
      query: (body) => {
        return {
          url: "auth/Register",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useAuthLoginMutation, useAuthRegisterMutation } = authApi;
