import { Injectable } from '@angular/core';
import IQuestion from "../interfaces/IQuestion";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private tagsList: string[] = ['geo', 'actor', 'music', 'sport'];
  private questionList: IQuestion[] = [
    {
      question: 'Quelle est la capitale de la France ?',
      options: ['Paris', 'Londres', 'New York', 'Berlin'],
      answer: 'Paris'
    }, {
      question: 'Quelle est la capitale de l\'Allemagne ?',
      options: ['Paris', 'Londres', 'New York', 'Berlin'],
      answer: 'Berlin'
    }, {
      question: 'Quelle est la capitale du Royaume-Uni ?',
      options: ['Paris', 'Londres', 'New York', 'Berlin'],
      answer: 'Londres'
    }, {
      question: 'Quelle est la capitale des États-Unis ?',
      options: ['Paris', 'Londres', 'New York', 'Berlin'],
      answer: 'New York'
    }, {
      question: 'Quel est le plus grand désert du monde ?',
      options: ['Sahara', 'Gobi', 'Kalahari', 'Arctique'],
      answer: 'Sahara'
    }, {
      question: 'Quel est le plus long fleuve du monde ?',
      options: ['Le Nil', 'L\'Amazone', 'Le Yangtsé', 'Le Mississippi'],
      answer: 'L\'Amazone'
    }
  ];

  getTags(): string[] {
    return this.tagsList;
  }

  private currentQuestionIndex: number = 0;
  private waitingTimeBeforeNextQuestion: number = 1500;
  private isFinished: boolean = false;

  get getWaitingTimeBeforeNextQuestion(): number {
    return this.waitingTimeBeforeNextQuestion;
  }

  getQuestions(): IQuestion[] {
    return this.questionList;
  }

  getCurrentQuestion(): IQuestion {
    return this.questionList[this.currentQuestionIndex];
  }

  getNextQuestion(): IQuestion {
    if (this.currentQuestionIndex === this.questionList.length - 1) {
      return this.getCurrentQuestion();
    }
    this.currentQuestionIndex++;
    return this.getCurrentQuestion();
  }

  checkAnswer(answer: string): boolean {
    return this.getCurrentQuestion().answer === answer;
  }

  getQuestionIndex(): number {
    return this.currentQuestionIndex;
  }

  getQuestionsLength() {
    return this.questionList.length;
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.isFinished = false;
  }

  isLastQuestion(): boolean {
    return this.getQuestionIndex() === this.getQuestionsLength() - 1;
  }

  get getIsFinished(): boolean {
    return this.isFinished;
  }

  finish() {
    this.isFinished = true;
  }
}
