let form = document.querySelector("form");
let elName = document.querySelector("#name");
let elGrade = document.querySelector("#grade");
let listView = document.querySelector(".container ul");
let display = document.querySelector("#display-grade");
let avg = document.querySelector("#avg-grade");
let avgBtn = document.querySelector("#avg-btn");
let arrName = [];
let arrGrade = [];
let counter = 0;

elName.addEventListener("blur", () => {
  let p = document.querySelector("#name-error");
  let temp = [elName.value.split("")]
  for(let i = 0; i < temp.length; i++){
    if(!isNaN(temp[i])){
      if(temp[i] === " "){
        break
      }
      p.style.display = "block"
    }else{
      p.style.display = ""
    }
  }
  arrName[counter] = elName.value;
});

elGrade.addEventListener("blur", () => {
  let p = document.querySelector("#grade-error");
  let grade = "";
  if(isNaN(elGrade.value) || elGrade.value === " " || elGrade.value === "") {
    p.style.display = "block"
    return
  } else {
    console.log("woring")
    p.style.display = "";
    grade = elGrade.value;
    if (grade > 100 || grade < 0) {
      p.textContent = "Enter between 0 to 100";
      p.style.display = "block";
      return
    } else {
      p.textContent = "Enter a valid grade";
      p.style.display = "";
    }
  }
  arrGrade[counter] = parseFloat(grade);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let list = document.createElement("li");
  let count = document.createElement("p");
  let name = document.createElement("p");
  let grade = document.createElement("p");
  Object.values(arrName).map((i) => {
    name.textContent = i+" - ";
  });
  Object.values(arrGrade).map((i) => {
    grade.textContent = i;
  });
  count.textContent = counter + 1 + ".";
  list.append(count, name, grade);
  listView.append(list);
  counter++;
  form.reset();
});

let flag = 0;

display.addEventListener("click", () => {
  if (flag == 0) {
    listView.style.display = "flex";
    flag = 1;
  } else {
    listView.style.display = "";
    flag = 0;
  }
});

let totalGrade = 0;

avgBtn.addEventListener("click", () => {
  arrGrade.forEach((i) => {
    totalGrade += i;
  });
  avg.textContent = (totalGrade / counter + 1).toFixed(2);
});
