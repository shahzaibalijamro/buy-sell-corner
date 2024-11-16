import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAX4rfJb7WD4PsK8MGW3Vwlfpz-GwT6ozI",
  authDomain: "shahzaib-buy-sell-corner.firebaseapp.com",
  projectId: "shahzaib-buy-sell-corner",
  storageBucket: "shahzaib-buy-sell-corner.appspot.com",
  messagingSenderId: "714149901622",
  appId: "1:714149901622:web:a4b3bea9fe0a683c56af97",
  measurementId: "G-0DK4YVVV0D"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);