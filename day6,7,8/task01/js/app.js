let calculator = document.querySelector("form");
let interest = document.querySelector(".interest");
let total = document.querySelector(".total");
let addInfo = document.querySelector(".add-info");
let input = document.querySelectorAll("input");
let error = document.querySelector("#error-for-principal");
var p = "",
  n = "",
  r = "";

input.forEach(i => {
  i.addEventListener("blur", () => {
    if(isNaN(i.value)){
      i.style.borderColor = 'red'
    }else{
      i.style.borderColor = ''
    }
    p = parseFloat(document.querySelector("#p").value);
    if (p < 500 || p > 10000) {
      error.textContent =
        "Ensure that the principal amount is at least $500 and no more than $10,000";
      error.style.display = "block";
    } else {
      error.style.display = "none";
    }
  });
})
let res = 0
calculator.addEventListener("submit", (e) => {
  p = parseFloat(document.querySelector("#p").value);
  n = parseFloat(document.querySelector("#n").value);
  r = parseFloat(document.querySelector("#r").value);
  e.preventDefault();
  let addedBonus = 0;
  if (n > 5) {
    r += 2;
    addedBonus = parseFloat(p / 100) * r;
  } 
  else if (p < 1000 && r < 5) r = 5;
  else if ((p >= 1000 || p < 5000) && n < 7) r = 7;
  else if (p > 5000 && n < 10) r = 10;
  let res = (p * n * r) / 100;
  interest.textContent = res;
  total.textContent = res + p;
  addInfo.textContent = addedBonus;
});
