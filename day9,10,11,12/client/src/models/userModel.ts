export interface users {
  name: string,
  email: string;
  password: string;
  courseAttempt: courseAttempt[]
}

export interface courseAttempt{
  validated: boolean,
  userName: users["name"],
  email: users["email"],
  name : string,
  mark: number,
  breif?: breif,
}

export interface breif{
  qno: number,
  question: string,
  answer: string
}

export function setUser(user: users[]): void {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUser(): users[] {
  let userData = localStorage.getItem('user')
  return userData? JSON.parse(userData) : [];
}