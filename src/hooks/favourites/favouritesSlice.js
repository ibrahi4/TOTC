import { createSlice } from "@reduxjs/toolkit";

// Load favorites from localStorage if exist
const initialState = JSON.parse(localStorage.getItem("favorites")) || [];

const favouritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    pushFavourites: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state));
    },
    removeFavourite: (state, action) => {
      const updated = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    },
    clearFavourites: () => {
      localStorage.removeItem("favorites");
      return [];
    },
  },
});

export const { pushFavourites, removeFavourite, clearFavourites } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;
