let profilePopUp = document.querySelector(".profilePopUp");
let profileBtn = document.querySelector(".profilePic");

let notificationPopUp = document.querySelector(".notificationPopUp");
let notification = document.querySelector(".notification");

let searchBar = document.querySelector(".searchBar input[type=text]");
let searchDropDown = document.querySelector(".dropdownItems");

let bigTableExpand = document.querySelector("#expander");
let miniTable = document.querySelector(".order-table-parent");

let flag = 0,
  flag1 = 0,
  hamFlag = 0;

let hamMenu = document.querySelector("#ham");
let nav = document.querySelector("aside nav ul");

let pickUpBtn = document.querySelector("#pickUpBtn");
let pickUpPopUp = document.querySelector(".pickUpPopUp");

let content = document.querySelector(".content");

profileBtn.addEventListener("focus", () => {
  profilePopUp.style.display = "block";
});
profileBtn.addEventListener("blur", () => {
  profilePopUp.style.display = "none";
});

notification.addEventListener("focus", () => {
  notificationPopUp.style.display = "block";
});
notification.addEventListener("blur", () => {
  notificationPopUp.style.display = "none";
});

searchBar.addEventListener("focus", () => {
  searchDropDown.style.display = "block";
});
searchBar.addEventListener("blur", () => {
  searchDropDown.style.display = "none";
});

bigTableExpand.addEventListener("click", () => {
  if (flag === 0) {
    miniTable.style.display = "block";
    flag = 1;
  } else {
    miniTable.style.display = "none";
    flag = 0;
  }
});

pickUpBtn.addEventListener("click", () => {
  if (flag === 0) {
    pickUpPopUp.style.display = "block";
    flag = 1;
  } else {
    pickUpPopUp.style.display = "none";
    flag = 0;
  }
});

hamMenu.addEventListener("click", () => {
  if (hamFlag == 0) {
    nav.style.display = "block";
    hamFlag = 1;
  } else {
    nav.style.display = "none";
    hamFlag = 0;
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 837) {
    nav.style.display = "block";
  } else {
    nav.style.display = "none";
    hamFlag = 0;
  }
});
