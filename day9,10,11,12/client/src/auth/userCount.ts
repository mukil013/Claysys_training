export function userLogIn(user:boolean){
  let counter:number = 0
  if(user){
    counter++
  }else{
    counter--
  }
  return counter
}