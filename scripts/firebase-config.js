// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that yo
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCtnl4fArDgBcn-MQKAip8-gOn0oRcy4s",
  authDomain: "app-pra-fazer.firebaseapp.com",
  databaseURL: "https://pra-fazer-app-default-rtdb.firebaseio.com",
  projectId: "app-pra-fazer",
  storageBucket: "app-pra-fazer.appspot.com",
  messagingSenderId: "520581718434",
  appId: "1:520581718434:web:6e3980851e70821faf12fb",
  measurementId: "G-ZGG4M6H2NG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export {auth, db};