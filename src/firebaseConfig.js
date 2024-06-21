// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyjL0uxs_02kZqWMIgLC7xhZ6CNrAEHEI",
  authDomain: "my-music-festival-52542.firebaseapp.com",
  projectId: "my-music-festival-52542",
  storageBucket: "my-music-festival-52542.appspot.com",
  messagingSenderId: "320645031563",
  appId: "1:320645031563:web:55f77a6005047025ae568e",
  measurementId: "G-874V9J31EM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, doc, getDoc, setDoc };