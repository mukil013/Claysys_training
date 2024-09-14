import { course, viewCourse } from "../../../models/courseModel"

let timer = document.querySelector(".timer") as HTMLParagraphElement
let time = 60

setInterval(() => {
  timer.textContent = `${(time--).toString()}s`
  if(time === 0) window.location.href = "../course_list/courseList.html"
},1000)

let currentQuiz = Number(sessionStorage.getItem("currentQuiz"))

let allCourse:course[] = viewCourse()

let ul = document.querySelector("body ul") as HTMLUListElement
let body = document.querySelector("body") as HTMLBodyElement

window.addEventListener('load' , () => {
  body.requestFullscreen()

  let userName = document.querySelector("#user-name") as HTMLHeadingElement
  let courseTitle =document.querySelector("#course-title") as HTMLHeadingElement
  let li = document.createElement('li')
  let content = ""
  let contentItems = {...allCourse[currentQuiz]}

  userName.textContent = sessionStorage.getItem("currentUser")
  courseTitle.textContent = contentItems.title.toString()

  console.log(contentItems)

  for(let i = 0; i < contentItems.questions.length; i++){
    if(i === 0){
      content += `<p>${contentItems.questions[i].question}</p>`
    }
      for(let j = 0; j < contentItems.questions[i].options.length; j++){
        content += `<label><input type="radio" name="options"/>${contentItems.questions[i].options[j]}</label>`
        
      }
  }
  li.innerHTML = content
  ul.appendChild(li)
})

