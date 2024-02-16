import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDv4w8L5sURwzGjsvSPIw09WBAeZfg2idY",
  authDomain: "makeit-b3f20.firebaseapp.com",
  projectId: "makeit-b3f20",
  storageBucket: "makeit-b3f20.appspot.com",
  messagingSenderId: "367181709182",
  appId: "1:367181709182:web:eaf76ff51179620db13d2f",
  measurementId: "G-RPVJJX68LQ",
};
export const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const provider = new GoogleAuthProvider();
