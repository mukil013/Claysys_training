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
  for (let k = 0; k < contentItems.questions[ques].options.length; k++) {
    let opt = randomOption[k];
    content += `<label><input type="radio" value="${opt}" name="${opt}"/>${contentItems.questions[ques].options[opt]}</label>`;
  }
  content += `<div><button class="prev">Prev</button><button class="next">Next</button></div>`;
  content += `<span><input type="checkbox">Mark for later
              <button class="clear-choice">Clear choice</button></span>`
  li.innerHTML = content;
  li.className = "list-items";
  ul.appendChild(li);
}

let prev = document.querySelectorAll(".prev");
let next = document.querySelectorAll(".next");
let listEl = document.querySelectorAll("body ul li");
let elePrev: HTMLLIElement;
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

let confirmPopUp = document.querySelector("#confirm") as HTMLDialogElement;
let confirmPopUpList = document.querySelector(
  "#confirm ul"
) as HTMLUListElement;
let arr: number[] = new Array(listEl.length);
let arr1: number[] = new Array(listEl.length)

for (let i = 0; i < listEl.length; i++) {
  arr[i] = 0;
  arr1[i] = 0
}
console.log(arr);

document.querySelectorAll(".clear-choice").forEach((el,i) => {
  (el as HTMLButtonElement).addEventListener("click" , () => {
    let inputs = listEl[i].querySelectorAll('input[type="radio"]');
    inputs.forEach(ele => {
      (ele as HTMLInputElement).checked = false
    })
  })
})

next.forEach((el, i) => {
  let currentAnswer: number = 0;

  if (i === listEl.length - 1) {
    el.textContent = "Finish";
    (el as HTMLButtonElement).addEventListener("click", (event) => {
      confirmPopUp.showModal();

      let inputs = listEl[i].querySelectorAll('input[type="radio"]');

      if((listEl[i].querySelector('input[type="checkbox"]') as HTMLInputElement).checked){
        arr1[i] = 1
      }else{
        arr1[i] = 0
      }

      inputs.forEach((el, indexVal) => {
        currentAnswer = indexVal;
        if ((el as HTMLInputElement).checked) {
          if (currentAnswer === contentItems.questions[i].correctAnswer - 1) {
            score += contentItems.questions[i].markForTheQuestion;
          }
          arr[i] = 1;
          return
        }else{
          arr[i] = 0;
        }

      });

      confirmPopUpList.innerHTML = ""

      for (let l = 0; l < listEl.length; l++) {
        let li = document.createElement("li");
        li.textContent = (l+1).toString();
        if (arr[l] === 1 && arr1[l] === 0) {
          li.classList.add("check");
          li.title = "Completed"
        }else if(arr[l] === 1 || arr[l] === 0 && arr1[l] === 1){
          li.classList.add("later");
          li.title = "Visit later"
        }else{
          li.classList.remove("check")
          li.title = "Incomplete"
        }
        confirmPopUpList.appendChild(li);
      }
      event.stopPropagation();
    });

    (document.querySelector("#back") as HTMLButtonElement).addEventListener(
      "click",
      () => {
        confirmPopUp.close();
        (listEl[i] as HTMLLIElement).style.visibility = "visible";
      }
    );
  }

  (el as HTMLButtonElement).addEventListener("click", () => {

    if((listEl[i].querySelector('input[type="checkbox"]') as HTMLInputElement).checked){
      arr1[i] = 1
      console.log("working");
    }else{
      arr1[i] = 0
    }

    let inputs = listEl[i].querySelectorAll('input[type="radio"]');

    inputs.forEach((el, indexVal) => {
      currentAnswer = indexVal;
      if ((el as HTMLInputElement).checked) {
        if (currentAnswer === contentItems.questions[i].correctAnswer - 1) {
          score += contentItems.questions[i].markForTheQuestion;
        }
        arr[i] = 1;
      }
    });

    (listEl[0] as HTMLLIElement).style.visibility = "hidden";
    listEl.forEach((i) => {
      let ele = i as HTMLLIElement;
      ele.style.visibility = "hidden";
    });

    if (i < listEl.length - 1)
      (listEl[i + 1] as HTMLLIElement).style.visibility = "visible";

    (
      document.querySelector("#submit-quiz") as HTMLButtonElement
    ).addEventListener("click", () => {
      window.location.href = "/src/user_module/quiz-page/quiz-summary.html";
    });

    const userData: users[] = getUser();
    const indexOfUser = Number(sessionStorage.getItem("userIndex"));
    const userSubmit: users = userData[indexOfUser];

    let courseList: course[] = viewCourse();

    const tempCourseAttempt: courseAttempt = {
      userName: userData[indexOfUser].name,
      email: userData[indexOfUser].email,
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
