import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ButtonComponent } from "../quizButton/button.component";
import { NgClass, NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { QuizService } from "../../services/quiz-service.service";
import IQuestion from "../../interfaces/IQuestion";
import { TipsComponent } from "../tips/tips.component";
import { GenericButtonComponent } from '../genericButton/genericButton.component';
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import * as Tone from "tone";
import IUser from "../../interfaces/IUser";
import { UserService } from "../../services/user-service.service";

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    ButtonComponent,
    NgForOf,
    NgClass,
    NgOptimizedImage,
    NgIf,
    TipsComponent,
    GenericButtonComponent
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnInit, AfterViewInit {

  @ViewChild('tipsComponent') tipsComponent!: TipsComponent;

  question: Observable<IQuestion> | undefined;
  questionText: string | undefined;
  answers: any;
  correctAnswer: any = null;
  wrongAnswers: any = [];
  blockUI: boolean = false;
  tips: string[] = [];
  questionImage: string | undefined = '';
  areResponsesImages: boolean = false;
  user: IUser | null = this.userService.getCurrentUser();
  canOpenTipsOnClick: boolean = this.user ? this.user.config.quiz.showHintAfterClick : false;
  currentTipIndex: number = this.user ? this.user.config.quiz.showHintOneByOne ? 0 : -1 : -1;

  constructor(private quizService: QuizService, private router: Router, private userService: UserService) {

  }

  ngOnInit() {
    this.question = this.quizService.getCurrentQuestion();
    this.question.subscribe((question: IQuestion) => {
      console.log(this.question);
      this.answers = question.responses;
      this.questionText = question.question;
      this.currentTipIndex = this.user ? this.user.config.quiz.showHintOneByOne ? 0 : -1 : -1;
      this.tips = question.tips;
      this.questionImage = question.questionImage;
      this.areResponsesImages = question.AreResponsesImages;
      this.correctAnswer = null;
      this.wrongAnswers = [];
      this.setBlockUI(false);
      if (this.user && this.user.config.quiz.showHintAfterStart) {
        this.tipsComponent.openATip();
      }
    });
  }

  ngAfterViewInit() {
    if (this.user && this.user.config.quiz.showHintAfterStart) {
      this.tipsComponent.openATip();
    }
  }

  playCorrectTune() {
    const synth = new Tone.Synth({
      oscillator: {
        type: "sine"
      }
    }).toDestination();
    synth.triggerAttackRelease("A4", "16n");
  }

  playWrongTune() {
    const synth = new Tone.Synth({
      oscillator: {
        type: "sine"
      }
    }).toDestination();
    synth.triggerAttackRelease("C4", "16n");
  }

  incrementIndex() {
    if (this.currentTipIndex > -1 && this.currentTipIndex < this.tips.length - 1) {
      this.currentTipIndex++;
    }
  }

  onAnswer(answer: string) {
    if (this.quizService.checkAnswer(answer)) {
      this.playCorrectTune();
      this.correctAnswer = answer;
      this.setBlockUI(true);
      setTimeout(() => {
        if (this.quizService.isLastQuestion()) {
          this.quizService.questionsFinished();
          return;
        }
        this.quizService.nextQuestion();
      }, this.quizService.getWaitingTimeBeforeNextQuestion);
    } else {
      this.playWrongTune();
      if (this.user && this.user.config.quiz.showHintAfterError) {
        if (this.currentTipIndex > -1 && this.currentTipIndex < this.tips.length - 1) {
          this.currentTipIndex++;
        }
        this.tipsComponent.openATip();
      }
      this.wrongAnswers.push(answer);
    }
  }

  goToHowToPlay() {
    this.router.navigate(['howToPlayQuestion/']);
  }

  private setBlockUI(blocked: boolean) {
    this.blockUI = blocked;
  }
}
