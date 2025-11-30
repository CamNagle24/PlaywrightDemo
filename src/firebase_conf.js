// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOdmP7jmB76sy0bb96Z4rFSQmbrQvma2I",
  authDomain: "homework2-a4c36.firebaseapp.com",
  projectId: "homework2-a4c36",
  storageBucket: "homework2-a4c36.firebasestorage.app",
  messagingSenderId: "207219590690",
  appId: "1:207219590690:web:cf3b79f8aa976b719c2c7b"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp)