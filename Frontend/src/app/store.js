import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../userSlice/userSlice"; 
import { productApi } from "../api/productApi.js";

// Create a Redux store
const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer, user: userReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export default store;