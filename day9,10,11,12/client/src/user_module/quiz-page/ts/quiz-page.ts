let timer = document.querySelector(".timer") as HTMLParagraphElement
let time = 60

setInterval(() => {
  timer.textContent = (time--).toString()
  if(time === 0) window.location.href = "/src/user_module/course_list/courseList.html"
},1000)