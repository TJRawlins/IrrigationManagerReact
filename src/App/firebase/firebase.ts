// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNFyEgr4xuaVYO-Nx4d2qdCGP05sAgiKE",
  authDomain: "dropletimageupload.firebaseapp.com",
  projectId: "dropletimageupload",
  storageBucket: "dropletimageupload.appspot.com",
  messagingSenderId: "520866783241",
  appId: "1:520866783241:web:ee0a6bf255a85ddaab58d8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);