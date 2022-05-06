import { createSlice } from "@reduxjs/toolkit";
import { addressApi } from "../services/addressApi";
import { authApi } from "../services/authApi";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    profile: [],
    isLocated: false,
    location: {
      latitude: 11.0067712,
      longitude: 76.955648,
      currentAddress: "",
    },
    delivery_address: [{ delivery_address: "Coimbatore, Tamil Nadu, India" }],
  },
  reducers: {
    setLocation: (state, { payload }) => {
      state.location = {
        latitude: payload.location.latitude,
        longitude: payload.location.longitude,
        currentAddress: payload.address,
      };
      state.isLocated = true;
    },
    resetLocation: (state) => {
      (state.location = {
        latitude: 11.0067712,
        longitude: 76.955648,
        currentAddress: "",
      }),
        (state.isLocated = false);
    },
    resetUser: (state) => {
      return {
        isLocated: false,
        profile: [],
        location: {
          latitude: null,
          longitude: null,
          currentAddress: "",
        },
        delivery_address: [],
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
    builder.addMatcher(
      addressApi.endpoints.getUserAddress.matchFulfilled,
      (state, { payload }) => {
        if (payload.length > 0) {
          state.delivery_address.push(payload);
        }
      }
    );
  },
});

export const { setLocation, resetUser, resetLocation } = UserSlice.actions;

export default UserSlice.reducer;
