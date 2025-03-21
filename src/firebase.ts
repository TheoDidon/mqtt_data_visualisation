// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF9p1gSAVEeeX-HhVKA1BsKlobRDTUHtk",
  authDomain: "test-mqtt-13f6d.firebaseapp.com",
  projectId: "test-mqtt-13f6d",
  storageBucket: "test-mqtt-13f6d.firebasestorage.app",
  messagingSenderId: "334490222587",
  appId: "1:334490222587:web:d88134b81f35e7fcb1555e",
  measurementId: "G-PMWSHYTRE4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
