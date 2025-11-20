import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzIRXq6lFpCqGwZh6b6aPryEGgOUbdtB4",
  authDomain: "com.firebasemahasiswaa",
  projectId: "fir-mahasiswa-24bab",
  storageBucket: "fir-mahasiswa-24bab.firebasestorage.app",
  messagingSenderId: "551181460734",
  appId: "1:551181460734:android:643ccfc69ff543266171af"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
