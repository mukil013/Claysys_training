import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { breif, mcq, questions, quiz, trueFalse } from '../../../models/quiz'

@Component({
  selector: 'app-add-edit-quiz',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-quiz.component.html',
  styleUrl: './add-edit-quiz.component.css'
})

export class AddEditQuizComponent {

  addQuiz: FormGroup;
  addQues: FormGroup;

  qno = 1

  questions : questions = {
    qno : -1,
    question : '',
    type : '',
    mark : -1,
  }

  mcq : mcq = {
    qno : -1,
    totalOption : '',
    correctAnswer : -1
  }

  bool : trueFalse = {
    qno : -1,
    correctAnswer : -1
  }

  breif : breif = {
    qno : -1,
    userRes : ''
  }
  
  TempQuiz : quiz = {
    quizName : '',
    quizDes : '' ,
    questions : [this.questions]
  }

  listForQuiz: quiz[] = []

  constructor( private fb: FormBuilder){

    this.addQuiz = this.fb.group({
      quizTitle: ['' , Validators.required],
      quizDes: ['' , Validators.maxLength(100)]
    })

    this.addQues = this.fb.group({
      qno: [''],
      question: ['' , Validators.required , Validators.maxLength(100)],
      questionType: ['', Validators.required],
      mark: ['' , Validators.required],
    })
  }

  

  open(){
    (document.querySelector("#add-quiz-form") as HTMLDialogElement).showModal()
  }
  close(){
    (document.querySelector("#add-quiz-form") as HTMLDialogElement).close()
    this.flag = (this.flag) ? false : true;
  }
  flag = false;
  submitQuiz(){
    this.flag = (this.flag) ? false : true;
    alert(this.addQuiz.get('quizTitle'))
  }
}
