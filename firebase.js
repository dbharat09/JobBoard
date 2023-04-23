import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyATuYUz_U0vrJepD4gjdCgNRyuPa7g_uSU",
  authDomain: "my-sem-37633.firebaseapp.com",
  projectId: "my-sem-37633",
  storageBucket: "my-sem-37633.appspot.com",
  messagingSenderId: "114111316893",
  appId: "1:114111316893:web:da1a31b197d60e88a8a574"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth,db,storage};