import { addCourse, course, viewCourse } from "../../../models/courseModel";
import {
  courseAttempt,
  getUser,
  setUser,
  users,
} from "../../../models/userModel";

let timer = document.querySelector(".timer") as HTMLParagraphElement;
let time = 60;

setInterval(() => {
  timer.textContent = `${(time--).toString()}s`;
  if (time === 0)
    window.location.href = "/src/user_module/course_list/courseList.html";
  if (time <= 15) {
    timer.style.color = "red";
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
      if ((el as HTMLInputElement).checked){
        currentAnswer = indexVal;
        if (currentAnswer === contentItems.questions[i].correctAnswer-1) {
          score += contentItems.questions[i].markForTheQuestion;
        }
      }
    });

    // Check if this is the last question and update the score
    // const len = contentItems.questions.length;
    // if (currentAnswer === contentItems.questions[len - 1].correctAnswer) {
    //   score += contentItems.questions[len - 1].markForTheQuestion;
    // }

    // Assuming you have a submit button with id "submit-quiz"
    const submitBtn = document.querySelector(
      "#submit-quiz"
    ) as HTMLButtonElement;
    const userData: users[] = getUser();
    console.log(i);
    
    submitBtn.addEventListener("click", () => { 
      let indexOfLast = i+1
      let inputFeild = listEl[indexOfLast].querySelectorAll('input[type="radio"]');
      inputFeild.forEach((el, indexVal) => {
        if ((el as HTMLInputElement).checked){
          currentAnswer = indexVal;
          if (currentAnswer === contentItems.questions[indexOfLast].correctAnswer-1) {
            console.log(contentItems.questions[indexOfLast]);
            score += contentItems.questions[indexOfLast].markForTheQuestion;
          }
        }
      });

      console.log("Total score:", score);

      const indexOfUser = Number(sessionStorage.getItem("userIndex"));
      const userSubmit: users = userData[indexOfUser];

      // Explicitly cast userSubmit.courseAttempt to an array of courseAttempt


      let courseList:course[] = viewCourse()

      const tempCourseAttempt: courseAttempt = {
        userName: userData[indexOfUser].name,
        name: contentItems.title,
        mark: score,
      };

      // Check if the quiz attempt already exists for this user
      const existingAttempt = userSubmit.courseAttempt.find(
        (ele) => ele.name === tempCourseAttempt.name
      );

      console.log(score);
      

      if (!existingAttempt) {
        userSubmit.courseAttempt.push(tempCourseAttempt);
        courseList[currentQuiz].courseAttempt.push(tempCourseAttempt)
        addCourse(courseList)
        setUser(userData);
      }
      
      window.location.href = "/src/user_module/quiz-page/quiz-summary.html";
    });
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
