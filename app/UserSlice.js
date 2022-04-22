import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userName: null,
    authToken: null,
    profile: null,
    userId: null,
    status: "guest",
    isAdmin: false,
    isCook: false,
  },
  reducers: {
    login: (state, action) => {
      return { ...state };
    },
    register: (state, action) => {
      return { ...state };
    },
    logout: (state, action) => {
      return { ...state };
    },
  },
});

export const login = UserSlice.actions.login;
export const register = UserSlice.actions.register;

export default UserSlice.reducer;
