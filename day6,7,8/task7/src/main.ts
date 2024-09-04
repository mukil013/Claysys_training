let users: any = [],
  counter: number = 0;

class addUser<T> {
  name: T;
  email: T;
  role: T;
  constructor(name: T, email: T, role: T) {
    this.name = name;
    this.email = email;
    this.role = role;
  }
}

let ul = document.querySelector("ul") as HTMLUListElement;
let form = document.querySelector("form") as HTMLFormElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.querySelector("#name") as HTMLInputElement;
  let email = document.querySelector("#email") as HTMLInputElement;
  let role = document.querySelector("#role") as HTMLInputElement;
  users.push(new addUser(name.value, email.value, role.value));

  let li = document.createElement("li");

  let content = ` <p>${users.length}</p> <p id="user-name">${users[counter].name}</p> <p id="user-email">${users[counter].email}</p> <p id="user-role">${users[counter].role}</p>`;

  let deleteButton = document.createElement("button");
  deleteButton.id = "deleteButton";
  deleteButton.textContent = "Delete";

  let editButton = document.createElement("button");
  editButton.id = "editButton";
  editButton.textContent = "Edit";

  li.innerHTML += content;

  li.append(deleteButton);
  li.append(editButton);
  li.setAttribute("itemNumber", `${counter}`);
  ul.append(li);

  counter++;

  deleteButton.addEventListener("click", () => {
    users.splice(Number(li.getAttribute("itemNumber")), 1);
    ul.removeChild(li);
    console.log(users);
    counter--;
  });

  editButton.addEventListener("click", () => {
    let tempCounter = Number(li.getAttribute("itemNumber"));

    name.value = users[tempCounter].name;
    email.value = users[tempCounter].email;
    role.value = users[tempCounter].role;

    let updateBtn = document.querySelector("#update") as HTMLButtonElement;

    updateBtn.addEventListener("click", () => {
      users[tempCounter].name = name.value;
      users[tempCounter].email = email.value;
      users[tempCounter].role = role.value;

      document.querySelector("#user-name")!.textContent =
        users[tempCounter].name;
      document.querySelector("#user-email")!.textContent =
        users[tempCounter].email;
      document.querySelector("#user-role")!.textContent =
        users[tempCounter].role;

      console.log(users);
    });
  });
});
