import { signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth } from "../config.js";

const logoutBtn = document.querySelector("#logoutBtn");

logoutBtn.addEventListener("click", event => {
    event.preventDefault();
    signOutFunc();
})

function signOutFunc() {
    signOut(auth).then(() => {
        alert("Sign-out successful.");
        window.location = "login.html";
    }).catch((error) => {
        alert("An error happened.");
    });
}