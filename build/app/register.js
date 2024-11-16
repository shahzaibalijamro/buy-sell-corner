//  Import Section
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth, db } from "../config.js";
import { doc, setDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"; 
import { uploadBytes, getDownloadURL, ref, getStorage } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";


// constants and variables
const form = document.querySelector("#register-form");
const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const file = document.querySelector("#file");
const storage = getStorage();
let url = "";




// signs up users
form.addEventListener('submit', event => {
    event.preventDefault();
    const pfp = file.files[0];
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
            if (pfp) {
                url = await uploadFile(pfp, email.value);
            }
            const user = userCredential.user;
            console.log(user);
            const userRef = await addDoc(collection(db, "user"), {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                pfp: url,
                uid: user.uid
            });
            console.log("Document written with ID: ", userRef.id);
            window.location = "login.html"
        })
        .catch((error) => {
            alert(error)
        });
})




// returns the profile picture's hosted url
async function uploadFile(file, userEmail) {
    const storageRef = ref(storage, userEmail);
    try {
        const uploadImg = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(uploadImg.ref);
        return url;
    } catch (error) {
        console.error(error);
        throw error;
    }
}