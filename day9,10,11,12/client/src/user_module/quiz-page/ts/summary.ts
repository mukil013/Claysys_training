import { course, viewCourse } from "../../../models/courseModel";
import { getUser, users } from "../../../models/userModel";

let userScore = document.querySelector("h1") as HTMLHeadingElement;
let score: users[] = getUser();
let total: course[] = viewCourse();

let currentUser = Number(sessionStorage.getItem("userIndex"));
let currentQuiz = Number(sessionStorage.getItem("currentQuiz"));
let totalScore = 0;

total[currentQuiz].questions.forEach((i) => {
  totalScore += i.markForTheQuestion;
});
console.log(total[currentQuiz].courseAttempt);

let tempUser = Number(sessionStorage.getItem("tempUser"))

let scorePercent = (total[currentQuiz].courseAttempt[tempUser].mark / totalScore)*100;

userScore.textContent =
  scorePercent.toFixed(2) +
  "%";

let leaderTable = document
  .querySelector("table")!
  .getElementsByTagName("tbody")[0];

  const rankedByQuiz: {
    quizName: string;
    users: { name: string; score: number; rank: number }[];
  }[] = [];
  
  viewCourse().forEach((user) => {
    user.courseAttempt.forEach((attempt) => {
      const quizName = attempt.name;
      const existingQuiz = rankedByQuiz.find((q) => q.quizName === quizName);
      if (existingQuiz) {
        existingQuiz.users.push({
          name: attempt.userName,
          score: attempt.mark,
          rank: 0,
        });
      } else {
        rankedByQuiz.push({
          quizName,
          users: [{ name: attempt.userName, score: attempt.mark, rank: 0 }],
        });
      }
    });
  });
  

  rankedByQuiz.forEach((quiz) => {
    quiz.users.sort((a, b) => b.score - a.score);
    
    quiz.users.forEach((user, index) => {
      user.rank = index + 1;
    });
  });

  let tableContent = ""

  if (leaderTable) {
    rankedByQuiz.forEach((quiz) => {
      let prev = - 1
      let temp = 0
      if (total[currentQuiz].title === quiz.quizName) {
        quiz.users.forEach((el) => {
          if(prev != el.score){
            temp++
            prev = el.score
          }
          tableContent += `
            <tr class="${(el.name === score[currentUser].name) ? 'highlighted':''}">
              <td>${temp}</td>
              <td>${el.name}</td>
              <td>${el.score}/${totalScore}</td>
            </tr>
          `
        })
        leaderTable.innerHTML = tableContent
      }
    });
  }

(document.querySelector("#continue") as HTMLButtonElement).addEventListener(
  "click",
  () => {
    window.location.href = "/src/user_module/course_list/courseList.html";
  }
);


let main = document.querySelectorAll("body");
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