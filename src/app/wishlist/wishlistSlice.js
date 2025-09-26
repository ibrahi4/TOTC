import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const KEY = "wishlist";
const readLS = () => JSON.parse(localStorage.getItem(KEY) || "[]");
const writeLS = (v) => localStorage.setItem(KEY, JSON.stringify(v));

export const syncWishlist = createAsyncThunk(
  "wishlist/sync",
  async ({ uid }, { getState }) => {
    if (!uid) return;
    const remote = (await getDoc(doc(db, "users", uid))).data()?.wishlist || [];
    const local = getState().wishlist.items;
    const merged = Array.from(new Set([...remote, ...local]));
    await updateDoc(doc(db, "users", uid), { wishlist: merged });
    writeLS(merged);
    return merged;
  },
);

export const pushWishlist = createAsyncThunk(
  "wishlist/push",
  async ({ uid }, { getState }) => {
    const arr = getState().wishlist.items;
    if (uid) await updateDoc(doc(db, "users", uid), { wishlist: arr });
    writeLS(arr);
    return arr;
  },
);

const slice = createSlice({
  name: "wishlist",
  initialState: { items: readLS() },
  reducers: {
    toggle(state, { payload: courseId }) {
      const i = state.items.indexOf(courseId);
      i >= 0 ? state.items.splice(i, 1) : state.items.push(courseId);
      writeLS(state.items);
    },
  },
  extraReducers: (b) => {
    b.addCase(syncWishlist.fulfilled, (s, a) => {
      if (a.payload) s.items = a.payload;
    });
    b.addCase(pushWishlist.fulfilled, (s, a) => {
      s.items = a.payload;
    });
  },
});
export const { toggle } = slice.actions;
export default slice.reducer;
