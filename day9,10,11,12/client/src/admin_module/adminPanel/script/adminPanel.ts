import { getUser, setUser } from "../../../models/userModel";
import {
  course,
  addCourse,
  viewCourse,
  question,
} from "../../../models/courseModel";

let account = document.querySelector(".accountMenu") as HTMLDivElement;
let accountBtn = document.querySelector("#account") as HTMLButtonElement;
let LogOut = document.querySelector("#log-out") as HTMLButtonElement;
let checkBox = document.querySelector(
  "#dark-mode-toggle input"
) as HTMLInputElement;
let main = document.querySelectorAll(
  "body, #account, .accountMenu li > *, .accountMenu, #add, main > *, .content ul li,.leader-board ol div, .leader-board table, .user-management table > *, #add-form input, #add-form textarea, #add-form select, #add-form button, #add-form input[type=submit], #preview-dialog"
);
let courseListItems = document.querySelector(
  ".course-list ul"
) as HTMLUListElement;
let addBtn = document.querySelector("#add") as HTMLButtonElement;

let courseList = document.querySelector(".course-list") as HTMLDivElement;
let leaderBoard = document.querySelector(".leader-board") as HTMLDivElement;
let userManagement = document.querySelector(
  ".user-management"
) as HTMLDivElement;
let evalQuiz = document.querySelector(".eval-quiz") as HTMLDivElement;

let accountFlag = true;
let loggedAs = document.querySelector("#logged-as") as HTMLParagraphElement;

loggedAs.textContent = "admin";

accountBtn.addEventListener("click", () => {
  if (accountFlag) {
    account.style.display = "block";
    accountFlag = false;
  } else {
    account.style.display = "";
    accountFlag = true;
  }
});

function logOut() {
  window.location.replace("/index.html");
}

LogOut.addEventListener("click", logOut);

checkBox.addEventListener("click", () => {
  if (checkBox.checked) {
    main.forEach((i) => {
      i.classList.add("dark-mode");
      sessionStorage.setItem("dark-mode", "true");
    });
  } else {
    main.forEach((i) => {
      i.classList.remove("dark-mode");
      sessionStorage.setItem("dark-mode", "false");
    });
  }
});

let userTable = document
  .getElementById("user-table")!
  .getElementsByTagName("tbody")[0];

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
  let userCount = document.querySelector("#userCount") as HTMLHeadElement;
  userCount.textContent = getUser().length.toString();
  let content = "";
  getUser().forEach((i) => {
    content += `<tr>
                <td><input class="user-name" type="text" value="${i.name}" readonly/></td>
                <td>
                <input class="user-email" type="text" value="${i.email}" readonly/>
                </td>
                <td><button class="editBtnUserManage">Edit</button>
                <button class="delBtnUserManage">Delete</button></td>
                </tr>`;
  });
  userTable.innerHTML = content;

  let delBtn = document.querySelectorAll(".delBtnUserManage");
  let users = getUser();
  let userEmailEdit = document.querySelectorAll(".user-email");
  let userNameEdit = document.querySelectorAll(".user-name");
  document.querySelectorAll(".editBtnUserManage").forEach((el, i) => {
    let input1 = userEmailEdit[i] as HTMLInputElement;
    let input2 = userNameEdit[i] as HTMLInputElement;
    el.addEventListener("click", () => {
      if (input1.readOnly && input2.readOnly) {
        input1.readOnly = false;
        input2.readOnly = false;
        el.textContent = "Save";
      } else {
        let temp = users;
        temp[i].name = input2.value;
        temp[i].email = input1.value;
        setUser(temp);
        input1.readOnly = true;
        input2.readOnly = true;
        el.textContent = "Edit";
      }
    });
  });

  let courseAttemptDelete: course[] = viewCourse();

  delBtn.forEach((el, i) => {
    el.addEventListener("click", () => {
      userTable.deleteRow(i);
      let name = users[i].name;
      courseAttemptDelete[i].courseAttempt.forEach((el, i) => {
        if (el.name === name && users[i].email === el.email) {
          courseAttemptDelete.splice(i, 1);
        }
      });
      users.splice(i, 1);
      addCourse(courseAttemptDelete);
      setUser(users);
    });
  });
});

addBtn.style.display = "flex";
userManagement.setAttribute("active", "false");
leaderBoard.setAttribute("active", "false");
courseList.setAttribute("active", "true");
evalQuiz.setAttribute("active", "false");

let courseBtn = document.querySelector("#course-btn") as HTMLButtonElement;
courseBtn.addEventListener("click", () => {
  addBtn.style.display = "flex";
  userManagement.setAttribute("active", "false");
  leaderBoard.setAttribute("active", "false");
  courseList.setAttribute("active", "true");
  evalQuiz.setAttribute("active", "false");
});

let leaderBtn = document.querySelector("#leader-btn") as HTMLButtonElement;
leaderBtn.addEventListener("click", () => {
  addBtn.style.display = "none";
  userManagement.setAttribute("active", "false");
  courseList.setAttribute("active", "false");
  leaderBoard.setAttribute("active", "true");
  evalQuiz.setAttribute("active", "false");
});

let userBtn = document.querySelector("#user-btn") as HTMLButtonElement;
userBtn.addEventListener("click", () => {
  addBtn.style.display = "none";
  courseList.setAttribute("active", "false");
  leaderBoard.setAttribute("active", "false");
  userManagement.setAttribute("active", "true");
  evalQuiz.setAttribute("active", "false");
});

let evalBtn = document.querySelector("#eval-btn") as HTMLButtonElement;
evalBtn.addEventListener("click", () => {
  addBtn.style.display = "none";
  courseList.setAttribute("active", "false");
  leaderBoard.setAttribute("active", "false");
  userManagement.setAttribute("active", "false");
  evalQuiz.setAttribute("active", "true");
});

let addDialog = document.querySelector("#add-form") as HTMLDialogElement;
let courseInit: course = {
  title: "",
  description: "",
  questionType: "",
  booleanQues: [],
  questions: [],
  courseAttempt: [],
};

let courseListStorage: course[] = viewCourse();

let previewBtnBack = document.querySelector(
  "#preview-back"
) as HTMLButtonElement;
let previewDialog = document.querySelector(
  "#preview-dialog"
) as HTMLDialogElement;
let previewListView = document.querySelector(
  "#preview-dialog ul"
) as HTMLUListElement;

let questionForm = document.querySelector(
  "#add-question-form"
) as HTMLFormElement;
let addForm = document.querySelector("#add-quiz") as HTMLFormElement;

let previewContent: string = "";

let questionNumber: number = 1;

addBtn.addEventListener("click", () => {
  addDialog.showModal();
  questionNumber = 1;
  let title = document.querySelector("#title") as HTMLInputElement;

  title.addEventListener("blur", () => {
    if (courseListStorage.length != 0) {
      courseListStorage.forEach((i) => {
        if (i.title.toLowerCase() === title.value.toLowerCase()) {
          alert("course already exist");
          addForm.reset();
          return;
        }
      });
    }
    courseInit.title = title.value;
    let qtitle = document.querySelector("#qtitle") as HTMLTextAreaElement;
    let marks = document.querySelector("#marks") as HTMLInputElement;
    let correctAns = document.querySelector(
      "#correct-answer"
    ) as HTMLSelectElement;
    let optionsFromInput = document.querySelectorAll("#options li input");

    let questionNumberForDisplay = document.querySelector(
      "#question-number"
    ) as HTMLDivElement;

    let questionsArray: question[] = [];

    let mcq = document.querySelector("#mcq") as HTMLDivElement;
    let trueFalse = document.querySelector("#true-false") as HTMLDivElement;
    let ansType = document.querySelector("#answer-type") as HTMLSelectElement;

    ansType.addEventListener("change", () => {
      if (ansType.value === "mcq") {
        mcq.style.display = "block";
        trueFalse.style.display = "";
        courseInit.questionType = "mcq"
      } else if (ansType.value === "true-false") {
        trueFalse.style.display = "block";
        mcq.style.display = "";
        courseInit.questionType = "boolean"
      } else if (ansType.value === "written") {
        trueFalse.style.display = "";
        mcq.style.display = "";
        courseInit.questionType = "written"
      } else {
        trueFalse.style.display = "";
        mcq.style.display = "";
        courseInit.questionType = ""
      }
    });

    (
      document.querySelector("#save-question") as HTMLButtonElement
    ).addEventListener(" click ", () => {
      questionNumber++;
    });

    questionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      questionNumberForDisplay.textContent = `Question number: ${
        questionNumber + 1
      }`;
      let option: string[] = [];
      optionsFromInput.forEach((el) => {
        let ele = el as HTMLInputElement;
        const optionValue = ele.value.trim();
        if (optionValue) {
          option.push(optionValue);
        }
      });
      let question: question = {
        qno: questionNumber,
        question: qtitle.value.trim(),
        options: option,
        correctAnswer: Number(correctAns.value),
        markForTheQuestion: marks.valueAsNumber,
      };
      if (question.question && question.options.length > 0) {
        questionsArray.push(question);
        courseInit.questions = questionsArray;
        questionForm.reset();
        questionNumber++;
      }
    });

    addForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let description = document.querySelector(
        "#description"
      ) as HTMLTextAreaElement;
      courseInit.description = description.value;

      questionForm.style.display = "block";
      addForm.style.display = "none";
    });
  });
  let saveAndExit = document.querySelector(
    "#save-changes"
  ) as HTMLButtonElement;
  saveAndExit.addEventListener("click", () => {
    if (courseInit.questions.length > 1) {
      addDialog.close();
      courseListStorage.push(courseInit);
      addCourse(courseListStorage);
      window.location.reload();
    } else {
      alert("Enter some question to save this quiz");
    }
  });
  (document.querySelector("#exit") as HTMLButtonElement).addEventListener(
    "click",
    () => {
      addDialog.close();
      questionForm.style.display = "none";
      addForm.style.display = "flex";
    }
  );
  
  addForm.reset();
});

let backBtn = document.querySelector("#back") as HTMLButtonElement;
backBtn.addEventListener("click", () => {
  addDialog.close();
});

let content = "";

window.addEventListener("load", () => {
  courseListStorage.forEach((el) => {

    let li = document.createElement("li") as HTMLLIElement;
    content = `
               <h1 class="course-title">${el.title.toUpperCase()}</h1>
               <div>
               <button class="editBtnForCourse">Edit</button>
               <button class="delBtnForCourse">Delete</button>
               </div>
               `;
    li.innerHTML += content;
    courseListItems.append(li);
  });

  let listItems = document.querySelectorAll(".course-list ul li");

  let user = getUser();
  let questionArrayForEdit: question[] = [];

  document.querySelectorAll(".editBtnForCourse").forEach((el, i) => {
    el.addEventListener("click", () => {
      let allCourse: course[] = viewCourse();
      questionArrayForEdit = viewCourse()[i].questions;
      previewDialog.showModal();
      previewListView.innerHTML = `
          <label>Quiz title
          <input type="text" id="modified-title" value="${allCourse[i].title}">
          </label>
          <label>Quiz Description
          <textarea id="modified-description" rows="3">${allCourse[i].description}</textarea>
          </label>
      `;

      questionArrayForEdit.forEach((el) => {
        let li = document.createElement("li");
        previewContent = `<p>Question no : ${el.qno}</p><br />
            <p>Question : ${el.question}</p><br />
            <p>Options</p>
            <ol>`;
        el.options.forEach((ele) => {
          previewContent += `<li>${ele}</li>`;
        });
        previewContent += `</ol>
            <br />
            <p>Correct Answer : ${el.correctAnswer}</p><br />
            <p>Mark for the Question : ${el.markForTheQuestion}</p>
            <div>
            <button class="editInPreview" >Edit</button>
            <button class="delInPreview" >Delete</button>
            </div>`;
        li.innerHTML += previewContent;
        previewListView.appendChild(li);

        (
          document.querySelector("#save-modified") as HTMLButtonElement
        ).addEventListener("click", () => {
          allCourse[i].title = (
            document.querySelector("#modified-title") as HTMLInputElement
          ).value;
          allCourse[i].description = (
            document.querySelector(
              "#modified-description"
            ) as HTMLTextAreaElement
          ).value;
          addCourse(allCourse);
          previewDialog.close();
        });

        document.querySelectorAll(".delInPreview").forEach((el, index) => {
          (el as HTMLButtonElement).addEventListener("click", () => {
            courseInit = allCourse[i];
            if (questionArrayForEdit.length > 2) {
              questionArrayForEdit.splice(index, 1);
              previewListView.removeChild(li);
              courseInit.questions = questionArrayForEdit;
              allCourse[i] = courseInit;
              addCourse(allCourse);
            } else {
              alert("Cannot delete all questions, delete the quiz instead");
            }
          });
        });
      });

      let editDialog = document.querySelector(
        "#edit-form"
      ) as HTMLDialogElement;
      document.querySelectorAll(".editInPreview").forEach((el, i1) => {
        (el as HTMLButtonElement).addEventListener("click", () => {
          console.log("outer working");

          editDialog.showModal();

          let exitEdit = document.querySelector(
            "#edit-exit"
          ) as HTMLButtonElement;

          exitEdit.addEventListener("click", () => {
            editDialog.close();
          });

          let qtitle = document.querySelector(
            "#edit-qtitle"
          ) as HTMLTextAreaElement;
          let marks = document.querySelector("#edit-marks") as HTMLInputElement;
          let correctAns = document.querySelector(
            "#edit-correct-answer"
          ) as HTMLSelectElement;
          let optionsFromInput = document.querySelectorAll(
            "#edit-options li input"
          );

          let questionNumberForDisplay = document.querySelector(
            "#edit-question-number"
          ) as HTMLDivElement;

          qtitle.value = questionArrayForEdit[i1].question;

          optionsFromInput.forEach((el, i1) => {
            (el as HTMLInputElement).value =
              questionArrayForEdit[i].options[i1];
          });

          correctAns.value = questionArrayForEdit[i1].correctAnswer.toString();

          marks.valueAsNumber = questionArrayForEdit[i1].markForTheQuestion;
          let editForm = document.querySelector(
            "#edit-question-form"
          ) as HTMLFormElement;

          editForm.addEventListener("submit", (e) => {
            e.preventDefault();
            questionNumberForDisplay.textContent =
              questionArrayForEdit[i1].qno.toString();

            let option: string[] = [];
            optionsFromInput.forEach((el) => {
              let ele = el as HTMLInputElement;
              const optionValue = ele.value.trim();
              if (optionValue) {
                option.push(optionValue);
              }
            });

            let question: question = {
              qno: i1 + 1,
              question: qtitle.value,
              options: option,
              correctAnswer: Number(correctAns.value),
              markForTheQuestion: marks.valueAsNumber,
            };
            allCourse[i].questions[i1] = question;
            console.log(allCourse);
            addCourse(allCourse);
          });
        });
      });
    });
  });
  previewBtnBack.addEventListener("click", () => {
    previewDialog.close();
  });

  document.querySelectorAll(".delBtnForCourse").forEach((el, i) => {
    el.addEventListener("click", () => {
      let temp = courseListStorage[i].title;

      courseListItems.removeChild(listItems[i]);
      courseListStorage.splice(i, 1);
      addCourse(courseListStorage);

      let indexToDel = -1;
      user.forEach((i) => {
        i.courseAttempt.forEach((el, index) => {
          if (el.name === temp) {
            console.log(el.name + " " + temp);
            indexToDel = index;
          }
        });
        if (indexToDel != -1) {
          i.courseAttempt.splice(indexToDel, 1);
          indexToDel = -1;
        }
      });
      setUser(user);
    });
  });
});

let usersData: course[] = viewCourse();

let leaderTable = document
  .querySelector("table")!
  .getElementsByTagName("tbody")[0];

let contentForTable = "";

let list = document.querySelector("#course-list-score") as HTMLSelectElement;

list.addEventListener("change", () => {
  usersData.forEach((i, index) => {
    let prev = -1;
    let temp = 0;
    contentForTable = `
            <thead>
              <tr class="header">
                <th>Rank</th>
                <th>Name</th>
                <th>Course</th>
                <th>Score</th>
                <th>Action</th>
              </tr>
            </thead>`;
    usersData[index].courseAttempt.sort((a, b) => b.mark - a.mark);
    usersData[index].courseAttempt.forEach((j) => {
      if (list.value === j.name) {
        if (prev != j.mark) {
          temp++;
          prev = j.mark;
        }
        contentForTable += `
                          <tr>
                            <td>${temp}</td>
                            <td>${j.userName}</td>
                            <td>${j.name}</td>
                            <td><input type="number" value="${j.mark}" class="user-score" readonly/></td>
                            <td>
                              <button class="edit-for-score">Edit</button>
                              <button class="delete-attempt">Delete</button>
                            </td>
                          </tr>`;
        leaderTable.innerHTML = contentForTable;

        document.querySelectorAll(".delete-attempt").forEach((el, index01) => {
          el.addEventListener("click", () => {
            leaderBoard.getElementsByTagName("tr")[index + 1].remove();
            usersData[index].courseAttempt.splice(index01, 1);
            addCourse(usersData);
          });
        });

        let scoreInput = document.querySelectorAll(".user-score");

        document.querySelectorAll(".edit-for-score").forEach((el, index) => {
          let input = scoreInput[index] as HTMLInputElement;
          el.addEventListener("click", () => {
            if (input.readOnly) {
              input.readOnly = false;
              el.textContent = "Save";
            } else {
              if (input.value.length !== 0) {
                i.courseAttempt[index].mark = input.valueAsNumber;
                addCourse(usersData);
                input.readOnly = true;
                el.textContent = "Edit";
              } else {
                alert("Enter a valid score");
              }
            }
          });
        });
      } else if (list.value === "All") {
        contentForTable = `
            <thead>
              <tr class="header">
                <th>Rank</th>
                <th>Name</th>
                <th>Course</th>
                <th>Score</th>
              </tr>
            </thead>`;

        usersData.forEach((i) => {
          let prev = -1;
          let temp = 0;
          i.courseAttempt.forEach((j) => {
            if (prev != j.mark) {
              temp++;
              prev = j.mark;
            }
            contentForTable += `
                                <tr>
                                  <td>${temp}</td>
                                  <td>${j.userName}</td>
                                  <td>${j.name}</td>
                                  <td><input type="number" value="${j.mark}" class="user-score" readonly/></td>
                                </tr>`;
          });
          leaderTable.innerHTML = contentForTable;
        });
      }
    });
  });
});
contentForTable = `
            <thead>
              <tr class="header">
                <th>Rank</th>
                <th>Name</th>
                <th>Course</th>
                <th>Score</th>
              </tr>
            </thead>`;

usersData.forEach((i) => {
  let prev = -1;
  let temp = 0;
  let preName = "";
  let currentName = "";
  i.courseAttempt.forEach((j) => {
    currentName = j.name;
    if (currentName != preName) {
      list.innerHTML += `<option>${j.name}</option>`;
      preName = currentName;
    }
    if (prev != j.mark) {
      temp++;
      prev = j.mark;
    }
    contentForTable += `
      <tr>
        <td>${temp}</td>
        <td>${j.userName}</td>
        <td>${j.name}</td>
        <td><input type="number" value="${j.mark}" class="user-score" readonly/></td>
      </tr>`;
  });

  leaderTable.innerHTML = contentForTable;

  let userScoreInput = document.querySelectorAll(".user-score");

  document.querySelectorAll(".edit-for-score").forEach((el, index) => {
    let input = userScoreInput[index] as HTMLInputElement;

    el.addEventListener("click", () => {
      if (input.readOnly) {
        input.readOnly = false;
        el.textContent = "Save";
      } else {
        if (input.value.length !== 0) {
          let tempMark = usersData[index].courseAttempt;
          tempMark[index].mark = input.valueAsNumber;
          usersData[index].courseAttempt = tempMark;
          console.log(tempMark);

          console.log(usersData);
          addCourse(usersData);

          input.readOnly = true;
          el.textContent = "Edit";
        } else {
          alert("Enter a valid score");
        }
      }
    });
  });
});
