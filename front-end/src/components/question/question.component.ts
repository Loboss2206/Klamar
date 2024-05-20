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
import IQuestionStat from "../../interfaces/IQuestionStat";
import {StatsService} from "../../services/stats.service";

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
  idQuestion ?: string
  startTime: number = 0;
  answerIndex : number[] = []
  maxPointQuestion : number = 1

  constructor(private quizService: QuizService, private router: Router, private userService: UserService, private statsService : StatsService) {

  }
  ngOnInit() {
    this.question = this.quizService.getCurrentQuestion();
    this.startTime = Date.now();
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
      this.idQuestion = question.id;
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
    this.answerIndex
    if (this.quizService.checkAnswer(answer)) {
      let answerIndex = this.answers.findIndex((ans: any) => ans === answer);
      const questionStat: IQuestionStat = {
        idQuestion: Number(this.idQuestion),
        pointQuestion: this.pointOnQuestion(),
        maxPointQuestion: this.maxPointQuestion,
        erreurQuiz: this.wrongAnswers.length,
        indicesQuiz: this.currentTipIndex + 1,
        tempsQuiz: this.getTimeSpentOnQuestion(),
        reponseId: [answerIndex]
      };
      console.log("questionStat" + questionStat)
      console.log(questionStat.idQuestion)
      console.log(questionStat.pointQuestion)
      console.log(questionStat.maxPointQuestion)
      console.log(questionStat.erreurQuiz)
      console.log(questionStat.indicesQuiz)
      console.log(questionStat.tempsQuiz)
      console.log(questionStat.reponseId)

      this.statsService.addQuestionStat(questionStat);
      this.playCorrectTune();
      this.hideAllOtherAnswers(answer);
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

  private hideAllOtherAnswers(answer: string) {
    document.querySelectorAll('app-quizButton').forEach((element: any) => {
      let isImage = false;
      if (element && element.children[0] && element.children[0].children[0] && element.children[0].children[0].children[0]) {
        isImage = element.children[0].children[0].children[0].src !== undefined;
      }
      if ((isImage && element.children[0].children[0].children[0].src === answer)) {
        element.children[0].style.backgroundColor = 'transparent !important';
      }
      if ((!isImage && element.innerText !== answer) || (isImage && element.children[0].children[0].children[0].src !== answer)) {
        element.style.display = 'none';
      }
    });
  }
  private getTimeSpentOnQuestion(): number {
    const currentTime = Date.now();
    return Number(((currentTime - this.startTime) / 1000).toFixed(1));
  }

  private pointOnQuestion() : number{
    let point : number = this.maxPointQuestion - (this.wrongAnswers.length/3)
    point = Number(point.toFixed(2))
    if (point > 0){
      return point
    }
    return 0;
  }
}
