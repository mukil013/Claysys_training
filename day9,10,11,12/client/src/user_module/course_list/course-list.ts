import { viewCourse } from "../../models/courseModel"

let dialog = document.querySelector("#dialog") as HTMLDialogElement
let account = document.querySelector(".accountMenu") as HTMLDivElement
let accountBtn = document.querySelector("#account") as HTMLButtonElement
let knowMore = document.querySelector("#know-more") as HTMLButtonElement
let back = document.querySelector("#back") as HTMLButtonElement
let LogOut = document.querySelector("#log-out") as HTMLButtonElement
let checkBox = document.querySelector("nav input") as HTMLInputElement
let main = document.querySelectorAll("main , aside, aside button , nav ul li a, body, #dialog, main ul li > *, main ul li, #dialog input[type=text], #account, #utils li button, .accountMenu li > *, .accountMenu")
let courseTopics = document.querySelector("main ol") as HTMLOListElement

function dialogOpen(){
  dialog.showModal()
}

function dialogClose(){
  dialog.close()
}

let accountFlag = true

knowMore.addEventListener('click' , dialogOpen)
back.addEventListener('click', dialogClose)
accountBtn.addEventListener('click' , ()=>{
  if(accountFlag){
    account.style.display = "block"
    accountFlag = false
  }else{
    account.style.display = ""
    accountFlag = true
  }
})

LogOut.addEventListener('click', () => {
  window.location.replace("../../../index.html")
})

checkBox.addEventListener('click' , () => {
  if(checkBox.checked){
    main.forEach(i => {
      i.classList.add("dark-mode")
    })
  }else{
    main.forEach(i => {
      i.classList.remove("dark-mode")
    })
  }
})

window.addEventListener('load',()=> {
  if(checkBox.checked){
    main.forEach(i => {
      i.classList.add("dark-mode")
    })
  }else{
    main.forEach(i => {
      i.classList.remove("dark-mode")
    })
  }
  let content = ""
  viewCourse().forEach( i => {
    content = `<li><p>${i.title}</p></li>`
    courseTopics.innerHTML += content
  })
})
