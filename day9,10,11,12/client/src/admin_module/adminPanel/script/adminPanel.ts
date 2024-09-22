import { getUser, setUser, users } from "../../../models/userModel";
import {
  course,
  addCourse,
  viewCourse,
  question,
} from "../../../models/courseModel";

let account = document.querySelector(".accountMenu") as HTMLDivElement;
let accountBtn = document.querySelector("#account") as HTMLButtonElement;
let LogOut = document.querySelector("#log-out") as HTMLButtonElement;
let checkBox = document.querySelector("nav input") as HTMLInputElement;
let main = document.querySelectorAll(
  "body, #account, .accountMenu li > *, .accountMenu, #add, main > *, .content ul li,.leader-board ol div, .leader-board table, .user-management table > *, #add-form input, #add-form textarea, #add-form select, #add-form button, #add-form input[type=submit]"
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
    });
  } else {
    main.forEach((i) => {
      i.classList.remove("dark-mode");
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
    content += `<tr><td class="user-email">${i.email}</td>
                <td><button class="editBtnUserManage">Edit</button>
                <button class="delBtnUserManage">Delete</button></td>
                </tr>`;
  });
  userTable.innerHTML = content;

  let delBtn = document.querySelectorAll(".delBtnUserManage");
  let users = getUser();

  delBtn.forEach((el, i) => {
    el.addEventListener("click", () => {
      userTable.deleteRow(i);
      users.splice(i, 1);
      setUser(users);
    });
  });
});

let staticTxt = document.querySelector(".static_text h1") as HTMLHeadingElement;

let courseBtn = document.querySelector("#course-btn") as HTMLButtonElement;
courseBtn.addEventListener("click", () => {
  addBtn.style.display = "block";
  userManagement.setAttribute("active", "false");
  leaderBoard.setAttribute("active", "false");
  courseList.setAttribute("active", "true");
  staticTxt.style.display = "none";
});

let leaderBtn = document.querySelector("#leader-btn") as HTMLButtonElement;
leaderBtn.addEventListener("click", () => {
  addBtn.style.display = "none";
  userManagement.setAttribute("active", "false");
  courseList.setAttribute("active", "false");
  leaderBoard.setAttribute("active", "true");
  staticTxt.style.display = "none";
});

let userBtn = document.querySelector("#user-btn") as HTMLButtonElement;
userBtn.addEventListener("click", () => {
  addBtn.style.display = "none";
  courseList.setAttribute("active", "false");
  leaderBoard.setAttribute("active", "false");
  userManagement.setAttribute("active", "true");
  staticTxt.style.display = "none";
});

let addDialog = document.querySelector("#add-form") as HTMLDialogElement;
let courseInit: course = {
  title: "",
  description: "",
  questions: [],
  courseAttempt: [],
};

let courseListStorage: course[] = viewCourse();
let questionsArray: question[] = [];

addBtn.addEventListener("click", () => {
  let addForm = document.querySelector("#add-quiz") as HTMLFormElement;
  let questionForm = document.querySelector(
    "#add-question-form"
  ) as HTMLFormElement;

  addDialog.showModal();

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

    (
      document.querySelector("#save-question") as HTMLButtonElement
    ).addEventListener("click", () => {
      let len = questionsArray.length;
      questionNumberForDisplay.textContent = `Question number: ${len + 1}`;

      let option: string[] = [];
      optionsFromInput.forEach((el) => {
        let ele = el as HTMLInputElement;
        const optionValue = ele.value.trim();
        if (optionValue) {
          option.push(optionValue);
        }
      });
      let question: question = {
        qno: len + 1,
        question: qtitle.value.trim(),
        options: option,
        correctAnswer: Number(correctAns.value),
        markForTheQuestion: marks.valueAsNumber,
      };
      if (question.question && question.options.length > 0) {
        questionsArray.push(question);
        courseInit.questions = questionsArray;
        questionForm.reset();
      }
    });

    let previewBtn = document.querySelector("#preview") as HTMLButtonElement;
    let previewBtnBack = document.querySelector(
      "#preview-back"
    ) as HTMLButtonElement;
    let previewDialog = document.querySelector(
      "#preview-dialog"
    ) as HTMLDialogElement;
    let previewListView = document.querySelector(
      "#preview-dialog ul"
    ) as HTMLUListElement;

    let previewContent: string = "";

    previewBtn.addEventListener("click", () => {
      previewDialog.showModal();
      previewListView.innerHTML = "";
      questionsArray.forEach((el) => {
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
            <button class="delInPreview" >Delete</button>`;
        li.innerHTML += previewContent;
        previewListView.appendChild(li);

        document.querySelectorAll("#delInPreview").forEach((el, i) => {
          (el as HTMLButtonElement).addEventListener("click", () => {
            questionsArray.splice(i, 1);
            previewListView.removeChild(li);
          });
        });
      });
    });
    previewBtnBack.addEventListener("click", () => {
      previewDialog.close();
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
  addForm.reset();
});

let backBtn = document.querySelector("#back") as HTMLButtonElement;
backBtn.addEventListener("click", () => {
  addDialog.close();
});

let saveAndExit = document.querySelector("#save-changes") as HTMLButtonElement;
saveAndExit.addEventListener("click", () => {
  addDialog.close();
  courseListStorage.push(courseInit);
  addCourse(courseListStorage);
  console.log(courseListStorage);
  window.location.reload();
});

let content = "";

window.addEventListener("load", () => {
  courseListStorage.forEach((el) => {
    let li = document.createElement("li") as HTMLLIElement;
    content = `
               <h1 class="course-title">${el.title.toUpperCase()}</h1>
               <div>
               <button class="delBtnForCourse">Delete</button>
               </div>
               `;
    li.innerHTML += content;
    courseListItems.append(li);
  });

  let listItems = document.querySelectorAll(".course-list ul li");

  let user = getUser();

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
            console.log(el.name+" "+temp);
            indexToDel = index;
          }
        });
        if(indexToDel != -1){
          i.courseAttempt.splice(indexToDel, 1);
          indexToDel = -1
        }
      });
      setUser(user)
    });
  });
});

let usersData: course[] = viewCourse();

let leaderTable = document
  .querySelector("table")!
  .getElementsByTagName("tbody")[0];

let contentForTable = "";

usersData.forEach((i) => {
  i.courseAttempt.forEach((i1,index) => {
    contentForTable += `
                      <tr>
                        <td>${index+1}</td>
                        <td>${i1.userName}</td>
                        <td>${i1.name}</td>
                        <td>${i1.mark}</td>
                        <td>
                          <button>edit</button>
                          <button>delete</button>
                        </td>
                      </tr>`;

    console.log(i1);
  });

  leaderTable.innerHTML = contentForTable;
});
