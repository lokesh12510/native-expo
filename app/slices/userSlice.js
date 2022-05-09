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
    delivery_address: [],
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
      state.location = {
        latitude: 11.0067712,
        longitude: 76.955648,
        currentAddress: "",
      };
      state.isLocated = false;
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
    addDeliveryAddress: (state, { payload }) => {
      state.delivery_address.push(payload);
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
        const newList = [...payload];
        state.delivery_address = [
          { delivery_address: state.location.currentAddress },
          ...newList,
        ];
      }
    );
  },
});

export const { setLocation, resetUser, resetLocation, addDeliveryAddress } =
  UserSlice.actions;

export default UserSlice.reducer;
