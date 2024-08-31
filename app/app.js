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
    adArr.map((item, index) => {
        // cardWrapper.innerHTML += `
        // <div id="card" class="card border-none bg-base-100 w-[18rem] shadow-xl">
        //     <figure class="image-container border-none">
        //         <img src=${item.productPic} alt="${item.productTitle}"/>
        //     </figure>
        //     <div class="card-body bg-white text-black p-[1.5rem]">
        //         <h2 class="card-title">${item.productTitle}</h2>
        //         <p>${item.productDescription}</p>
        //         <div class="card-actions justify-between mt-3 items-center">
        //             <h1 class="text-lg font-semibold">Rs ${item.productPrice}</h1>
        //             <button id="viewMoreBtn" class="btn btn-sm bg-[#F000B8] text-white border-[#F000B8] btn-primary">View</button>
        //         </div>
        //     </div>
        // </div>
        // `
        cardWrapper.innerHTML += `
        <div class="relative flex w-64 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
  <div class="relative mx-4 mt-4 h-[12rem] overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
    <img
      src=${item.productPic} alt="${item.productTitle}"
      class="h-full w-full object-cover"
    />
  </div>
  <div style="height:130px;" class="px-5 py-4">
    <div class="mb-2">
      <p class="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
      ${item.productTitle}
      </p>
      <p class="block font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
        Rs ${item.productPrice}
      </p>
    </div>
    <p style="display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;" class="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
    ${item.productDescription}
    </p>
  </div>
  <div class="p-6 pb-2 pt-0">
    <button id="viewMoreBtn"
      class="block pt-0 w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
    >
      See more
    </button>
  </div>
</div>
        `
    })
    const viewMoreBtn = document.querySelectorAll('#viewMoreBtn');
    viewMoreBtn.forEach((item, index) => {
        item.addEventListener('click', () => {
            sendAdToLocalStorage(index);
            window.location = "singlead.html";
        })
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





const viewMoreBtn = document.querySelector('#viewMoreBtn');



function sendAdToLocalStorage(index) {
    localStorage.setItem("singleAd", JSON.stringify(adArr[index]));
}