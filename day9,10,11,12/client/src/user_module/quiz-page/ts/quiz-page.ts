import {
  addCourse,
  course,
  viewCourse,
} from "../../../models/courseModel";

import { courseAttempt, getUser, users, breif } from "../../../models/userModel";

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

let ul = document.querySelector("body ul") as HTMLUListElement;
let userName = document.querySelector("#user-name") as HTMLHeadingElement;
let courseTitle = document.querySelector("#course-title") as HTMLHeadingElement;

let content = "";
let contentItems = { ...viewCourse()[currentQuiz] };

userName.textContent = "Taking as : " + sessionStorage.getItem("currentUser");
courseTitle.textContent = "quiz : " + contentItems.title.toString();

function getRandomPermutation(arr: number[]): number[] {
  let result = arr;
  for (let i = result.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    [result[i], result[randomIndex]] = [result[randomIndex], result[i]];
  }
  return result;
}

let nums = [0, 1, 2, 3];
let randomOption = getRandomPermutation(nums);
let arrQuestions = [];
for (let i = 0; i < contentItems.questions.length; i++) {
  arrQuestions.push(i);
}
let randomQuestion = getRandomPermutation(arrQuestions);

for (let i = 0; i < contentItems.questions.length; i++) {
  let ques = randomQuestion[i];
  let li = document.createElement("li");
  content = `<p>${contentItems.questions[ques].question}</p>`;

  if (contentItems.questions[ques].questionType === "mcq") {
    for (let k = 0; k < contentItems.questions[ques].options.length; k++) {
      let opt = randomOption[k];
      content += `<label><input type="radio" value="${opt}" name="${i}"/>${contentItems.questions[ques].options[opt]}</label>`;
    }
  } else if (contentItems.questions[ques].questionType === "true-false") {
    content += `<label><input type="radio" name="bool" value="true"> True</label><label><input type="radio" name="bool" value="False"> False</label>`;
  } else {
    content +=
      '<textarea rows="3" class="breif-answer" placeholder="Enter your answer"></textarea>';
  }
  content += `<div><button class="prev">Prev</button><button class="next">Next</button></div>`;
  content += `<span><div><input type="checkbox">Mark for later</div>
              <button class="clear-choice" title="clear selection"><i class="fa-solid fa-trash"></i></button></span>`;

  li.innerHTML = content;
  li.setAttribute("question-number", ques.toString());
  li.className = "list-items";
  ul.appendChild(li);
}

let prev = document.querySelectorAll(".prev");
let next = document.querySelectorAll(".next");
let listEl = document.querySelectorAll("body ul li");
let elePrev: HTMLLIElement;
let score: number = 0;

let confirmPopUp = document.querySelector("#confirm") as HTMLDialogElement;
let confirmPopUpList = document.querySelector(
  "#confirm ul"
) as HTMLUListElement;
let arr: number[] = new Array(listEl.length);
let arr1: number[] = new Array(listEl.length);

document.querySelectorAll(".clear-choice").forEach((el, i) => {
  (el as HTMLButtonElement).addEventListener("click", () => {
    let inputs = listEl[i].querySelectorAll('input[type="radio"]');
    (document.querySelector("textarea") as HTMLTextAreaElement).value = "";
    inputs.forEach((ele) => {
      (ele as HTMLInputElement).checked = false;
      arr[i] = 0;
    });
  });
});

let attempted: boolean[] = [];

for (let x = 0; x < listEl.length; x++) {
  attempted[x] = false;
  arr[x] = 0;
  arr1[x] = 0;
}
let remaining = 0;
let bar = document.querySelector(".bar") as HTMLDivElement;

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

let courseList: course[] = viewCourse();

let bool = true 

let tempCourseAttempt: courseAttempt = {
  validated: bool,
  userName: "",
  email: "",
  name: "",
  mark: 0,
};

next.forEach((el, i) => {
  let currentAnswer: number = 0;

  (el as HTMLButtonElement).addEventListener("click", () => {
    remaining = 100 / (listEl.length - (i + 1));
    bar.style.width = `${remaining}%`;
    if (
      (listEl[i].querySelector('input[type="checkbox"]') as HTMLInputElement)
        .checked
    ) {
      arr1[i] = 1;
    } else {
      arr1[i] = 0;
    }

    let inputs = listEl[i].querySelectorAll('input[type="radio"]');

    let ques = Number(listEl[i].getAttribute("question-number"));

    const userData: users[] = getUser();
    const indexOfUser = Number(sessionStorage.getItem("userIndex"));

    if (viewCourse()[currentQuiz].questions[ques].questionType === "written") {
      let textareaInput = listEl[i].querySelector(
        "textarea"
      ) as HTMLTextAreaElement;

      bool = false

      let breif: breif = {
        qno: ques + 1,
        question: courseList[currentQuiz].questions[ques].question,
        answer: textareaInput.value,
      };

      tempCourseAttempt.breif = breif
      tempCourseAttempt.validated = bool

      if (textareaInput.value != "") {
        arr[i] = 1;
      } else {
        arr[i] = 0;
      }
    } else if (
      viewCourse()[currentQuiz].questions[ques].questionType === "true-false"
    ) {
      tempCourseAttempt.validated = bool
      inputs.forEach((elInp,index) => {
        let inputEl = elInp as HTMLInputElement;
        currentAnswer = Number(index);
        if (inputEl.checked) {
          arr[i] = 1;
          let ans = Number(contentItems.questions[ques].correctAnswer);
          
          if (ans === 0) {
            if(ans === currentAnswer-1){
              score += contentItems.questions[ques].markForTheQuestion;
              console.log(score);
            }
          }else if(ans === 1){
            if(ans === currentAnswer+1){
              score += contentItems.questions[ques].markForTheQuestion;
              console.log(score);
            }
          }
        }
      });
    } else {
      inputs.forEach((elInp) => {
        let inputEl = elInp as HTMLInputElement;
        currentAnswer = Number(inputEl.value);
        if (inputEl.checked) {
          arr[i] = 1;
          if (
            currentAnswer ===
            contentItems.questions[ques].correctAnswer - 1
          ) {
            score += contentItems.questions[ques].markForTheQuestion;
            console.log(score);
          }
        }
      });
    }

    (listEl[0] as HTMLLIElement).style.visibility = "hidden";
    listEl.forEach((i) => {
      let ele = i as HTMLLIElement;
      ele.style.visibility = "hidden";
    });

    if (i < listEl.length - 1)
      (listEl[i + 1] as HTMLLIElement).style.visibility = "visible";

    if (i === listEl.length - 1) {
      el.textContent = "Finish";
  
      tempCourseAttempt.userName = userData[indexOfUser].name;
      tempCourseAttempt.email = userData[indexOfUser].email;
      tempCourseAttempt.name = contentItems.title;
      tempCourseAttempt.mark = score;

      contentItems.courseAttempt.push(tempCourseAttempt);
      courseList[currentQuiz] = contentItems;
      confirmPopUp.showModal();
      confirmPopUpList.innerHTML = "";

      for (let l = 0; l < listEl.length; l++) {
        let li = document.createElement("li");

        li.innerHTML = `<button class="navigator-li">${(
          l + 1
        ).toString()}</button>`;
        if (arr[l] === 1 && arr1[l] === 0) {
          li.classList.add("check");
          li.title = "Completed";
        } else if (arr1[l] === 1 && (arr[l] === 1 || arr[l] === 0)) {
          li.classList.add("later");
          li.title = "Visit later";
        } else if (arr[l] === 0 && arr1[l] === 0) {
          li.title = "Incomplete";
        }
        confirmPopUpList.appendChild(li);
      }
      (document.querySelector("#back") as HTMLButtonElement).addEventListener(
        "click",
        () => {
          confirmPopUp.close();
          (listEl[i] as HTMLLIElement).style.visibility = "visible";
        }
      );

      (document.querySelector("#submit-quiz") as HTMLButtonElement).addEventListener(
        "click",
        () => {

          let existingAttempt = viewCourse()[currentQuiz].courseAttempt.find(
            (ele) => ele.userName === tempCourseAttempt.userName
          );
          
          if (!existingAttempt) {
            addCourse(courseList);
            console.log(viewCourse());
          }
          window.location.href = "/src/user_module/course_list/courseList.html";

        }
      );
    }
  });
});

document.querySelectorAll(".navigator-li").forEach((el, index) => {
  (el as HTMLButtonElement).addEventListener("click", () => {
    confirmPopUp.close();
    (listEl[index] as HTMLLIElement).style.visibility = "visible";
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
