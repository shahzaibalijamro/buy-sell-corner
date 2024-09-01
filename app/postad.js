//  Import Section
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth, db } from "../config.js";
import { collection, query, where, getDocs, doc, setDoc, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { uploadBytes, getDownloadURL, ref, getStorage } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

//  constants and variables
const logoutBtn = document.querySelector("#logoutBtn");
const pfp = document.querySelector("#pfp");
let userDataArr = [];
const form = document.querySelector("#form");
const btnPostad = document.querySelector(".btn-postad");
const productPic = document.querySelector("#productPic");
const productTitle = document.querySelector("#productTitle");
const productDescription = document.querySelector("#productDescription");
const productPrice = document.querySelector("#productPrice");
const sellerName = document.querySelector("#sellerName");
const sellerAddress = document.querySelector("#sellerAddress");
const sellerNumber = document.querySelector("#sellerNumber");
const uploadText = document.querySelector('#uploadText');
const storage = getStorage();
let url = "";


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



form.addEventListener("submit", async event => {
    event.preventDefault();
    btnPostad.innerHTML = `posting <span class="loading loading-dots loading-md"></span>`
    const adImg = productPic.files[0];
    if (adImg) {
        url = await uploadFile(adImg, `${productTitle.value} + ${Date.now()}`);
    }
    const adPost = await addDoc(collection(db, "ad"), {
        productTitle: productTitle.value,
        productDescription: productDescription.value,
        productPrice: productPrice.value,
        productPic: url,
        sellerName: sellerName.value,
        sellerAddress: sellerAddress.value,
        sellerNumber: sellerNumber.value,
    });
    console.log("Document written with ID: ", adPost.id);
    showSnackbar();
    btnPostad.innerHTML = `Post Now`
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


// converting file into Url
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


function showSnackbar() {
    var snackbar = document.getElementById("snackbar");
    snackbar.className = "show";
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}