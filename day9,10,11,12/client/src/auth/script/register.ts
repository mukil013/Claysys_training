import { users , getUser, setUser } from "../../models/userModel"

let form = document.querySelector("form") as HTMLFormElement

form.addEventListener("submit" , (e) => {
  e.preventDefault()
  let emailVal =(document.querySelector("#email") as HTMLInputElement).value
  let nameVal =(document.querySelector("#name") as HTMLInputElement).value
  let passwordVal = (document.querySelector("#p1") as HTMLInputElement).value
  let retypePassword = document.querySelector("#p2") as HTMLInputElement

  let user: users = {
    name: nameVal,
    email : emailVal,
    password : passwordVal,
    courseAttempt: []
  }

  let userData:users[] = getUser();

  userData.push(user);

  if(passwordVal === retypePassword.value){
    setUser(userData)
    window.location.href = "../auth/login.html"
  }else{
    alert("mismatch password")
  }

  console.log(getUser())
  form.reset()
})