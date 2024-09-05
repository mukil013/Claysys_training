let btns = document.querySelectorAll(".operations ul li button"), display = document.querySelector(".display") as HTMLDivElement, first = true

btns.forEach(i => {
  i.addEventListener("click" , () => {
    if(first){
      display.textContent = ""
      first = false
    }
    if(i.textContent === "="){ 
      let result = Number(eval(display.textContent!))
      if(!isFinite(result) || display.textContent === "0"){ 
        alert("Enter a vaild number") 
        display.textContent = "0"
        first = true
      }
      else display.textContent = String(result)
    }
    else if(i.textContent === 'C'){
      display.textContent = "0"
      first = true
    }
    else display.textContent! += i.textContent    
  })
})

