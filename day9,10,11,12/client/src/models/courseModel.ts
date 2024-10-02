import { courseAttempt } from "./userModel";

export interface course {
  title: string,
  description: string,
  questions: question[],
  courseAttempt: courseAttempt[]
}

export interface question {
  validated: boolean,
  qno: number,
  questionType: string,
  breif?: breif,
  question: string,
  options: string[],
  correctAnswer: number,
  markForTheQuestion: number
}

export interface breif{
  qno: number,
  qustion: string,
  answer: string
}

export function addCourse(course: course[]): void {
  localStorage.setItem("course-list", JSON.stringify(course));
}

export function viewCourse(): course[] {
  let courseList = localStorage.getItem("course-list");
  return courseList ? JSON.parse(courseList) : [];
}
