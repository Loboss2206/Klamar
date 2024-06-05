import { Component, Input, OnInit } from '@angular/core';
import { StatQuestionComponent } from "../stat-question/stat-question.component";
import { QuestionComponent } from "../question/question.component";
import { QuestionDisplayStat } from "../question-display-stat/question-display-stat.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-result-question',
  standalone: true,
  imports: [
    StatQuestionComponent,
    QuestionComponent,
    QuestionDisplayStat,
    NgIf
  ],
  templateUrl: './result-question.component.html',
  styleUrl: './result-question.component.scss'
})
export class ResultQuestionComponent implements OnInit {
  @Input() questionId?: number;
  @Input() point?: number;
  @Input() maxPoint?: number;
  @Input() erreur?: number;
  @Input() indices?: number;
  @Input() temps?: number;

  constructor() { }

  ngOnInit() {
    console.log("idQuestion: " + this.questionId);
    console.log("point: " + this.temps);
    console.log("indices" + this.indices);
  }
}
