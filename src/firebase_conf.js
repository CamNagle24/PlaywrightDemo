// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0w7UzP-Gj3N3sTN0608slUYC43qO6Q9s",
  authDomain: "techdemo-a3339.firebaseapp.com",
  projectId: "techdemo-a3339",
  storageBucket: "techdemo-a3339.firebasestorage.app",
  messagingSenderId: "726264543324",
  appId: "1:726264543324:web:e344a47b1f368cf8b30e99"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp)