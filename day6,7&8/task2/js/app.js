let counter = 0, taskList = []

function addTask(){

  let del = document.createElement("button") , li = document.createElement("li") , p = document.createElement("p") , checkBox = document.createElement("input") , edit = document.createElement("button"), div = document.createElement("div")
  checkBox.type = "checkbox";
  let task = document.querySelector("#task-adder"), listView = document.querySelector("ul"), btn = document.querySelector("#add-button");
  if(task.value === "") return 
  p.textContent = task.value;
  p.setAttribute("valueOfli", counter)

  taskList[counter] = task.value

  del.textContent = "Delete";
  del.id = "del";

  edit.innerHTML = '<i class="fa-solid fa-pen"></i>';
  edit.id = "edit";
  edit.setAttribute("counterForListItem" , counter)

  div.append(edit,del)
  div.className = "btns"

  li.append(checkBox);
  li.append(p)
  li.append(div)
  listView.append(li);

  checkBox.addEventListener("change", () => {
    if (checkBox.checked){ 
      p.style.textDecoration = "line-through";
      p.style.color = "#33333355"
    }
    else{ 
      p.style.textDecoration = "none";
      p.style.color = "#000"
    }
  });

  del.addEventListener("click", () => {
    listView.removeChild(li);
  });

  counter++

  let update = document.querySelector("#update")

  edit.addEventListener("click", () => {
    update.style.display = "block"
    btn.style.display = "none"
    task.value = taskList[edit.getAttribute("counterForListItem")]
    li.style.borderBottom= "2px solid royalblue"
    update.addEventListener("click", () => {
      p.textContent = task.value
      update.style.display = "none"
      btn.style.display = "block"
      li.style.borderBottom= ""
      task.value = null
    })

  })
  task.value = null
}
