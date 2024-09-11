export interface users {
  email: string;
  password: string;
}


export function setUser(user: users[]): void {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUser(): users[] {
  let userData = localStorage.getItem('user')
  return userData? JSON.parse(userData) :  [];
}

export function deleteUser(user: string ): void{
  localStorage.removeItem(user)
}