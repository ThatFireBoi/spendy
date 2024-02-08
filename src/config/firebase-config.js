// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv6v36ngVuiiyh9MUBz6xNMg-YFef62wI",
  authDomain: "spendy-86fa0.firebaseapp.com",
  projectId: "spendy-86fa0",
  storageBucket: "spendy-86fa0.appspot.com",
  messagingSenderId: "295050005894",
  appId: "1:295050005894:web:af64cd3a26b56c64567007",
  measurementId: "G-HV37NBY5YD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
