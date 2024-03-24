import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../quizButton/button.component";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {QuizService} from "../../services/quiz-service.service";
import IQuestion from "../../interfaces/IQuestion";
import {TipsComponent} from "../tips/tips.component";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

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
export class QuestionComponent implements OnInit{

  question: Observable<IQuestion> | undefined;
  questionText: string | undefined;
  answers: any;
  correctAnswer: any = null;
  wrongAnswers: any = [];
  blockUI: boolean = false;
  tips: string[] = [];
  questionImage: string | undefined = '';
  areResponsesImages: boolean = false;


  constructor(private quizService: QuizService, private router: Router) {

  }

  ngOnInit() {
    this.question = this.quizService.getCurrentQuestion();
    this.question.subscribe((question: IQuestion) => {
      console.log(this.question);
      this.answers = question.responses;
      this.questionText = question.question;
      this.tips = question.tips;
      this.questionImage = question.questionImage;
      this.areResponsesImages = question.AreResponsesImages;
      this.correctAnswer = null;
      this.wrongAnswers = [];
      this.setBlockUI(false);
    });
  }

  onAnswer(answer: string) {
    if (this.quizService.checkAnswer(answer)) {
      this.correctAnswer = answer;
      this.setBlockUI(true);
      setTimeout(() => {
        if (this.quizService.isLastQuestion()) {
          this.router.navigate(['/felicitations']);
        }
        this.quizService.nextQuestion();
      }, this.quizService.getWaitingTimeBeforeNextQuestion);
    } else {
      this.wrongAnswers.push(answer);
    }
  }

  private setBlockUI(blocked : boolean) {
    this.blockUI = blocked;
  }
}
