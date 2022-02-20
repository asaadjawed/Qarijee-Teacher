// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiYxqTu5RscY4KgTtymEpc8nyKmgQ0yx4",
  authDomain: "qarijee-teacher.firebaseapp.com",
  projectId: "qarijee-teacher",
  storageBucket: "qarijee-teacher.appspot.com",
  messagingSenderId: "303604546627",
  appId: "1:303604546627:web:4c8921758811cd9b09e8f6",
  measurementId: "G-CR4E445THF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig)

export { firebase, app };