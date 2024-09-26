import { getUser, users } from "../../models/userModel";

let form = document.querySelector("form") as HTMLFormElement;

let adminEmail = "admin@123.com", adminPassword = "admin@123";

let email = document.querySelector("#email") as HTMLInputElement;

email.addEventListener("focus" , () => {
  (document.querySelector("#error") as HTMLParagraphElement).style.visibility = "hidden"
})

let userData: users[] = getUser();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.querySelector("#email") as HTMLInputElement;
  let password = document.querySelector("#p1") as HTMLInputElement;
  if (email.value != "" || password.value != "") {
    if (email.value === adminEmail && password.value === adminPassword) {
      window.location.replace("/src/admin_module/adminPanel/adminPanel.html");
    }
    else{
      userData.forEach((el,i) => {
        if (el.password === password.value && el.email === email.value) {
          window.location.replace("../user_module/course_list/courseList.html");
          sessionStorage.setItem("userIndex" , i.toString());
          (document.querySelector("#error") as HTMLParagraphElement).style.visibility = "hidden"
          form.reset();
          return
        }else{
          (document.querySelector("#error") as HTMLParagraphElement).style.visibility = "visible"
        }
      });
    }
  } else {
    alert("fill all feilds");
  }
});
