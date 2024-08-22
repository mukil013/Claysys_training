let calculator = document.querySelector("form");
let interest = document.querySelector(".interest");
let total = document.querySelector(".total")
let addInfo = document.querySelector(".add-info")
let res = 0;

calculator.addEventListener("submit", (e) => {

  let p = Number(document.querySelector("#p").value)
  let n = Number(document.querySelector("#n").value)
  let r = Number(document.querySelector("#r").value)

  e.preventDefault();

  if(p < 500 || p > 10000){

    alert("Enter principal amount from $500 to $10000")
    calculator.reset()

  }else{

    let addedBonus = 0

    if(n > 5){
      let temp = r + 2
      addedBonus = (p / 100) * temp 
    }

    else if( p < 1000 && r < 5) r = 5
    else if((p >= 1000 || p < 5000 ) && n < 7) n = 7
    else if( p > 5000 && n < 10) n = 10

    res = Number((p*n*r)/100)
    interest.textContent = res
    total.textContent = res+p
    addInfo.textContent = addedBonus
    
  }
});
