import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
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

const uploadImageAsync = async (uri: any) => {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log("xhr: ", e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(getStorage(), uuidv4());
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
};

export const _handleImagePicked = async (pickerResult: any) => {
  try {
    if (!pickerResult.cancelled) {
      const uploadUrl = await uploadImageAsync(pickerResult.uri);
      return uploadUrl;
    }
  } catch (e) {
    console.log(e);
  }
};
