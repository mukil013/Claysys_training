import { users , getUser, setUser } from "../../models/userModel"

let form = document.querySelector("form") as HTMLFormElement

form.addEventListener("submit" , (e) => {
  e.preventDefault()
  let emailVal = document.querySelector("#email") as HTMLInputElement
  let nameVal =(document.querySelector("#name") as HTMLInputElement)
  let passwordVal = (document.querySelector("#p1") as HTMLInputElement)
  let retypePassword = document.querySelector("#p2") as HTMLInputElement

  let user: users = {
    name: nameVal.value,
    email : emailVal.value,
    password : passwordVal.value,
    courseAttempt: []
  }

  emailVal.addEventListener('invalid', (event) => {
    console.log((event.target as HTMLInputElement).validity.valueMissing);
    
    if ((event.target as HTMLInputElement).validity.valueMissing) {
      (event.target as HTMLInputElement).setCustomValidity('Email is mandatory for the account.');
    }
  })
  
  emailVal.addEventListener('change', function (event) {
    (event.target as HTMLInputElement).setCustomValidity('');
  })

  let userData:users[] = getUser();

  userData.push(user);

  if(passwordVal.value === retypePassword.value){
    setUser(userData)
    window.location.href = "../auth/login.html"
  }else{
    alert("mismatch password")
  }

  console.log(getUser())
  form.reset()
})