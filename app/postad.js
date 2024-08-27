//  Import Section
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth, db } from "../config.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";



//  Calling document
const logoutBtn = document.querySelector("#logoutBtn");
const pfp = document.querySelector("#pfp");
let userDataArr = [];
const form = document.querySelector("#form");
const productPic = document.querySelector("#productPic");
const productTitle = document.querySelector("#productTitle");
const productDescription = document.querySelector("#productDescription");
const productPrice = document.querySelector("#productPrice");
const sellerName = document.querySelector("#sellerName");
const sellerAddress = document.querySelector("#sellerAddress");
const sellerNumber = document.querySelector("#sellerNumber");
const uploadText = document.querySelector('#uploadText');



//  Check user status
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const q = query(collection(db, "user"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            userDataArr.push(doc.data());
        });
        pfp.src = userDataArr[0].pfp;
    } else {
        alert("Only logged in users are allowed to post ads!");
        window.location = "index.html";
    }
});



form.addEventListener("submit", event => {
    event.preventDefault();
    console.log(productPic.files[0]);
    console.log(productTitle.value);
    console.log(productDescription.value);
    console.log(productPrice.value);
    console.log(sellerName.value);
    console.log(sellerAddress.value);
    console.log(sellerNumber.value);
})



//  Logout function
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



// fixing file name not changing when selected
function fixFileName() {
    productPic.addEventListener('change', function () {
        if (productPic.files.length > 0) {
            uploadText.textContent = productPic.files[0].name;
        } else {
            uploadText.textContent = 'Upload Product Photo';
        }
    });
}
fixFileName();