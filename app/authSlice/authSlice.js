import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";
import { authApi } from "./authApi";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    authToken: null,
    role: "ROLE_GUEST",
  },
  reducers: {
    login: (state, { payload }) => {
      console.log(state);
      return {
        ...state,
        authToken: "asdf123",
      };
    },
    register: (state, action) => {
      return { ...state };
    },
    logout: (state) => {
      return {
        authToken: null,
        role: "ROLE_GUEST",
      };
    },
    roleSwitch: (state, { payload }) => {
      console.log(state);
      return {
        ...state,
        role: payload.role,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state) => {
      console.log("Rehydrate");
    });
    builder.addMatcher(
      authApi.endpoints.authLogin.matchFulfilled,
      (state, { payload }) => {
        state.authToken = payload.token;
        state.role = payload.user.role;
      }
    );
  },
});

export const login = AuthSlice.actions.login;
export const register = AuthSlice.actions.register;
export const logout = AuthSlice.actions.logout;
export const roleSwitch = AuthSlice.actions.roleSwitch;

export default AuthSlice.reducer;
