import { users } from "./userModel";

export interface course {
  title: string,
  description: string,
  questions: question[],
  userTaken: userTaken | null
}

export interface question {
  qno: number,
  question: string,
  options: string[],
  correctAnswer: string,
  markForTheQuestion: number
}

interface userTaken{
  name: users,
  scoreBoard: users
}

export function addCourse(course: course[]): void {
  localStorage.setItem("course-list", JSON.stringify(course));
}

export function viewCourse(): course[] {
  let courseList = localStorage.getItem("course-list");
  return courseList ? JSON.parse(courseList) : [];
}
