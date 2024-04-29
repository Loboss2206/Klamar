import { Injectable } from '@angular/core';
import IQuestion from "../interfaces/IQuestion";
import {questionsList} from "../mocks/questions";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  getQuestionById(id: string | null): IQuestion | undefined{
    return questionsList.find(question => question.id === id)
  }
}
