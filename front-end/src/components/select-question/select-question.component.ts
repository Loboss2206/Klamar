import {Component, OnInit} from '@angular/core';
import {QuizService} from "../../services/quiz-service.service";
import IQuestion from "../../interfaces/IQuestion";
import { Router } from '@angular/router';
import {NgForOf} from "@angular/common";
import {GenericButtonComponent} from "../genericButton/genericButton.component";
import {MaterialTableComponent} from "../material-table/material-table.component";

@Component({
  selector: 'app-select-question',
  standalone: true,
  imports: [
    NgForOf,
    GenericButtonComponent,
    MaterialTableComponent
  ],
  templateUrl: './select-question.component.html',
  styleUrl: './select-question.component.scss'
})
export class SelectQuestionComponent implements OnInit{
  questions: IQuestion[] = []; // Array to store the questions

  constructor(private _router: Router, private _quizService : QuizService) {
  }

  ngOnInit(): void {
    this.questions = this._quizService.getAllQuestions()
    console.log(this.questions)
  }
  createQuestion() {
    this._router.navigate(['/admin/createQuestion']);
  }

  editQuestion(question: IQuestion) {
    this._router.navigate(['/admin/createQuestion']);
  }

  deleteQuestion(question: IQuestion) {
    // Logic to delete a question
    const index = this.questions.indexOf(question);
    if (index !== -1) {
      this.questions.splice(index, 1);
    }
  }

  getHeaders() {
    return ["Intitulé"];
  }

  takeAction(question: IQuestion, action: string) {
    switch (action) {
      case "rowClick":
      case "Editer":
        this.editQuestion(question);
        break;
      case "Supprimer":
        this.deleteQuestion(question);
        break;
    }

  }

  getActions() {
    return [
      {name: "Editer", className: "edit"},
      {name: "Supprimer", className: "delete"}
    ];
  }

  questionsToDisplay() {
    let questionsToDisplay: any[] = [];
    for (let question of this.questions) {
      let questionToDisplay = {
        title: question.question,
        id: question.id,
      }
      questionsToDisplay.push(questionToDisplay);
    }
    return questionsToDisplay;
  }
}
