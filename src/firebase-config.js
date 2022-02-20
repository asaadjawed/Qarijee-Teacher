// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4PzxoLDoO2FFQ0ELHOoKYQn5moFXzGwc",
  authDomain: "qarijee-teacher1.firebaseapp.com",
  projectId: "qarijee-teacher1",
  storageBucket: "qarijee-teacher1.appspot.com",
  messagingSenderId: "528520509392",
  appId: "1:528520509392:web:89c203ba98e5c6c9882bd5",
  measurementId: "G-598QS1BPTR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export { ref, uploadBytes, getDownloadURL };
