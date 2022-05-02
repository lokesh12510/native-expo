import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./services/authApi";
import authReducer from "./slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import cartReducer from "./slices/cartSlice";
import filterReducer from "./slices/FilterSlice";
import { api } from "./services/api";
import userReducer from "./slices/userSlice";

const reducers = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  filter: filterReducer,
  user: userReducer,
  [authApi.reducerPath]: authApi.reducer,
  [api.reducerPath]: api.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "user"],
};

const RootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return reducers(state, action);
};

const _persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = configureStore({
  devTools: __DEV__,
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authApi.middleware,
      api.middleware
    ),
});
export const persistor = persistStore(store);

setupListeners(store.dispatch);
