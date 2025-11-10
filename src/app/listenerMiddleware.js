// src/store/listenerMiddleware.js
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth as firebaseAuth, db } from "../firebase"; // Firebase auth & Firestore
import { setCurrentUser, setAuthInitialized } from "../authSlice";
import { doc, getDoc } from "firebase/firestore";

export const listenerMiddleware = createListenerMiddleware();

// Logging اختياري لتتبع أي أكشن Auth
listenerMiddleware.startListening({
  matcher: isAnyOf(setCurrentUser, setAuthInitialized),
  effect: (action) => {
    console.log("Auth action fired:", action.type, action.payload);
  },
});

// Firebase Auth Listener
export const startAuthListener = (store) => {
  onAuthStateChanged(firebaseAuth, async (user) => {
    if (user) {
      try {
        // جلب بيانات المستخدم من Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);
        const userData = userSnap.exists() ? userSnap.data() : {};

        store.dispatch(
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            name: userData.name || user.displayName,
            isAdmin: userData.isAdmin || false, // true إذا Admin
          })
        );
      } catch (err) {
        console.error("Error fetching user data:", err);
        store.dispatch(
          setCurrentUser({ uid: user.uid, email: user.email, isAdmin: false })
        );
      }
    } else {
      // Logout أو user غير موجود
      store.dispatch(setCurrentUser(null));
    }

    // تأكيد انتهاء التهيئة
    store.dispatch(setAuthInitialized(true));
  });
};
