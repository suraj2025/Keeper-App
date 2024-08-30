// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCK2Cw71srRXo66by2afivhqPA6S4jdCnQ",
  authDomain: "keeper-807ae.firebaseapp.com",
  projectId: "keeper-807ae",
  storageBucket: "keeper-807ae.appspot.com",
  messagingSenderId: "143348181263",
  appId: "1:143348181263:web:a7f95b7612fb36db2ef67a",
  measurementId: "G-CPGQT4S6GT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);