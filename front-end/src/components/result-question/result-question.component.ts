import { Component } from '@angular/core';
import {StatQuestionComponent} from "../stat-question/stat-question.component";
import {QuestionComponent} from "../question/question.component";

@Component({
  selector: 'app-result-question',
  standalone: true,
  imports: [
    StatQuestionComponent,
    QuestionComponent
  ],
  templateUrl: './result-question.component.html',
  styleUrl: './result-question.component.scss'
})
export class ResultQuestionComponent {

}
