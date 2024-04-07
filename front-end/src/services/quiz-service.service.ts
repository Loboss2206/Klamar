import { Injectable } from '@angular/core';
import IQuestion from "../interfaces/IQuestion";
import IQuiz from "../interfaces/IQuiz";
import { quizzes } from "../mocks/quizzes";
import { questionsList } from "../mocks/questions";
import { BehaviorSubject, Observable } from "rxjs";

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

  getTheQuiz(id: number) {
    this.currentQuiz = id;
    let quiz: IQuiz | undefined = this.quizzes.find((quiz) => quiz.quizId === id);
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    return quiz;
  }

  setQuiz(id: number) {
    this.currentQuiz = id;
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
    this.currentQuestionIndex = 0;
  }

  isLastQuestion(): boolean {
    return this.getQuestionIndex() === this.getQuestionsLength() - 1;
  }

  getQuizzes(): IQuiz[] {
    return this.quizzes;
  }

  nextQuestion() {
    this.updateCurrentQuestion(this.getQuestions()[++this.currentQuestionIndex]);
  }

  init() {
    this.currentQuestionIndex = 0;
    this.updateCurrentQuestion(this.getQuestions()[this.currentQuestionIndex]);
  }
}
