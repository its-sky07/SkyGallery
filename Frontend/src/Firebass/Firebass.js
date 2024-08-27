// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLdklReru0DGEbsyWPYSDJPmblW5wk48o",
  authDomain: "skyshop-654bf.firebaseapp.com",
  projectId: "skyshop-654bf",
  storageBucket: "skyshop-654bf.appspot.com",
  messagingSenderId: "14891250792",
  appId: "1:14891250792:web:9225aed96d6ac85b5177dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };