// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAOxbMZreMxiMWzoCrJiahbCdT_-J6TTpQ",
    authDomain: "ghpv-262ef.firebaseapp.com",
    projectId: "ghpv-262ef",
    storageBucket: "ghpv-262ef.firebasestorage.app",
    messagingSenderId: "585716488084",
    appId: "1:585716488084:web:00391cb562ad0657622181",
    measurementId: "G-WNR1H8J6PE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
