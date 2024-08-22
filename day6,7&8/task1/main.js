let calculator = document.querySelector("body form");
let interest = document.querySelector(".interest");
let total = document.querySelector(".total")
let addInfo = document.querySelector(".add-info")
let res = 0;

calculator.addEventListener("submit", (e) => {
  let p = document.querySelector("#p").value
  let n = document.querySelector("#n").value
  let r = document.querySelector("#r").value
  e.preventDefault();
  if(p < 500 || p > 10000){
    alert("Enter principal amount from $500 to $10000")
    calculator.reset()
  }else{
    res = (p*n*r)/100
    interest.textContent = res
    total.textContent = Number(p)+Number(res)
    addInfo.textContent = 0
  }
});
