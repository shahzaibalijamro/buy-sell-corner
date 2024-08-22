import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCJYQmx_OEjYkClz9lqWJTb6FQXmRBwVho",
    authDomain: "buy-sell-corner-by-shahzaib.firebaseapp.com",
    projectId: "buy-sell-corner-by-shahzaib",
    storageBucket: "buy-sell-corner-by-shahzaib.appspot.com",
    messagingSenderId: "970700601808",
    appId: "1:970700601808:web:580f6ddd2bd86683bea1d5",
    measurementId: "G-YRDP5QGR5L"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

// ok