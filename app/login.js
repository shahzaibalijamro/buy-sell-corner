import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth } from "../config.js";

const email = document.querySelector('#email');
const password = document.querySelector('#password');
const forgotPassword = document.querySelector('#forgotPassword');
const form = document.querySelector('#form');

form.addEventListener('submit', event => {
    event.preventDefault();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.location = "index.html";
        } else {
            signInWithEmailAndPassword(auth, email.value, password.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    window.location = "index.html";
                })
                .catch((error) => {
                    alert(error);
                });
        }
    });
})

forgotPassword.addEventListener('click', (event)=>{
    event.preventDefault();
    forgotPasswordFunc();
})

function forgotPasswordFunc() {
    const passwordResetEmail = prompt('Enter your email for verification!');
    sendPasswordResetEmail(auth, passwordResetEmail)
        .then(() => {
            alert("Password reset email sent!")
        })
        .catch((error) => {
            alert(error);
        });
} 