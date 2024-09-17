export interface users {
  email: string;
  password: string;
  courseAttempt: courseAttempt[]
}

export interface courseAttempt{
  user: string,
  name : string,
  mark: number
}

export function setUser(user: users[]): void {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUser(): users[] {
  let userData = localStorage.getItem('user')
  return userData? JSON.parse(userData) : [];
}