import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth, db } from "../config.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const logoutBtn = document.querySelector("#logoutBtn");
const inputSearch = document.querySelector(".input-search");
const loginBtn = document.querySelector("#loginBtn");
const pfp = document.querySelector("#pfp");
let userDataArr = [];
let adArr = [];
const cardWrapper = document.querySelector('.card-wrapper');
inputSearch.addEventListener('input', () => {
  const searchValue = inputSearch.value.toLowerCase();
  const filteredArr = adArr.filter(item => {
    return item.productTitle.toLowerCase().includes(searchValue) || 
           item.productDescription.toLowerCase().includes(searchValue);
  });
  console.log(filteredArr);
  renderFilteredData(filteredArr);
});

async function getData() {
  cardWrapper.innerHTML = `
  <div class="flex items-center justify-center gap-x-12">
      <h1 class="text-xl font-semibold mb-[0.8rem] text-black">Loading Ads</h1>
      <div class="h-[10rem] flex justify-center items-center">
<div class="loader">
  <div class="box box-1">
    <div class="side-left"></div>
    <div class="side-right"></div>
    <div class="side-top"></div>
  </div>
  <div class="box box-2">
    <div class="side-left"></div>
    <div class="side-right"></div>
    <div class="side-top"></div>
  </div>
  <div class="box box-3">
    <div class="side-left"></div>
    <div class="side-right"></div>
    <div class="side-top"></div>
  </div>
  <div class="box box-4">
    <div class="side-left"></div>
    <div class="side-right"></div>
    <div class="side-top"></div>
  </div>
</div>
                    </div>
                    </div>
      `
    const querySnapshot = await getDocs(collection(db, "ad"));
    querySnapshot.forEach((doc) => {
        adArr.push(doc.data());
    });
    renderData();
}
getData();


function renderData() {
    cardWrapper.innerHTML = "";
    if (adArr.length > 0) {
      adArr.map((item, index) => {
          cardWrapper.innerHTML += `
          <div id="viewMoreBtn" class="relative cursor-pointer flex w-64 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
    <div class="relative mx-4 mt-4 h-[12rem] overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
      <img
        src=${item.productPic} alt="${item.productTitle}"
        class="h-full w-full object-cover"
      />
    </div>
    <div style="height:130px;" class="px-5 cursor-auto py-4">
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
      <button
        class="block pt-0 w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        See more
      </button>
    </div>
  </div>`})
    }else{
      cardWrapper.innerHTML = `
      <div class="h-[10rem] flex justify-center items-center">
                        <h1 class="text-xl font-semibold text-black mb-[1.4rem]">No ads found...</h1>
                    </div>
      `
    }
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


function renderFilteredData(filteredArr) {
  cardWrapper.innerHTML = "";

  if (filteredArr.length > 0) {
    filteredArr.map((item, index) => {
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
          <button id="viewMoreBtn-${index}"
            class="block pt-0 w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            See more
          </button>
        </div>
      </div>`;
    });
    filteredArr.forEach((item, index) => {
      const viewMoreBtn = document.querySelector(`#viewMoreBtn-${index}`);
      viewMoreBtn.addEventListener('click', () => {
        sendSearchedAdToLocalStorage(index);
        window.location = "singlead.html";
      });
    });
  } else {
    cardWrapper.innerHTML = `
    <div class="h-[10rem] flex justify-center items-center">
      <h1 class="text-xl font-semibold text-black mb-[1.4rem]">No ads found...</h1>
    </div>`;
  }
}

// Function to Send Data to Local Storage
function sendSearchedAdToLocalStorage(index) {
  localStorage.setItem("singleAd", JSON.stringify(filteredArr[index]));
}
