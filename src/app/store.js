// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import auth from "../authSlice";
// أمثلة ل slices تانية
import cart from "../hooks/cartSlice";
import favorites from "../hooks/favourites/favouritesSlice";
import { listenerMiddleware, startAuthListener } from "./listenerMiddleware";

export const store = configureStore({
  reducer: {
    auth,
    cart,
    favorites,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});

// تشغيل الـ Firebase listener
startAuthListener(store);
