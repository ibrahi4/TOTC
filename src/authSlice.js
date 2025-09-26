// src/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
  isInitialized: false, // ✅ علشان نعرف امتى الفايربيز خلص تحميل
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    setAuthInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
  },
});

// ✅ Actions
export const {
  setCurrentUser,
  logout,
  setAuthError,
  clearAuthError,
  setAuthInitialized,
} = authSlice.actions;

// ✅ Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthInitialized = (state) => state.auth.isInitialized;

// ✅ Reducer
export default authSlice.reducer;
