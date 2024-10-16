export interface quiz{
  quizName: string,
  quizDes: string
  questions: questions[]
}

export interface questions{
  qno: number,
  type: string,
  question: string,
  mark: number
}

export interface mcq{
  qno: number,
  totalOption: string,
  correctAnswer: number
}

export interface trueFalse{
  qno: number,
  correctAnswer : number
}

export interface breif{
  qno: number,
  userRes: string
}