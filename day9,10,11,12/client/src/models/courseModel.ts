export interface course{
  title: string,
  description: string,
  questions: [
    qno: number,
    question: string,
    options: string[],
    correctAnswer: number,
    marks: number
  ],
  userHistory: string[],
  userLeaderBoard: string[]
}

export function addCourse(course: course[]): void{
  localStorage.setItem('course-list' , JSON.stringify(course))
} 

export function viewCourse():course[]{
  let courseList = localStorage.getItem('course-list')
  return courseList ? JSON.parse(courseList) : []
}