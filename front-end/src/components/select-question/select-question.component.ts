import { Component, OnInit } from '@angular/core';
import { QuizService } from "../../services/quiz-service.service";
import IQuestion from "../../interfaces/IQuestion";
import { Router } from '@angular/router';
import { NgForOf } from "@angular/common";
import { GenericButtonComponent } from "../genericButton/genericButton.component";
import { MaterialTableComponent } from "../material-table/material-table.component";
import { QuestionService } from 'src/services/question.service';

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
export class SelectQuestionComponent implements OnInit {
  questions: IQuestion[] = []; // Array to store the questions
  private question: IQuestion | undefined;

  constructor(private _router: Router, private _questionService: QuestionService) {
  }

  ngOnInit(): void {
    this._questionService.questions$.subscribe((questions: IQuestion[]) => {
      this.questions = questions;
    });
    console.log(this.questions)
  }
  createQuestion() {
    this._router.navigate(['/admin/createQuestion']);
  }

  editQuestion(question: IQuestion | undefined) {
    this._router.navigate(['/admin/editQuestion/' + question?.id]);
  }

  deleteQuestion(question: IQuestion | undefined) {
    this._questionService.deleteQuestion(question as IQuestion);
  }

  getHeaders() {
    return ["Intitulé"];
  }

  takeAction(id: number, action: string) {
    this.question = this.questions.find(question => question.id === id);
    switch (action) {
      case "rowClick":
      case "Editer":
        this.editQuestion(this.question);
        break;
      case "Supprimer":
        this.deleteQuestion(this.question);
        break;
    }

  }

  getActions() {
    return [
      { name: "Editer", className: "edit" },
      { name: "Supprimer", className: "delete" }
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
