import { courseAttempt } from "./userModel";

export interface course {
  title: string,
  description: string,
  questions: question[]
  courseAttempt: courseAttempt[]
}

export interface question {
  qno: number,
  question: string,
  options: string[],
  correctAnswer: number,
  markForTheQuestion: number
}

export function addCourse(course: course[]): void {
  localStorage.setItem("course-list", JSON.stringify(course));
}

export function viewCourse(): course[] {
  let courseList = localStorage.getItem("course-list");
  return courseList ? JSON.parse(courseList) : [];
}
