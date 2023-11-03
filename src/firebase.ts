import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);