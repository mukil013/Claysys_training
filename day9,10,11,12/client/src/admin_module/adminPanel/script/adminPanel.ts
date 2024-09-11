import { getUser, setUser } from "../../../models/userModel";
import { addCourse, viewCourse } from "../../../models/courseModel";

let account = document.querySelector(".accountMenu") as HTMLDivElement;
let accountBtn = document.querySelector("#account") as HTMLButtonElement;
let LogOut = document.querySelector("#log-out") as HTMLButtonElement;
let checkBox = document.querySelector("nav input") as HTMLInputElement;
let main = document.querySelectorAll(
  "body, #account, .accountMenu li > *, .accountMenu, #add, main > *, .content ul li,.leader-board ol div, .leader-board table, .user-management table > *, #add-form form input, #add-form form textarea"
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

loggedAs.textContent = "admin@123.com";

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
    content += `<tr><td class="user-email">${i.email}</td><td><button class="delBtnUserManage">Delete</button></td></tr>`;
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

let addDialog = document.querySelector("#add-form") as HTMLDialogElement,
  dialogForm = document.querySelector("#dialog-sumbit") as HTMLButtonElement;

addBtn.addEventListener("click", () => {
  addDialog.showModal();

  dialogForm.addEventListener(
    "click",
    () => {
      let questionNumber:number = 0
      let title = document.querySelector("#title") as HTMLInputElement;
      let description = document.querySelector("#description") as HTMLTextAreaElement
      let qtitle = document.querySelector("#qtitle") as HTMLTextAreaElement
      let questions = document.querySelector("#questions") as HTMLUListElement
      let addBtn = document.querySelector("#add-question") as HTMLButtonElement
      let li = document.createElement("li") as HTMLLIElement;
      let dialogLi = document.createElement("li") as HTMLLIElement;

      content = `
      <h1>${title.value}</h1>
      <button>Add Questions</button>
      <button>Edit</button>
      <button class="delBtnForCourse">Delete</button>
      `;

      li.innerHTML += content;
      courseListItems.append(li);

      let courseTitle = {
        title: title.value,
        description: description.value,
        questions: [{
          qno: questionNumber,
          qtitle: qtitle
        }]
      };
      addBtn.addEventListener("click" , () => {
        questions.append(dialogLi)
      })
      // courseListStorage.push(courseTitle);
      // addCourse(courseListStorage);
      addDialog.close();
    },
    { once: true }
  );
});

let backBtn = document.querySelector("#back") as HTMLButtonElement;
backBtn.addEventListener("click", () => {
  addDialog.close();
});

let courseListStorage = viewCourse();
let content = "";

window.addEventListener("load", () => {
  courseListStorage.forEach((el) => {
    let li = document.createElement("li") as HTMLLIElement;
    content = `
               <h1 class="course-title">${el.title}</h1>
               <button>Add Questions</button>
               <button id="editBtn">Edit</button>
               <button class="delBtnForCourse">Delete</button>
               `;
    li.innerHTML += content;
    courseListItems.append(li);
  });

  let listItems = document.querySelectorAll(".course-list ul li");

  document.querySelectorAll(".delBtnForCourse").forEach((el, i) => {
    el.addEventListener(
      "click",
      () => {
        courseListItems.removeChild(listItems[i]);
        courseListStorage.splice(i, 1);
        addCourse(courseListStorage);
      },{once:true}
    );
  });
});
