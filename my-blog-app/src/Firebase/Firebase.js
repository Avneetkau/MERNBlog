// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-2d421.firebaseapp.com",
  projectId: "mern-blog-2d421",
  storageBucket: "mern-blog-2d421.firebasestorage.app",
  messagingSenderId: "24831851324",
  appId: "1:24831851324:web:2e603b2aed93430f9efc39"
};

// Initialize Firebase and export it
export const app = initializeApp(firebaseConfig);