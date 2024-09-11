let users: any = [],
  counter: number = 0,
  tempIndex: number = 0,
  flag: boolean = false,
  editFlag: boolean = false

interface addUser<T> {
  name: T;
  email: T;
  role: T;
}

window.addEventListener("load" , () => {
  form.reset()
})

let ol = document.querySelector("ol") as HTMLOListElement,
  addBtn = document.querySelector("#add-user") as HTMLButtonElement,
  form = document.querySelector("form") as HTMLFormElement,
  error = document.querySelector("#errorMsg") as HTMLParagraphElement;

addBtn.addEventListener("click", () => {
  error.style.display = "";

  let name = document.querySelector("#name") as HTMLInputElement;
  let email = document.querySelector("#email") as HTMLInputElement;
  let role = document.querySelector("#role") as HTMLSelectElement;

  flag = validation(name, email);
  
  if (flag) {
    let user = {
      name: name.value,
      email: email.value,
      role: role.value,
    };

    let obj: addUser<Object> = user as addUser<Object>;
    users.push(obj);

    let div = document.createElement("div"),
      btnContainer = document.createElement("span");
    let content = `<span><li></li><p id="name-${counter}">${users[counter].name}</p></span> <p id="email-${counter}">${users[counter].email}</p> <p id="role-${counter}">${users[counter].role}</p>`;

    let deleteButton = document.createElement("button");
    deleteButton.id = "deleteButton";
    deleteButton.textContent = "Delete";

    let editButton = document.createElement("button");
    editButton.id = "editButton";
    editButton.textContent = "Edit";

    div.innerHTML = content;
    btnContainer.append(editButton, deleteButton);
    div.append(btnContainer);
    div.setAttribute("itemNumber", `${counter}`);
    div.id = `${counter}`;
    ol.append(div);
    counter++;

    let update = document.querySelector("#update") as HTMLButtonElement;

    deleteButton.addEventListener("click", () => {
      users.splice(div.getAttribute("itemNumber"), 1);
      ol.removeChild(div);
      console.log(users);
      counter--;
      error.style.display = "";
      if (editFlag) {
        form.reset()
        update.style.display = "none";
        addBtn.style.display = "block";
        editFlag = false;
      }
    });

    editButton.addEventListener("click", () => {
      editFlag = true;
      tempIndex = Number(div.getAttribute("itemNumber"));

      name.value = users[tempIndex].name;
      email.value = users[tempIndex].email;
      role.value = users[tempIndex].role;

      update.style.display = "block";
      addBtn.style.display = "none";

      update.textContent = "Update User";

      update.addEventListener("click", () => {

        editFlag = false;

        users[tempIndex].name = name.value;
        users[tempIndex].email = email.value;
        users[tempIndex].role = role.value;

        document.querySelector(`#name-${tempIndex}`)!.textContent =
          users[tempIndex].name;
        document.querySelector(`#email-${tempIndex}`)!.textContent =
          users[tempIndex].email;
        document.querySelector(`#role-${tempIndex}`)!.textContent =
          users[tempIndex].role;

        update.style.display = "none";
        addBtn.style.display = "block";

        form.reset()
      }, {once:true});
    });
    form.reset()
  } else error.style.display = "block";
});

function validation(name: HTMLInputElement, email: HTMLInputElement): boolean{
  if (name.value === "" || email.value === "") {
    return false;
  } else if(!editFlag){
    for (let x = 0; x < users.length; x++) {
      if (users[x].email === email.value) return false;
    }
  }
  return true
}
