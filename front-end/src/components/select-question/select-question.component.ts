import { Component } from '@angular/core';
import {QuizService} from "../../services/quiz-service.service";
import IQuestion from "../../interfaces/IQuestion";
import { Router } from '@angular/router';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-select-question',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './select-question.component.html',
  styleUrl: './select-question.component.scss'
})
export class SelectQuestionComponent {
  questions: IQuestion[] = []; // Array to store the questions

  constructor(private _router: Router, private _quizService : QuizService) {
  }

  ngOnInit(): void {
    this.questions = this._quizService.getAllQuestions()
    console.log(this.questions)
  }
  createQuestion() {
    this._router.navigate(['/createQuestion']);
  }

  editQuestion(question: IQuestion) {
    this._router.navigate(['/createQuestion']);
  }

  deleteQuestion(question: IQuestion) {
    // Logic to delete a question
    const index = this.questions.indexOf(question);
    if (index !== -1) {
      this.questions.splice(index, 1);
    }
  }
}
