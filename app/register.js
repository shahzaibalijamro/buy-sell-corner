import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth } from "../config.js";

const form = document.querySelector("#register-form");
const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const file = document.querySelector("#file");

form.addEventListener('submit', event =>{
    event.preventDefault();
    console.log(file.files[0]);
    // createUserWithEmailAndPassword(auth, email.value, password.value)
    //   .then((userCredential) => {
    //     const user = userCredential.user;
    //     console.log(user);
        
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
})