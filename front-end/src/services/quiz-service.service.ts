import { Injectable } from '@angular/core';
import IQuestion from "../interfaces/IQuestion";
import IQuiz from "../interfaces/IQuiz";
import { questionsList } from "../mocks/questions";
import { BehaviorSubject, map, Observable, of } from "rxjs";
import { Router } from "@angular/router";
import ISimonConfig from "../interfaces/ISimonConfig";
import { ImageBank } from "../mocks/ImageBank";
import { HttpClient } from "@angular/common/http";
import { serverUrl } from "../configs/server.config";
import { QuestionService } from './question.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private tagsList: string[] = ['geo', 'actor', 'music', 'sport'];

  getTags(): string[] {
    return this.tagsList;
  }

  private currentQuestionSubject: BehaviorSubject<IQuestion> = new BehaviorSubject<IQuestion>({} as IQuestion);
  private currentQuestionIndex: number = JSON.parse(sessionStorage.getItem('currentQuestionIndex') || '0');
  private waitingTimeBeforeNextQuestion: number = 1000;
  private currentQuiz: number = JSON.parse(sessionStorage.getItem('currentQuiz') || '0');

  private quizzes: BehaviorSubject<IQuiz[]> = new BehaviorSubject<IQuiz[]>([] as IQuiz[]);
  private questions: IQuestion[] = questionsList;
  private SimonGameMode: boolean = false;
  private MemoryGameMode: boolean = false;
  private isInQuestionMode: boolean = true;

  private currentQuizSubject: BehaviorSubject<IQuiz> = new BehaviorSubject<IQuiz>({} as IQuiz);

  getQuestionsPickListData(): Observable<{ allQuestions: IQuestion[], existingQuizQuestions: IQuestion[]; }> {
    return this.questionService.questions$.pipe(
      map((questions: IQuestion[]) => {
        const allQuestions = questions;
        const existingQuizQuestions = this.getQuestionsForQuiz(this.currentQuiz);
        return { allQuestions, existingQuizQuestions };
      })
    );
  }

  getImagesPickListData(): Observable<{ allImages: string[], imageAlreadyOnTheMemory: string[]; }> {
    const allImages = ImageBank;
    const imageAlreadyOnTheMemory = this.getPicsMemory();
    return of({ allImages, imageAlreadyOnTheMemory });
  }

  constructor(private router: Router, private http: HttpClient, private questionService: QuestionService) {
    this.refreshQuizzes();
  }

  getQuizzesObservable(): Observable<IQuiz[]> {
    return this.quizzes.asObservable();
  }

  getPicsMemory(): string[] {
    return this.getTheQuiz(this.currentQuiz).picsMemory || [];
  }

  getTheQuiz(id: number) {
    let quiz: IQuiz | undefined = this.quizzes.value.find((quiz) => quiz.id === id);
    if (!quiz) {
      console.error('Quiz not found');
      return {
        title: '',
        quizDescription: '',
        questions: [],
        specials: [],
        imageUrl: 'https://placehold.co/400',
        id: 0
      } as IQuiz;
    }
    return quiz;
  }

  setQuiz(id: number) {
    this.setCurrentQuiz(id);
    this.currentQuizSubject.next(this.getTheQuiz(id));
  }

  getCurrentQuiz(): Observable<IQuiz> {
    return this.currentQuizSubject.asObservable();
  }

  get getWaitingTimeBeforeNextQuestion(): number {
    return this.waitingTimeBeforeNextQuestion;
  }

  getQuestions(): IQuestion[] {
    return this.questionService.getQuestions().filter((question) => this.getTheQuiz(this.currentQuiz).questions.includes(question.id));
  }

  getAllQuestions(): IQuestion[] {
    return this.questions;
  }

  get getTips(): string[][] {
    return this.getTheQuiz(this.currentQuiz).questions.map((questionId) => {
      let question: IQuestion | undefined = this.questions.find((question) => question.id === questionId);
      if (!question) {
        throw new Error('Question not found');
      }
      return question.tips;
    });
  }

  getCurrentQuestion(): Observable<IQuestion> {
    return this.currentQuestionSubject.asObservable();
  }

  updateCurrentQuestion(question: IQuestion) {
    this.currentQuestionSubject.next(question);
  }

  checkAnswer(answer: string): boolean {
    return this.getQuestions()[this.currentQuestionIndex].answer === answer;
  }

  getQuestionIndex(): number {
    return this.currentQuestionIndex;
  }

  getQuestionsLength() {
    return this.getQuestions().length;
  }

  getQuestion(id: number): IQuestion {
    return this.getAllQuestions().find((question) => question.id === id) || {} as IQuestion;
  }

  restartQuiz() {
    this.setCurrentQuestionIndex(0);
    this.isInQuestionMode = true;
    this.SimonGameMode = false;
    this.MemoryGameMode = false;
  }

  setCurrentQuestionIndex(index: number) {
    this.currentQuestionIndex = index;
    sessionStorage.setItem('currentQuestionIndex', JSON.stringify(index));
  }

  setCurrentQuiz(id: number) {
    this.currentQuiz = id;
    sessionStorage.setItem('currentQuiz', JSON.stringify(id));
    sessionStorage.setItem('currentQuestionIndex', JSON.stringify(0));
  }

  isLastQuestion(): boolean {
    return this.getQuestionIndex() === this.getQuestionsLength() - 1;
  }

  refreshQuizzes() {
    this.http.get<IQuiz[]>(serverUrl + "/quizzes").subscribe((quizzes) => {
      this.quizzes.next(quizzes);
    });
  }

  nextQuestion() {
    this.setCurrentQuestionIndex(this.currentQuestionIndex + 1);
    this.updateCurrentQuestion(this.getQuestions()[this.currentQuestionIndex]);
  }

  init() {
    this.updateCurrentQuestion(this.getQuestions()[this.currentQuestionIndex]);
  }

  getSimonRules(): ISimonConfig | undefined {
    return this.getTheQuiz(this.currentQuiz).specials.find((special) => special.name === 'Simon')?.rulesForSimon;
  }

  /*
  getMemoryRules() {
    return this.getTheQuiz(this.currentQuiz).specials.find((special) => special.name === 'Memory')?.rules;
  }
  */

  questionsFinished() {
    this.isInQuestionMode = false;
    let specials = this.getTheQuiz(this.currentQuiz).specials.map((special) => special.name);
    let sortedSpecials = specials.sort();

    console.log(sortedSpecials);

    if (sortedSpecials.length === 2 && sortedSpecials[0] === 'Memory' && sortedSpecials[1] === 'Simon') {
      this.SimonGameMode = true;
      this.MemoryGameMode = true;
      this.router.navigate(['simon/']);
    } else if (sortedSpecials.includes('Simon')) {
      this.SimonGameMode = true;
      this.router.navigate(['simon/']);
    } else if (sortedSpecials.includes('Memory')) {
      this.MemoryGameMode = true;
      this.router.navigate(['memory/']);
    } else {
      this.router.navigate(['felicitations/']);
    }
  }

  endSimonGame() {
    this.SimonGameMode = false;
    if (this.MemoryGameMode) {
      this.router.navigate(['memory/']);
    } else {
      this.router.navigate(['felicitations/']);
    }
  }

  endMemoryGame() {
    this.MemoryGameMode = false;
    this.router.navigate(['felicitations/']);
  }

  searchQuizzes(searchTerm: string) {
    this.quizzes.next(this.quizzes.value.filter((quiz) => quiz.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }

  deleteQuiz(quizId: number) {
    this.http.delete(serverUrl + "/quizzes/" + quizId).subscribe(res => {
      this.refreshQuizzes();
    });
  }

  createQuiz(quiz: IQuiz) {
    this.http.post(serverUrl + "/quizzes", quiz).subscribe(res => {
      this.refreshQuizzes();
    });
  }

  saveQuiz(quizId: number, quiz: IQuiz) {
    this.http.put(serverUrl + "/quizzes/" + quizId, quiz).subscribe(res => {
      this.refreshQuizzes();
    });

  }

  getQuestionsForQuiz(quizId: number) {
    return this.getTheQuiz(quizId).questions.map((questionId) => {
      let question: IQuestion | undefined = this.questionService.getQuestions().find((question) => question.id === questionId);
      if (!question) {
        console.error('It seems that a question is missing from the Database, have you deleted it?');
        return {
          id: 0,
          question: 'Oups, la question n\'a pas été trouvée l\'avez vous supprimée ?',
          answer: 'Answer not found',
          tips: ['Tip not found']
        } as IQuestion;
      }
      return question;
    });

  }
}
