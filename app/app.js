import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth, db } from "../config.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const logoutBtn = document.querySelector("#logoutBtn");
const loginBtn = document.querySelector("#loginBtn");
const pfp = document.querySelector("#pfp");
let userDataArr = [];


function navbarSet() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            loginBtn.style.display = "none";
            const q = query(collection(db, "user"), where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                userDataArr.push(doc.data());
            });
            pfp.src = userDataArr[0].pfp;
        } else {
            logoutBtn.style.display = "none";
        }
    });
}
navbarSet();




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