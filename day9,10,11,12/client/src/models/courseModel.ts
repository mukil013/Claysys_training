export interface course {
  title: string,
  description: string,
  questions: question[]
}

export interface question {
  qno: number,
  question: string,
  options: string[],
  correctAnswer: string,
  markForTheQuestion: number
}

export function addCourse(course: course[]): void {
  localStorage.setItem("course-list", JSON.stringify(course));
}

export function viewCourse(): course[] {
  let courseList = localStorage.getItem("course-list");
  return courseList ? JSON.parse(courseList) : [];
}
