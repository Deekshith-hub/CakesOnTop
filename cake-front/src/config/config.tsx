import { initializeApp } from "firebase/app";
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBpzFVT3svLbmVz1cWKFrz4P0nNsm4h1Fw",
  authDomain: "authpass-a00cd.firebaseapp.com",
  projectId: "authpass-a00cd",
  storageBucket: "authpass-a00cd.appspot.com",
  messagingSenderId: "93534481307",
  appId: "1:93534481307:web:f7cee418bcadf913744f3e",
  measurementId: "G-768TME38JE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app};