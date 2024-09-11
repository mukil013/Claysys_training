import { getUser, users } from "../../models/userModel";

let form = document.querySelector("form") as HTMLFormElement;

let adminEmail = "admin@123.com", adminPassword = "admin@123";

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
      userData.forEach((i) => {
        if (i.password === password.value) {
          window.location.replace("../user_module/course_list/courseList.html");
          console.log("working");
          return;
        }
      });
      form.reset();
    }
  } else {
    alert("fill all feilds");
  }
});
