// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDCLOWGJaZJOx-QmdACx6UESzdk1NrYuo",
  authDomain: "netflixgpt-28511.firebaseapp.com",
  projectId: "netflixgpt-28511",
  storageBucket: "netflixgpt-28511.firebasestorage.app",
  messagingSenderId: "141278500042",
  appId: "1:141278500042:web:e74e8a1155cfe60e9f9033",
  measurementId: "G-PVJSVDZKQB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
