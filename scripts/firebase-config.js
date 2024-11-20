// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that yo
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQANTjQ3dnxUOEkxjfEkMCb1lKCCgLVys",
  authDomain: "gastronomia-memoria.firebaseapp.com",
  databaseURL: "https://gastronomia-memoria-default-rtdb.firebaseio.com",
  projectId: "gastronomia-memoria",
  storageBucket: "gastronomia-memoria.firebasestorage.app",
  messagingSenderId: "9069224244",
  appId: "1:9069224244:web:58b27683f182a0a1918561",
  measurementId: "G-BDK229B16C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export {auth, db};