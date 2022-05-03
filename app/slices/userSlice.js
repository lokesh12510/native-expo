import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    profile: [],
    isLocated: false,
    location: {
      latitude: 11.0067712,
      longitude: 76.955648,
    },
  },
  reducers: {
    setLocation: (state, { payload }) => {
      return {
        ...state,
        location: {
          latitude: payload.location.latitude,
          longitude: payload.location.longitude,
        },
        isLocated: true,
      };
    },
    resetUser: (state) => {
      return {
        isLocated: false,
        profile: [],
        location: {
          latitude: null,
          longitude: null,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.authCustomerLogin.matchFulfilled,
      (state, { payload }) => {
        state.profile = payload.user;
      }
    );
  },
});

export const { setLocation, resetUser } = UserSlice.actions;

export default UserSlice.reducer;
