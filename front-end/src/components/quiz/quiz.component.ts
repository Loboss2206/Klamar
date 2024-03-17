import {Component} from '@angular/core';
import {QuestionComponent} from "../question/question.component";
import {NgForOf, NgIf} from "@angular/common";
import {QuizService} from "../../services/quiz-service.service";
import IQuestion from "../../interfaces/IQuestion";
import {FelicidadComponent} from "../felicidad/felicidad.component";

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    QuestionComponent,
    NgForOf,
    FelicidadComponent,
    NgIf
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  currentQuestion: IQuestion;

  constructor(protected quizService: QuizService) {
    this.currentQuestion = this.quizService.getCurrentQuestion();
  }

  nextQuestion() {
    this.currentQuestion = this.quizService.getNextQuestion();
  }

  renewCurrentQuestion(): void {
    this.currentQuestion= this.quizService.getCurrentQuestion();
  }

  isGameFinish(): boolean {
    return this.quizService.isLastQuestion() && this.quizService.getIsFinished;
  }
}
