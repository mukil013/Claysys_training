import { addCourse, course, viewCourse } from "../../../models/courseModel";
import {
  courseAttempt,
  getUser,
  setUser,
  users,
} from "../../../models/userModel";

let timer = document.querySelector(".timer") as HTMLParagraphElement;
let time = 600;

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



let i = 0
for (let j = 0; j < contentItems.questions.length; j++) {
  let li = document.createElement("li");
  i = (contentItems.questions.length - 1) - j
  content = `<p>${contentItems.questions[i].question}</p>`;
  for (let k = 0; k < contentItems.questions[i].options.length; k++) {
    content += `<label><input type="radio" value="${k}" name="${i}"/>${contentItems.questions[i].options[k]}</label>`;
  }
  content += `<div><button class="prev">Prev</button><button class="next">Next</button></div>`;
  if (j === contentItems.questions.length - 1) {
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

next.forEach((el, i) => {
  let currentAnswer: number = 0;

  if (i === next.length - 1) {
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
      currentAnswer = indexVal;
      if ((el as HTMLInputElement).checked && i < contentItems.questions.length-1) {
        if (currentAnswer === contentItems.questions[i].correctAnswer - 1) {
          score += contentItems.questions[i].markForTheQuestion;
          
        }
      }
    });
  });
  const submitBtn = document.querySelector(
    "#submit-quiz"
  ) as HTMLButtonElement;

  submitBtn.addEventListener("click", () => {
    let inputFeild = listEl[i+1].querySelectorAll(
      'input[type="radio"]'
    );
    console.log("working");
    
    
    inputFeild.forEach((el, indexVal) => {
      currentAnswer = indexVal;
      if ((el as HTMLInputElement).checked && indexVal < contentItems.questions.length-1) {
        
        if (
          currentAnswer ==
          contentItems.questions[i+1].correctAnswer-1
        ) {
          score += contentItems.questions[i+1].markForTheQuestion;
          console.log(score);
          return
        }
      }
    });

    const userData: users[] = getUser();
    const indexOfUser = Number(sessionStorage.getItem("userIndex"));
    const userSubmit: users = userData[indexOfUser];

    let courseList: course[] = viewCourse();

    const tempCourseAttempt: courseAttempt = {
      userName: userData[indexOfUser].name,
      name: contentItems.title,
      mark: score,
    };

    const existingAttempt = userSubmit.courseAttempt.find(
      (ele) => ele.name === tempCourseAttempt.name
    );

    if (!existingAttempt) {
      userSubmit.courseAttempt.push(tempCourseAttempt);
      courseList[currentQuiz].courseAttempt.push(tempCourseAttempt);
      addCourse(courseList);
      setUser(userData);
    }

    window.location.href = "/src/user_module/quiz-page/quiz-summary.html";
    return 
  });
});

let main = document.querySelectorAll("body, ul li");
let darkMode = sessionStorage.getItem("dark-mode");

if (darkMode === "true") {
  main.forEach((i) => {
    i.classList.add("dark-mode");
  });
} else {
  main.forEach((i) => {
    i.classList.remove("dark-mode");
  });
}
