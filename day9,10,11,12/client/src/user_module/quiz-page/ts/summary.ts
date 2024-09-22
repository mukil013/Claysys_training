import { course, viewCourse } from "../../../models/courseModel";
import { getUser, users } from "../../../models/userModel";

let userScore = document.querySelector("h1") as HTMLHeadingElement;
let score: users[] = getUser();
let total: course[] = viewCourse();

let currentUser = Number(sessionStorage.getItem("userIndex"));
let currentQuiz = Number(sessionStorage.getItem("currentQuiz"));
let totalLen: number = Number(score[currentUser].courseAttempt.length);
let totalScore = 0;

total[currentQuiz].questions.forEach((i) => {
  totalScore += i.markForTheQuestion;
});

userScore.textContent =
  score[currentUser].courseAttempt[totalLen - 1].mark.toString() +
  "/" +
  totalScore;

let leaderTable = document
  .querySelector("table")!
  .getElementsByTagName("tbody")[0];

  const rankedByQuiz: {
    quizName: string;
    users: { name: string; score: number; rank: number }[];
  }[] = [];
  
  getUser().forEach((user) => {
    user.courseAttempt.forEach((attempt) => {
      const quizName = attempt.name;
      const existingQuiz = rankedByQuiz.find((q) => q.quizName === quizName);
      if (existingQuiz) {
        existingQuiz.users.push({
          name: user.name,
          score: attempt.mark,
          rank: 0,
        });
      } else {
        rankedByQuiz.push({
          quizName,
          users: [{ name: user.name, score: attempt.mark, rank: 0 }],
        });
      }
    });
  });
  

  rankedByQuiz.forEach((quiz) => {
    quiz.users.sort((a, b) => b.score - a.score);
    console.log(quiz.users);
    
    quiz.users.forEach((user, index) => {
      user.rank = index + 1;
    });
  });

  if (leaderTable) {
    rankedByQuiz.forEach((quiz) => {
      if (total[currentQuiz].title === quiz.quizName) {
        leaderTable.innerHTML = quiz.users
          .map(
            (user) => `
            <tr class="${user.name === score[currentUser].name ? 'highlighted' : ''}">
              <td>${user.rank}</td>
              <td>${user.name}</td>
              <td>${user.score}</td>
            </tr>
          `
          )
          .join("");
      }
    });
  }

(document.querySelector("#continue") as HTMLButtonElement).addEventListener(
  "click",
  () => {
    window.location.href = "/src/user_module/course_list/courseList.html";
  }
);
