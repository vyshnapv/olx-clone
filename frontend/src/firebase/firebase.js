import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAEIJDAJnrdSCvYaX2SM-n8nwc_JArae9s",
  authDomain: "olx-clone-9ab7f.firebaseapp.com",
  projectId: "olx-clone-9ab7f",
  storageBucket: "olx-clone-9ab7f.firebasestorage.app",
  messagingSenderId: "525708417964",
  appId: "1:525708417964:web:76d56ed73a8ebafd2ab809",
  measurementId: "G-8Y4BV58BLK"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);