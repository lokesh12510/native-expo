import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    authToken: null,
    role: "ROLE_CUSTOMER",
    loading: false,
  },
  reducers: {
    authReset: (state) => {
      return {
        authToken: null,
        role: "ROLE_CUSTOMER",
      };
    },
    loading: (state) => {
      return {
        ...state,
        loading: !state.loading,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.authCustomerLogin.matchFulfilled,
      (state, { payload }) => {
        state.authToken = payload.token;
        state.role = payload.user.role;
        state.loading = false;
      }
    );
    builder.addMatcher(
      authApi.endpoints.authCustomerRegister.matchFulfilled,
      (state) => {
        state.loading = false;
      }
    );
    builder.addMatcher(
      authApi.endpoints.authCookLogin.matchFulfilled,
      (state, { payload }) => {
        state.authToken = payload.token;
        state.role = payload.user.role;
        state.loading = false;
      }
    );
  },
});

export const authReset = AuthSlice.actions.authReset;
export const loading = AuthSlice.actions.loading;

export default AuthSlice.reducer;
