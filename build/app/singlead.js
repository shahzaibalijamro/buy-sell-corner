import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth, db } from "../config.js";
import { collection, query, where, getDocs, doc, setDoc, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
let sindgleAdArr = JSON.parse(localStorage.getItem('singleAd'));
console.log(sindgleAdArr);
const div = document.querySelector("#div");
const pfp = document.querySelector("#pfp");
let userDataArr = [];


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const q = query(collection(db, "user"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            userDataArr.push(doc.data());
        });
        pfp.src = userDataArr[0].pfp;
    } else {

    }
});


function renderAd() {
    div.innerHTML = `
    <div class="flex justify-center">
                <div class="group">
                    <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
                        <g>
                            <path
                                d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                            </path>
                        </g>
                    </svg>
                    <input placeholder="Search" type="search" class="input-search">
                </div>
            </div>
            <div class="my-[2rem]">
                <h1 class="text-[1.6rem] font-bold">${sindgleAdArr.productTitle}</h1>
            </div>
            <div class="flex rounded-2xl ad-data border-[1px] border-[#A1A1A1]">
                <div style="border-bottom-left-radius: 16px;border-top-left-radius: 16px;background-color: white;" class="max-w-64 flex items-center image-wrapper">
                    <img class="w-[100%] ad-image h-auto object-cover"
                        src="${sindgleAdArr.productPic}"
                        alt="${sindgleAdArr.productTitle}">
                </div>
                <div class="w-[100%] pad-1-rem p-5">
                    <div class="flex justify-between items-center">
                        <h1 class="text-[1.6rem] font-bold">Rs ${sindgleAdArr.productPrice}</h1>
                        <i class="fa-regular fa-heart"></i>
                    </div>
                    <div class="mt-5">
                        <p class="text-[1rem] font-semibold">${sindgleAdArr.productTitle}</p>
                        <p class="text-[0.9rem] mt-3 font-normal">${sindgleAdArr.productDescription}</p>
                    </div>
                    <div class="bg-[#ff9d40] rounded-xl pad-1-rem items-center gap-4 flex mt-5 p-5">
                        <div class="avatar">
                            <div class="w-20 avatar-in rounded-full">
                                <img src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg" />
                            </div>
                        </div>
                        <div class="w-full text-black">
                            <div class="flex items-center flex-wrap gap-2.5 justify-between">
                                <div>
                                    <h1 class="font-semibold">${sindgleAdArr.sellerName}</h1>
                                    <p class="font-normal">Buy Sell Corner member</p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <h1>See Profile</h1>
                                    <i style="font-size: 12px;" class="fa-solid mt-[0.1rem] fa-chevron-right"></i>
                                </div>
                            </div>
                            <!-- add max width 28rem below -->
                            <div class="flex flex-wrap gap-2.5 max-w-[28rem] gap-2 mt-4">
                                <button class="btn min-w-28 border-0 flex-1 text-white bg-[#2A2E37]"><i class="fa-solid fa-phone"></i> Call Now</button>
                                <button class="btn btn-chat min-w-28 border-0 flex-1 text-black bg-[#D9D9D9]"><i class="fa-regular fa-comment"></i> Chat</button>
                            </div>
                        </div>                        
                    </div>
                    <div class="flex wrap-at-428 mt-5 items-center justify-between">
                        <div class="max-w-80 w-full">
                            <button class="btn bg-[#ff9d40] border-0 w-full text-white btn-wide">Buy</button>
                        </div>
                        <div class="flex me-1 area-wrapper text-center items-center justify-end max-w-80 w-full gap-2">
                            <i class="fa-solid fa-location-dot"></i>
                            <p>${sindgleAdArr.sellerAddress}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rounded-2xl mt-[3rem] pad-1-rem p-5 border-[1px] border-[#A1A1A1]">
                <p class="text-[1.5rem] font-bold">Details</p>
                <div class="flex py-3 flex-wrap gap-y-[0.75rem] gap-x-[2.5rem]">
                    <div class="flex items-center gap-4">
                        <p class="font-normal text-[20px]">Is Deliverable</p>
                        <p class="font-bold text-[20px]">NO</p>
                    </div>
                    <div class="flex items-center gap-4">
                        <p class="font-normal text-[20px]">Brand</p>
                        <p class="font-bold text-[20px]">Not described</p>
                    </div><div class="flex items-center gap-4">
                        <p class="font-normal text-[20px]">Price</p>
                        <p class="font-bold text-[20px]">Rs ${sindgleAdArr.productPrice}</p>
                    </div><div class="flex items-center gap-4">
                        <p class="font-normal text-[20px]">Condition</p>
                        <p class="font-bold text-[20px]">Used</p>
                    </div>
                </div>
            </div>
            <div class="rounded-2xl mt-[2rem] pad-1-rem p-5 border-[1px] border-[#A1A1A1]">
                <p class="text-[1.5rem] font-bold">Description</p>
                <p class="font-normal mt-3 text-[20px]">${sindgleAdArr.productDescription}</p>
            </div>
    `
}
renderAd();