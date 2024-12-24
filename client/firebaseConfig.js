import { getStorage } from "firebase/storage";
import "react-native-get-random-values";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDqTHyId_XBIcD4iDYW45Ukq_WrezLyPE",
  authDomain: "evenhubfull-9b9bd.firebaseapp.com",
  projectId: "evenhubfull-9b9bd",
  storageBucket: "evenhubfull-9b9bd.firebasestorage.app",
  messagingSenderId: "720569578861",
  appId: "1:720569578861:web:950e8226a135d579981664",
  measurementId: "G-3XW1PLX0EC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { getStorage };
