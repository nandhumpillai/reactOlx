import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyDmu4GcjBVDEcCgrmBysR-s-yflgkO2Bws",
    authDomain: "reactdemo-f7e65.firebaseapp.com",
    projectId: "reactdemo-f7e65",
    storageBucket: "reactdemo-f7e65.appspot.com",
    messagingSenderId: "1001989052681",
    appId: "1:1001989052681:web:7b6bbcfa7c61003a255bd8",
    measurementId: "G-9G1PQ9BK81"
};
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const firebaseInstance = getFirestore(app);