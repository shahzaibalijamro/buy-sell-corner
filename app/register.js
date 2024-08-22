const form = document.querySelector("#register-form");
const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const file = document.querySelector("#file");

form.addEventListener('submit', event => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            console.log(error);
        });
})