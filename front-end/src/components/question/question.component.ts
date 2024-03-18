import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ButtonComponent} from "../quizButton/button.component";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {QuizService} from "../../services/quiz-service.service";
import IQuestion from "../../interfaces/IQuestion";
import {TipsComponent} from "../tips/tips.component";

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    ButtonComponent,
    NgForOf,
    NgClass,
    NgOptimizedImage,
    NgIf,
    TipsComponent
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnChanges {
  @Input() question!: IQuestion;

  @Output() nextQuestion: EventEmitter<void> = new EventEmitter<void>();

  questionText: string | undefined;
  answers: any;
  correctAnswer: any = null;
  wrongAnswers: any = [];
  blockUI: boolean = false;

  constructor(private quizService: QuizService) {

  }

  ngOnInit() {
    this.updateQuestion();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['question']) {
      this.updateQuestion();
    }
  }

  updateQuestion() {
    this.answers = this.question.responses;
    this.questionText = this.question.question;
    this.correctAnswer = null;
    this.wrongAnswers = [];
    this.setBlockUI(false);
  }

  onAnswer(answer: string) {
    if (this.quizService.checkAnswer(answer)) {
      this.correctAnswer = answer;
      this.setBlockUI(true);
      setTimeout(() => {
        if (this.quizService.isLastQuestion()) {
          this.quizService.finish();
        }
        this.nextQuestion.emit();
      }, this.quizService.getWaitingTimeBeforeNextQuestion);
    } else {
      this.wrongAnswers.push(answer);
    }
  }

  private setBlockUI(blocked : boolean) {
    this.blockUI = blocked;
  }
}
