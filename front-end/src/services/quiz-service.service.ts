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
      tips: ['La ville de l\'amour', 'La ville lumière'],
      AreResponsesImages: false,
      responses: ['Paris', 'Londres', 'New York', 'Berlin'],
      answer: 'Paris'
    }, {
      question: 'Quelle est la capitale de l\'Allemagne ?',
      tips: ['Elle a un mur célèbre', 'Elle n\'est pas Munich'],
      AreResponsesImages: true,
      responses: ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/280px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/London_Montage_L.jpg/280px-London_Montage_L.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Lower_Manhattan_skyline_-_June_2017.jpg/280px-Lower_Manhattan_skyline_-_June_2017.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Cityscape_Berlin.jpg/400px-Cityscape_Berlin.jpg'],
      answer: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Cityscape_Berlin.jpg/400px-Cityscape_Berlin.jpg'
    }, {
      question: 'Quelle est la capitale du Royaume-Uni ?',
      questionImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/London_Montage_L.jpg/280px-London_Montage_L.jpg',
      tips: ['Elle a un grand ben', 'Elle n\'est pas Manchester'],
      AreResponsesImages: false,
      responses: ['Paris', 'Londres', 'New York', 'Berlin'],
      answer: 'Londres'
    }, {
      question: 'Quelle est la capitale des États-Unis ?',
      questionImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Usa_edcp_%28%2BHI_%2BAK%29_relief_location_map.png/280px-Usa_edcp_%28%2BHI_%2BAK%29_relief_location_map.png",
      tips: ['Elle a une grande pomme', 'Elle n\'est pas Los Angeles'],
      AreResponsesImages: true,
      responses: ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/280px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/London_Montage_L.jpg/280px-London_Montage_L.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/White_House_lawn_%28long_tightly_cropped%29.jpg/280px-White_House_lawn_%28long_tightly_cropped%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Cityscape_Berlin.jpg/400px-Cityscape_Berlin.jpg'],
      answer: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/White_House_lawn_%28long_tightly_cropped%29.jpg/280px-White_House_lawn_%28long_tightly_cropped%29.jpg'
    }, {
      question: 'Quel est le plus grand désert du monde ?',
      tips: ['Il est en Afrique', 'Il n\'est pas le Gobi'],
      AreResponsesImages: false,
      responses: ['Sahara', 'Gobi', 'Kalahari', 'Arctique'],
      answer: 'Sahara'
    }, {
      question: 'Quel est le plus long fleuve du monde ?',
      tips: ['Il est en Amérique du Sud', 'Il n\'est pas le Nil'],
      AreResponsesImages: false,
      responses: ['Le Nil', 'L\'Amazone', 'Le Yangtsé', 'Le Mississippi'],
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

  get getTips(): string[] {
    return this.getCurrentQuestion().tips;
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
