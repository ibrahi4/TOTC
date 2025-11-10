import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5zvY7rv5rWDXQDDkf0FKb--_fSBi9qe4",
  authDomain: "totc-3ac1d.firebaseapp.com",
  projectId: "totc-3ac1d",
  storageBucket: "totc-3ac1d.appspot.com",
  messagingSenderId: "901689867492",
  appId: "1:901689867492:web:cf8d53c38c81a205f640f1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
