// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../Features/cart/cart.slice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default store;
