// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC92I90LGCChUxxlADqk1JCOcrhEh7h03I",
  authDomain: "skygallery-15361.firebaseapp.com",
  projectId: "skygallery-15361",
  storageBucket: "skygallery-15361.appspot.com",
  messagingSenderId: "29403101732",
  appId: "1:29403101732:web:352edde441e36fc9a976b1",
  measurementId: "G-X1WSJ45DZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };