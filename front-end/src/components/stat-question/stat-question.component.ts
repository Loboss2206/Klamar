import { Component, Input } from '@angular/core';
import { QuizService } from "../../services/quiz-service.service";
import IQuestion from 'src/interfaces/IQuestion';
import { NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-stat-question',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './stat-question.component.html',
  styleUrl: './stat-question.component.scss'
})
export class StatQuestionComponent {

  @Input() erreur?: number
  @Input() indices?: number
  @Input() temps?: number
  @Input() questionId?: number

  question: IQuestion | undefined

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    if (this.questionId) {
      this.question = this.quizService.getQuestion(this.questionId);
    }
    console.log("idQuestion: " + this.question?.tips);
  }
}
