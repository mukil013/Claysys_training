import { courseAttempt } from "./userModel";

export interface course {
  title: string,
  description: string,
  questionType: string,
  booleanQues: boolQue[],
  questions: question[],
  courseAttempt: courseAttempt[]
}

export interface boolQue{
  qno: number,
  question: string,
  correctAnswer: string,
  markForTheQuestion: number
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
