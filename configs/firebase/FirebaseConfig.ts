// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAptfM0efB7uWV87EaOJ9p5eT-GIjUN4jY",
  authDomain: "iungo-8f30b.firebaseapp.com",
  projectId: "iungo-8f30b",
  storageBucket: "iungo-8f30b.appspot.com",
  messagingSenderId: "883249698465",
  appId: "1:883249698465:web:6389262474b9bfe53102e0",
  measurementId: "G-KT88368V8N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);