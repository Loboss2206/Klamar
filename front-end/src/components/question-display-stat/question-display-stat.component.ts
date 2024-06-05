import { Component, OnInit, Input } from '@angular/core';
import { ButtonComponent } from '../quizButton/button.component';
import { NgClass, NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { QuizService } from "../../services/quiz-service.service";
import IQuestion from "../../interfaces/IQuestion";
import { TipsComponent } from "../tips/tips.component";
import { Router } from "@angular/router";
import { QuestionService } from 'src/services/question.service';

@Component({
  selector: 'app-question-display-stat',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgOptimizedImage,
    NgIf,
    TipsComponent,
    ButtonComponent
  ],
  templateUrl: './question-display-stat.component.html',
  styleUrl: './question-display-stat.component.scss'
})

export class QuestionDisplayStat implements OnInit {
  @Input() questionId: number | undefined;
  question: IQuestion | undefined;
  questionText: string | undefined;
  answers: any;
  correctAnswer: any = null;
  wrongAnswers: any = [];
  questionImage: string | undefined = '';
  areResponsesImages: boolean | undefined = false;
  answerIndex: number[] = [];

  constructor(private questionService: QuestionService, private router: Router) { }

  ngOnInit() {
    console.log("idQuestion: " + this.questionId);

    this.questionService.questions$.subscribe((questions: IQuestion[]) => {
      this.question = this.questionService.getQuestionById(this.questionId);
      console.log(this.question);
      this.answers = this.question?.responses;
      this.questionText = this.question?.question;
      this.questionImage = this.question?.questionImage;
      this.areResponsesImages = this.question?.AreResponsesImages;
      this.correctAnswer = null;
      this.wrongAnswers = [];
    });
  }
}
