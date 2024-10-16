import { viewCourse } from "../../models/courseModel";
import { getUser, users } from "../../models/userModel";

let account = document.querySelector(".accountMenu") as HTMLDivElement;
let accountBtn = document.querySelector("#account") as HTMLButtonElement;
let LogOut = document.querySelector("#log-out") as HTMLButtonElement;
let checkBox = document.querySelector("nav input") as HTMLInputElement;
let main = document.querySelectorAll(
  "main, nav ul li a, body, main ul li, main ul li div button, #account, #utils li button, .accountMenu li > *, .accountMenu"
);
let mainUl = document.querySelector("#view-course") as HTMLUListElement;
let historyUl = document.querySelector("#course-history") as HTMLUListElement;

let user: users[] = getUser();
let userIndex: number = Number(sessionStorage.getItem("userIndex"));
let currentUserName: string = user[userIndex].name;
(document.querySelector("#user-name") as HTMLLIElement).textContent =
  currentUserName;

viewCourse().forEach((i, index) => {
  let attempt = true;
  i.courseAttempt.forEach(el => {
    if(user[userIndex].email === el.email){
      attempt = false
      return
    }
  })
  let content = "";
  if (attempt) {
    let description = i.description;
    content = `<li index="${index}">
              <h1>${i.title.toUpperCase()}</h1>
              <div>
                <p>${description}</p>
                <button class="know-more">Know more</button>
                <dialog id="dialog">
                  <button class="back">Back</button>
                  <p><b>Description :</b> ${description}</p>
                  <div>
                    <input type="text" placeholder="Enter your name" class="user-name" required>
                    <button class="start-quiz">Start Quiz</button>
                  </div>
                </dialog>
              </div> 
              </li>`;
    mainUl.innerHTML += content;
    return;
  } else {
    let description = i.description;
    content = `<li index="${index}">
              <h1>${i.title.toUpperCase()}</h1>
              <div>
                <p>${description}</p>
                <button class="quiz-leader">Leader board</button>
                <button class="quick-quiz">Quick start</button>
              </div> 
              </li>`;
    historyUl.innerHTML += content;
    return;
  }
});

(document.querySelectorAll(".quiz-leader")).forEach((el,i) => {
  (el as HTMLButtonElement).addEventListener('click' , () => {
    let history = historyUl.querySelectorAll("li")[i] as HTMLLIElement
    let historyAttr = Number(history.getAttribute("index"))
    let tempUser = 0

    viewCourse()[historyAttr].courseAttempt.forEach( (index, i) =>{
      if(index.name === getUser()[userIndex].name && index.email === getUser()[userIndex].email){
        tempUser = i
        sessionStorage.setItem("tempUser",tempUser.toString())
        return
      }
    })

    viewCourse()[historyAttr].courseAttempt.forEach( index => {
      if(index.validated){
        window.location.href = "/src/user_module/quiz-page/quiz-summary.html"
        return
      }else{
        alert("Please wait for the results...")
        return
      }
    })
  })
})

let knowMore = document.querySelectorAll(".know-more");
let back = document.querySelectorAll(".back");
let dialog = document.querySelectorAll("dialog");
let userName = document.querySelectorAll(".user-name");
let newli = mainUl.querySelectorAll("li");
let oldli = historyUl.querySelectorAll("li");
let startQuiz = document.querySelectorAll(".start-quiz");
let quickStart = document.querySelectorAll(".quick-quiz");

quickStart.forEach((el, i) => {
  el.addEventListener("click", () => {
    const val = Number(oldli[i].getAttribute("index"));
    const userName = getUser();
    if (userName && userName[userIndex]) {
      const name = userName[userIndex].name;
      window.location.href = "../quiz-page/quiz-page.html";
      sessionStorage.setItem("currentQuiz", val.toString());
      sessionStorage.setItem("currentUser", name);
    } else {
      console.error("User data or index out of bounds.");
    }
  });
});


let accountFlag = true;
knowMore.forEach((el, i) => {
  el.addEventListener("click", () => {
    dialog[i].showModal();
    if (checkBox.checked) {
      dialog[i].classList.add("dark-mode");
    } else {
      dialog[i].classList.remove("dark-mode");
    }

    back[i].addEventListener("click", () => {
      dialog[i].close();
    });

    let val = Number(newli[i].getAttribute("index"));
    let inputVal = userName[i] as HTMLInputElement;

    startQuiz[i].addEventListener("click", () => {
      let userNameVal = (userName[i] as HTMLInputElement).value;
      if (userNameVal != "" && userNameVal === currentUserName) {
        window.location.href = "../quiz-page/quiz-page.html";
        sessionStorage.setItem("currentQuiz", val.toString());
        sessionStorage.setItem("currentUser", inputVal.value);
      } else {
        alert("Enter your name correctly to start quiz");
      }
    });
  });
});
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
    sessionStorage.setItem("dark-mode", "true");
  } else {
    main.forEach((i) => {
      i.classList.remove("dark-mode");
    });
    sessionStorage.setItem("dark-mode", "false");
  }
});

window.addEventListener("load", () => {
  if (sessionStorage.getItem("dark-mode")) {
    main.forEach((i) => {
      i.classList.add("dark-mode");
    });
    checkBox.checked = true;
  } else {
    main.forEach((i) => {
      i.classList.remove("dark-mode");
    });
  }
});

let homeBtn = document.querySelector("#home") as HTMLButtonElement;
let historyBtn = document.querySelector("#history") as HTMLButtonElement;

homeBtn.style.color = "royalblue";
homeBtn.style.borderBottom = "1px solid royalblue"

homeBtn.addEventListener("click", () => {
  homeBtn.style.color = "royalblue";
  historyBtn.style.color = "";
  historyUl.style.display = "none";
  mainUl.style.display = "flex";
  homeBtn.style.borderBottom = "1px solid royalblue"
  historyBtn.style.borderBottom = "none"
});

historyBtn.addEventListener("click", () => {
  historyBtn.style.color = "royalblue";
  homeBtn.style.color = "";
  historyUl.style.display = "flex";
  mainUl.style.display = "none";
  homeBtn.style.borderBottom = "none"
  historyBtn.style.borderBottom = "1px solid royalblue"
});
