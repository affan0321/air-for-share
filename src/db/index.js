import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef, set, onValue, remove } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAatNAKbgIRgYnE3qC4cIk9sVfb2zC1BDQ",
  authDomain: "affan-1db02.firebaseapp.com",
  projectId: "affan-1db02",
  storageBucket: "affan-1db02.appspot.com",
  messagingSenderId: "923711540965",
  appId: "1:923711540965:web:e680c73d9fbbc5f59ace0c",
  databaseURL: "https://affan-1db02-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Realtime Database and Storage
const database = getDatabase(app);
const storage = getStorage(app);

export {
  app,
  database,
  dbRef,
  set,
  onValue,
  remove,
  storage,
  storageRef,
  uploadBytesResumable,
  getDownloadURL,
  
};
