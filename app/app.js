import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth, db } from "../config.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const logoutBtn = document.querySelector("#logoutBtn");
const loginBtn = document.querySelector("#loginBtn");
const pfp = document.querySelector("#pfp");
let userDataArr = [];
let adArr = [];
const cardWrapper = document.querySelector('.card-wrapper');


async function getData() {
    const querySnapshot = await getDocs(collection(db, "ad"));
    querySnapshot.forEach((doc) => {
        adArr.push(doc.data());
    });
    renderData();
}
getData();


function renderData() {
    cardWrapper.innerHTML = "";
    adArr.map((item,index) => {
        cardWrapper.innerHTML += `
        <div class="card bg-base-100 w-[18rem] shadow-xl">
                        <figure class="image-container">
                            <img src=${item.productPic} alt="${item.productTitle}"/>
                        </figure>
                        <div class="card-body bg-white text-black p-[1.5rem]">
                            <h2 class="card-title">${item.productTitle}</h2>
                            <p>${item.productDescription}</p>
                            <div class="card-actions justify-between mt-3 items-center">
                                <h1 class="text-lg font-semibold">Rs-${item.productPrice}</h1>
                                <button class="btn btn-sm bg-[#F000B8] text-white border-[#F000B8] btn-primary">See more</button>
                            </div>
                        </div>
                    </div>
        `
    })
}


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