// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDhjBIbuG-6n1qjQnt5N9Cr5Uu23ZZcfQg",
    authDomain: "kookie-official-website.firebaseapp.com",
    projectId: "kookie-official-website",
    storageBucket: "kookie-official-website.appspot.com",
    messagingSenderId: "16016666434",
    appId: "1:16016666434:web:442d46e82d5a18b1f6a2db",
    measurementId: "G-FTT9HFCZXL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
