// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9gRXzD5hPxpbneA7F70sDuD1h9KCZQE0",
  authDomain: "sumit-study-app.firebaseapp.com",
  projectId: "sumit-study-app",
  storageBucket: "sumit-study-app.appspot.com",
  messagingSenderId: "250544570806",
  appId: "1:250544570806:web:d9a17678a61d0029a78117",
  measurementId: "G-N6P42BTJ96",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the authentication service
export const auth = getAuth(app);

// Get a reference to the Firestore service
export const firestore = getFirestore(app);

export const storage = getStorage(app);
