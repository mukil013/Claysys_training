let users: any = [],
  counter: number = 0,
  tempIndex: number = 0;

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

let ul = document.querySelector("ol") as HTMLOListElement;
let form = document.querySelector("form") as HTMLFormElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = document.querySelector("#name") as HTMLInputElement;
  let email = document.querySelector("#email") as HTMLInputElement;
  let role = document.querySelector("#role") as HTMLSelectElement;

  users.push(new addUser(name.value, email.value, role.value));

  let div = document.createElement("div");
  let btnContainer = document.createElement("span");

  let content = `<span><li></li><p id="name-${counter}">${users[counter].name}</p></span> <p id="email-${counter}">${users[counter].email}</p> <p id="role-${counter}">${users[counter].role}</p>`;

  let deleteButton = document.createElement("button");
  deleteButton.id = "deleteButton";
  deleteButton.textContent = "Delete";

  let editButton = document.createElement("button");
  editButton.id = "editButton";
  editButton.textContent = "Edit";

  div.innerHTML = content;
  btnContainer.append(editButton, deleteButton)
  div.append(btnContainer)
  div.setAttribute("itemNumber", `${counter}`);
  div.id = `${counter}`;
  ul.append(div);

  counter++;

  deleteButton.addEventListener("click", () => {
    users.splice(div.getAttribute("itemNumber"),1)
    ul.removeChild(div);
    console.log(users);
    counter--;
  });

  editButton.addEventListener("click", () => {
    tempIndex = Number(div.getAttribute("itemNumber"));

    name.value = users[tempIndex].name;
    email.value = users[tempIndex].email;
    role.value = users[tempIndex].role;

    let updateBtn = document.querySelector("#update") as HTMLButtonElement;

    updateBtn.style.display = "block";

    updateBtn.addEventListener(
      "click",
      () => {
        users[tempIndex].name = name.value;
        users[tempIndex].email = email.value;
        users[tempIndex].role = role.value;

        console.log(document.querySelector(`#name-${tempIndex}`));
        console.log(document.querySelector(`#email-${tempIndex}`));
        console.log(document.querySelector(`#role-${tempIndex}`));

        document.querySelector(`#name-${tempIndex}`)!.textContent =
          users[tempIndex].name;
        document.querySelector(`#email-${tempIndex}`)!.textContent =
          users[tempIndex].email;
        document.querySelector(`#role-${tempIndex}`)!.textContent =
          users[tempIndex].role;

        updateBtn.style.display = "";
        form.reset()
        console.log(users);
      },
      { once: true }
    );
  });
  form.reset()
});
