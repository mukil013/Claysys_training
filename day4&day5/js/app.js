//All the html tag defined here basically for pop-up

let profilePopUp = document.querySelector(".profilePopUp");
let profileBtn = document.querySelector(".profilePic");

let notificationPopUp = document.querySelector(".notificationPopUp");
let notification = document.querySelector(".notification");

let searchBar = document.querySelector(".searchBar input[type=text]");
let searchDropDown = document.querySelector(".dropdownItems");

let bigTableExpand = document.querySelector("#expander");
let miniTable = document.querySelector(".order-table-parent");

let hamMenu = document.querySelector("#ham");
let nav = document.querySelector("aside nav ul");

let pickUpBtn = document.querySelector("#pickUpBtn");
let pickUpPopUp = document.querySelector(".pickUpPopUp");

let content = document.querySelector(".content");

//local variag
let flag = 0,
  hamFlag = 0;

//focus and blur event for profile, notification and search bar

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

//click events for table, pickup, and ham-menu

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

//This is added to fix a bug for notification on resizing

window.addEventListener("resize", () => {
  if (window.innerWidth > 857) {
    nav.style.display = "block";
  } else {
    nav.style.display = "none";
    hamFlag = 0;
  }
});
