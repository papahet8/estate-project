// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_ACCESS_KEY,
  authDomain: "real-estate-3f520.firebaseapp.com",
  projectId: "real-estate-3f520",
  storageBucket: "real-estate-3f520.appspot.com",
  messagingSenderId: "216027748998",
  appId: "1:216027748998:web:c390ea9b64494e734acf07"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);