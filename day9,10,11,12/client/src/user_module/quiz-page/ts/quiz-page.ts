import { course, viewCourse } from "../../../models/courseModel";
import { courseAttempt, getUser, setUser, users } from "../../../models/userModel";

let timer = document.querySelector(".timer") as HTMLParagraphElement;
let time = 60;

setInterval(() => {
  timer.textContent = `${(time--).toString()}s`;
  if (time === 0) window.location.href = "/src/user_module/course_list/courseList.html";
  if(time <= 15){
    timer.style.color = "red"
  }
}, 1000);

let currentQuiz = Number(sessionStorage.getItem("currentQuiz"));

let allCourse: course[] = viewCourse();

let ul = document.querySelector("body ul") as HTMLUListElement;
let userName = document.querySelector("#user-name") as HTMLHeadingElement;
let courseTitle = document.querySelector("#course-title") as HTMLHeadingElement;

let content = "";
let contentItems = { ...allCourse[currentQuiz] };

userName.textContent = "Taking as : " + sessionStorage.getItem("currentUser");
courseTitle.textContent = "quiz : " + contentItems.title.toString();

for (let i = 0; i < contentItems.questions.length; i++) {
  let li = document.createElement("li");
  content = `<p>${contentItems.questions[i].question}</p>`;
  for (let j = 0; j < contentItems.questions[i].options.length; j++) {
    content += `<label><input type="radio" value="${j}" name="${i}"/>${contentItems.questions[i].options[j]}</label>`;
  }
  content += `<div><button class="prev">Prev</button><button class="next">Next</button></div>`;
  if (i === contentItems.questions.length - 1) {
    content += `<div><button type="button" id="submit-quiz">Submit</button></div>`;
  }
  li.innerHTML = content;
  li.className = "list-items";
  ul.appendChild(li);
}

let prev = document.querySelectorAll(".prev");
let next = document.querySelectorAll(".next");
let listEl = document.querySelectorAll("body ul li");
let elePrev: HTMLLIElement;
let eleBack: HTMLLIElement;
let score: number = 0;

prev.forEach((el, i) => {
  if (i === 0) {
    ((el as HTMLButtonElement).style.opacity = ".2"),
      ((el as HTMLButtonElement).style.cursor = "not-allowed"),
      ((el as HTMLButtonElement).style.pointerEvents = "none");
    return;
  }
  (el as HTMLButtonElement).addEventListener("click", () => {
    elePrev = listEl[i - 1] as HTMLLIElement;
    listEl.forEach((i) => {
      let ele = i as HTMLLIElement;
      ele.style.visibility = "hidden";
    });
    elePrev.style.visibility = "visible";
  });
});

let currentAnswer: number = 0;

next.forEach((el, i) => {
  if (i === Number(next.length) - 1) {
    ((el as HTMLButtonElement).style.opacity = ".2"),
      ((el as HTMLButtonElement).style.cursor = "not-allowed"),
      ((el as HTMLButtonElement).style.pointerEvents = "none");
    return;
  }

  (el as HTMLButtonElement).addEventListener("click", () => {
    (listEl[0] as HTMLLIElement).style.visibility = "hidden";
    listEl.forEach((i) => {
      let ele = i as HTMLLIElement;
      ele.style.visibility = "hidden";
    });

    eleBack = listEl[i + 1] as HTMLLIElement;
    eleBack.style.visibility = "visible";

    let inputs = listEl[i].querySelectorAll('input[type="radio"]');

    inputs.forEach((el, indexVal) => {
      if ((el as HTMLInputElement).checked) currentAnswer = indexVal + 1;
      return
    });
    if (currentAnswer === contentItems.questions[i].correctAnswer){
      score += contentItems.questions[i].markForTheQuestion;
    }
    let submitBtn = document.querySelector("#submit-quiz") as HTMLButtonElement;
    let userData:users[] = getUser()

    submitBtn.addEventListener(
      "click",
      () => {
        inputs.forEach( (el, i) => {
          if((el as HTMLInputElement).checked) currentAnswer = i+1
        })
        if(currentAnswer === contentItems.questions[i].correctAnswer) score += contentItems.questions[i].markForTheQuestion
        let indexOfUser = Number(sessionStorage.getItem("userIndex"))

        let userSumbit:users = userData[indexOfUser]
        let userNameVal =  sessionStorage.getItem("currentUser") || ""

        let tempCourseAttempt:courseAttempt = {
          user: userNameVal,
          name: contentItems.title,
          mark: score
        }

        let courseIndex:number = userSumbit.courseAttempt.length
        userSumbit.courseAttempt[courseIndex] = tempCourseAttempt

        setUser(userData)
        console.log(getUser());
        console.log(userSumbit);
        
        window.location.href = "/src/user_module/course_list/courseList.html";
      }
    );
  });
});

let main = document.querySelectorAll("body, ul li");
let darkMode = localStorage.getItem("dark-mode");

if (darkMode === "true") {
  main.forEach((i) => {
    i.classList.add("dark-mode");
  });
} else {
  main.forEach((i) => {
    i.classList.remove("dark-mode");
  });
}
