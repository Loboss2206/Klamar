import {Injectable} from '@angular/core';
import IQuestion from "../interfaces/IQuestion";
import IQuiz from "../interfaces/IQuiz";
import { quizzes } from "../mocks/quizzes";
import { questionsList } from "../mocks/questions";
import { BehaviorSubject, Observable } from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private tagsList: string[] = ['geo', 'actor', 'music', 'sport'];

  getTags(): string[] {
    return this.tagsList;
  }

  private currentQuestionSubject: BehaviorSubject<IQuestion> = new BehaviorSubject<IQuestion>({} as IQuestion);
  private currentQuestionIndex: number = 0;
  private waitingTimeBeforeNextQuestion: number = 1500;
  private currentQuiz: number = 0;

  private quizzes: IQuiz[] = quizzes;
  private questions: IQuestion[] = questionsList;
  private SimonGameMode: boolean = false;
  private MemoryGameMode: boolean = false;
  private isInQuestionMode: boolean = true;

  constructor(private router: Router) {
  }

  getTheQuiz(id: number) {
    let quiz: IQuiz | undefined = this.quizzes.find((quiz) => quiz.quizId === id);
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    return quiz;
  }

  setQuiz(id: number) {
    this.setCurrentQuiz(id);
  }

  get getWaitingTimeBeforeNextQuestion(): number {
    return this.waitingTimeBeforeNextQuestion;
  }

  getQuestions(): IQuestion[] {
    return this.questions.filter((question) => this.getTheQuiz(this.currentQuiz).questions.includes(parseInt(question.id)));
  }

  get getTips(): string[][] {
    return this.getTheQuiz(this.currentQuiz).questions.map((questionId) => {
      let question: IQuestion | undefined = this.questions.find((question) => parseInt(question.id) === questionId);
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

  getQuizzes(): IQuiz[] {
    return this.quizzes;
  }

  nextQuestion() {
    this.setCurrentQuestionIndex(this.currentQuestionIndex + 1);
    this.updateCurrentQuestion(this.getQuestions()[this.currentQuestionIndex]);
  }

  init() {
    this.updateCurrentQuestion(this.getQuestions()[this.currentQuestionIndex]);
  }

  getSimonRules() {
    return this.getTheQuiz(this.currentQuiz).specials.find((special) => special.name === 'Simon')?.rules;
  }

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
}
