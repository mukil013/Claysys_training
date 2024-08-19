let profilePopUp = document.querySelector(".profilePopUp");
let profileBtn = document.querySelector(".profilePic");

let notificationPopUp = document.querySelector('.notificationPopUp')
let notification = document.querySelector('.notification')

let searchBar = document.querySelector('.searchBar input[type=text]')
let searchDropDown = document.querySelector('.dropdownItems')


profileBtn.addEventListener('focus', () => {
  profilePopUp.style.display = "block"
})
profileBtn.addEventListener('blur', () => {
  profilePopUp.style.display = "none"
})

notification.addEventListener('focus', () => {
    notificationPopUp.style.display = "block"
})
notification.addEventListener('blur', () => {
  notificationPopUp.style.display = "none"
})


searchBar.addEventListener('focus', ()=>{
  searchDropDown.style.display = 'block'
})
searchBar.addEventListener('blur', ()=>{
  searchDropDown.style.display = 'none'
})