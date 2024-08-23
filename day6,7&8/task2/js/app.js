let listView = document.querySelector("ul");
let btn = document.querySelector("#add-button");

btn.addEventListener("click", () => {
  let del = document.createElement("button");
  let li = document.createElement("li");
  let p = document.createElement("p");
  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  let task = document.querySelector("#task-adder").value;
  p.textContent = task;
  del.textContent = "Delete";
  del.id = "del";
  li.append(checkBox);
  li.append(p);
  li.append(del);
  listView.append(li);
  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      p.style.textDecoration = "line-through";
    } else {
      p.style.textDecoration = "none";
    }
  });
  del.addEventListener("click", () => {
    listView.removeChild(li);
  });
});
