import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMex9h7dK2TU962iJGcYNzSkQxUxnHYTo",
  authDomain: "x-reloaded-10f1b.firebaseapp.com",
  projectId: "x-reloaded-10f1b",
  storageBucket: "x-reloaded-10f1b.appspot.com",
  messagingSenderId: "410791396064",
  appId: "1:410791396064:web:6e905fb89978227fcb8685",
  measurementId: "G-2BKYP7E08B"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);