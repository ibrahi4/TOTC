// src/store/listenerMiddleware.js
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth as firebaseAuth } from "../firebase"; // Firebase auth instance
import { setCurrentUser, setAuthInitialized } from "../authSlice";

export const listenerMiddleware = createListenerMiddleware();

// Middleware لتتبع أكشنات Auth (اختياري logging)
listenerMiddleware.startListening({
  matcher: isAnyOf(setCurrentUser, setAuthInitialized),
  effect: (action) => {
    console.log("Auth action fired:", action.type, action.payload);
  },
});

// Firebase Auth Listener
export const startAuthListener = (store) => {
  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      store.dispatch(
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          isAdmin: user.email === "admin@email.com", // مثال لتحديد الادمن
        })
      );
    } else {
      store.dispatch(setCurrentUser(null));
    }
    store.dispatch(setAuthInitialized(true));
  });
};
