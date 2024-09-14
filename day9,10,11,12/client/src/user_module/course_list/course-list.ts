import { viewCourse } from "../../models/courseModel";

let account = document.querySelector(".accountMenu") as HTMLDivElement;
let accountBtn = document.querySelector("#account") as HTMLButtonElement;
let LogOut = document.querySelector("#log-out") as HTMLButtonElement;
let checkBox = document.querySelector("nav input") as HTMLInputElement;
let main = document.querySelectorAll(
  "main, nav ul li a, body, #dialog > * , main ul li , main ul li, #dialog input[type=text], #account, #utils li button, .accountMenu li > *, .accountMenu"
);
let mainUl = document.querySelector("#view-course") as HTMLUListElement;

let content = "";
viewCourse().forEach((i) => {
  let description = i.description
  content = `<li>
              <h1>${i.title}</h1>
              <div>
                <p>${description}</p>
                <button id="know-more">Know more</button>
                <dialog id="dialog">
                  <button class="back">Back</button>
                  <p><b>Description :</b> ${description}</p>
                  <div>
                    <input type="text" placeholder="Enter your name" class="user-name">
                    <a><button class="start-quiz">Start Quiz</button></a>
                  </div>
                </dialog>
              </div> 
              </li>`;
  mainUl.innerHTML += content;
});


let knowMore = document.querySelectorAll("#know-more")
let back = document.querySelectorAll(".back")
let dialog = document.querySelectorAll("dialog")
let startQuiz = document.querySelectorAll(".start-quiz")
let userName = document.querySelectorAll(".user-name")

let accountFlag = true;
knowMore.forEach((el,i) => {
  el.addEventListener("click", () => {
    dialog[i].showModal();
    let inputVal = userName[i] as HTMLInputElement
    back[i].addEventListener("click", () => {
      dialog[i].close();
    });
    startQuiz[i].addEventListener("click" , () => {
      window.location.href = "../quiz-page/quiz-page.html"
      sessionStorage.setItem("currentQuiz" , i.toString())
      sessionStorage.setItem("currentUser" , inputVal.value)
    })
  });
})
accountBtn.addEventListener("click", () => {
  if (accountFlag) {
    account.style.display = "block";
    accountFlag = false;
  } else {
    account.style.display = "";
    accountFlag = true;
  }
});

LogOut.addEventListener("click", () => {
  window.location.replace("../../../index.html");
});

checkBox.addEventListener("click", () => {
  if (checkBox.checked) {
    main.forEach((i) => {
      i.classList.add("dark-mode");
    });
  } else {
    main.forEach((i) => {
      i.classList.remove("dark-mode");
    });
  }
});

window.addEventListener("load", () => {
  if (checkBox.checked) {
    main.forEach((i) => {
      i.classList.add("dark-mode");
    });
  } else {
    main.forEach((i) => {
      i.classList.remove("dark-mode");
    });
  }
});
