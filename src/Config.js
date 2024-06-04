import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqPHF9slom8K9Z_0eQ8YTahs-sIkaafz4",
  authDomain: "shopperstop-with-firebase.firebaseapp.com",
  projectId: "shopperstop-with-firebase",
  storageBucket: "shopperstop-with-firebase.appspot.com",
  messagingSenderId: "928596453860",
  appId: "1:928596453860:web:853225b6baf05074053ff1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);